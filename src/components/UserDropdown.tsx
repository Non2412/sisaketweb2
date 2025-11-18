'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserData {
  id: number;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export default function UserDropdown() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // อ่านข้อมูล user จาก localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        
        // ตรวจสอบว่าเป็น admin หรือไม่
        const adminFlag = localStorage.getItem('isAdmin');
        setIsAdmin(adminFlag === 'true' || userData.role === 'admin');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // ลบข้อมูลทั้งหมดออกจาก localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        const userId = userData.id || userData.email;
        // ลบออเดอร์ของ user นี้
        localStorage.removeItem(`orders_${userId}`);
      } catch (e) {
        console.log('Error cleaning up orders');
      }
    }
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin'); // ลบ flag admin
    // ลบ orders แบบเก่าด้วย (ถ้ามี)
    localStorage.removeItem('orders');
    
    // ปิด dropdown
    setShowDropdown(false);
    
    // Redirect ไปหน้า login
    router.push('/login');
  };

  // ถ้ายังไม่ได้ login ให้แสดงปุ่ม login
  if (!user) {
    return (
      <Link href="/login">
        <button style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#6F42C1',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '600',
          transition: 'all 0.3s'
        }}>
          เข้าสู่ระบบ
        </button>
      </Link>
    );
  }

  const displayName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'ผู้ใช้งาน';

  return (
    <>
      <style>{`
        .dropdown-item:hover {
          background-color: #F3F4F6;
        }
      `}</style>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#212529',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#6F42C1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.875rem'
          }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span>{displayName}</span>
          <span style={{ fontSize: '0.75rem' }}>▼</span>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            minWidth: '220px',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            {/* User Info */}
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid #E5E7EB',
              backgroundColor: '#F9FAFB'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#6F42C1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.125rem'
                }}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#212529', fontSize: '0.875rem' }}>
                    {displayName}
                  </p>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.75rem' }}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <div className="dropdown-item" style={{
                padding: '0.875rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                color: '#212529',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s'
              }}>
                <span style={{ fontSize: '1.25rem' }}>🏠</span>
                <span>หน้าหลัก</span>
              </div>
            </Link>

            <Link href="/order" style={{ textDecoration: 'none' }}>
              <div className="dropdown-item" style={{
                padding: '0.875rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                color: '#212529',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s'
              }}>
                <span style={{ fontSize: '1.25rem' }}>🛍️</span>
                <span>สั่งซื้อเสื้อ</span>
              </div>
            </Link>

            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <div className="dropdown-item" style={{
                padding: '0.875rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                color: '#212529',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s'
              }}>
                <span style={{ fontSize: '1.25rem' }}>📋</span>
                <span>ประวัติการสั่งซื้อ</span>
              </div>
            </Link>

            {/* Admin Menu - แสดงเฉพาะ admin เท่านั้น */}
            {isAdmin && (
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <div className="dropdown-item" style={{
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  color: '#DC2626',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  transition: 'background-color 0.2s',
                  borderTop: '1px solid #FEE2E2',
                  backgroundColor: '#FEF2F2'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🔐</span>
                  <span>Admin Dashboard</span>
                </div>
              </Link>
            )}

            <div style={{ borderTop: '1px solid #E5E7EB' }}>
              <div 
                className="dropdown-item" 
                onClick={handleLogout}
                style={{
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  color: '#EF4444',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>🚪</span>
                <span>ออกจากระบบ</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
