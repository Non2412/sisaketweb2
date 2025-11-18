import { NextRequest, NextResponse } from 'next/server';

// ข้อมูล admin ชั่วคราว (ควรเก็บในฐานข้อมูล)
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

// Simple token generator (แทน JWT)
function generateToken(email: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${Buffer.from(email).toString('base64')}-${timestamp}-${randomStr}`;
}

export async function POST(request: NextRequest) {
  try {
    // ตรวจสอบ Content-Type
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { message: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    // รับข้อมูลจาก request body
    const body = await request.json();
    const { email, password } = body;

    // ตรวจสอบว่าได้รับ email และ password
    if (!email || !password) {
      return NextResponse.json(
        { message: 'กรุณากรอกอีเมลและรหัสผ่าน' },
        { status: 400 }
      );
    }

    // ตรวจสอบข้อมูล admin
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    // สร้าง Token
    const token = generateToken(email);

    // สร้าง response ด้วย cookie
    const response = NextResponse.json(
      {
        message: 'ล็อกอินสำเร็จ',
        token: token,
        user: {
          email: email,
          role: 'admin',
        },
      },
      { status: 200 }
    );

    // ตั้ง Secure Cookie
    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์' },
      { status: 500 }
    );
  }
}