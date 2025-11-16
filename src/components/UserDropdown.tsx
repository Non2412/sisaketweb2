'use client';

import Link from 'next/link';
import { useState } from 'react';

interface UserDropdownProps {
  userName?: string;
}

export default function UserDropdown({ userName = "ชื่อผู้ใช้" }: UserDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);

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
            {userName.charAt(0)}
          </div>
          <span>{userName}</span>
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
                  {userName.charAt(0)}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#212529', fontSize: '0.875rem' }}>
                    {userName}
                  </p>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.75rem' }}>
                    ผู้ใช้งาน
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

            <div style={{ borderTop: '1px solid #E5E7EB' }}>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <div className="dropdown-item" style={{
                  padding: '0.875rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  color: '#EF4444',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🚪</span>
                  <span>ออกจากระบบ</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
