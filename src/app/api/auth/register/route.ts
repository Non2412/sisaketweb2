import { NextRequest, NextResponse } from 'next/server';
import { USE_MOCK, findUserByEmail, createUser, getAllUsers } from '@/lib/mockDb';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sisaket-charity-api.onrender.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // MOCK API - ลบออกเมื่อ Backend พร้อม
    if (USE_MOCK) {
      const { email, password, name, firstName, lastName, phone } = body;

      // ตรวจสอบอีเมลซ้ำ
      if (findUserByEmail(email)) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'อีเมลนี้ถูกใช้งานแล้ว' 
          },
          { status: 400 }
        );
      }

      // บันทึกผู้ใช้ใหม่
      const newUser = createUser({
        email,
        name: name || `${firstName} ${lastName}`,
        firstName,
        lastName,
        phone,
        password // เก็บรหัสผ่านไว้ (ในระบบจริงต้อง hash)
      });
      
      console.log('✅ Mock Register Success:', email);
      console.log('📋 Total Users:', getAllUsers().length);

      return NextResponse.json({
        success: true,
        message: 'ลงทะเบียนสำเร็จ',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone
          },
          token: `mock-token-${newUser.id}`
        }
      });
    }

    // REAL API - เรียก Backend จริง
    const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
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
          message: data.message || 'การลงทะเบียนล้มเหลว' 
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'ลงทะเบียนสำเร็จ',
      data: data.data || data
    });

  } catch (error: any) {
    console.error('Register API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'เกิดข้อผิดพลาดในการลงทะเบียน' 
      },
      { status: 500 }
    );
  }
}
