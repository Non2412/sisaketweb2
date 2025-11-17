import { NextRequest, NextResponse } from 'next/server';
import { USE_MOCK, findUserByEmail, getAllUsers } from '@/lib/mockDb';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sisaket-charity-api.onrender.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // MOCK API - ลบออกเมื่อ Backend พร้อม
    if (USE_MOCK) {
      const { email, password } = body;

      // ค้นหาผู้ใช้
      const user = findUserByEmail(email);
      
      if (!user) {
        console.log('❌ User not found:', email);
        console.log('📋 Available users:', getAllUsers().map(u => u.email));
        return NextResponse.json(
          { 
            success: false, 
            message: 'ไม่พบผู้ใช้งานนี้ กรุณาลงทะเบียนก่อน' 
          },
          { status: 404 }
        );
      }

      // ตรวจสอบรหัสผ่าน (ในระบบจริงต้อง compare hash)
      if (user.password && user.password !== password) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'รหัสผ่านไม่ถูกต้อง' 
          },
          { status: 401 }
        );
      }

      console.log('✅ Mock Login Success:', email);

      return NextResponse.json({
        success: true,
        message: 'เข้าสู่ระบบสำเร็จ',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
          },
          token: `mock-token-${user.id}`
        },
        token: `mock-token-${user.id}`
      });
    }

    // REAL API - เรียก Backend จริง
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'การเข้าสู่ระบบล้มเหลว' 
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      data: data.data || data,
      token: data.token
    });

  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' 
      },
      { status: 500 }
    );
  }
}
