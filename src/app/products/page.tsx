'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import UserDropdown from '@/components/UserDropdown';

export default function ProductsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่า user login หรือยัง
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .hover-link:hover {
          color: #6F42C1;
        }
        .hover-btn {
          transition: all 0.3s ease;
        }
        .hover-btn:hover {
          background-color: rgba(111, 66, 193, 0.9) !important;
          transform: translateY(-2px);
        }
        .dropdown-item:hover {
          background-color: #F3F4F6;
        }
      `}</style>

      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#F8F9FA',
        fontFamily: "'Noto Sans Thai', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          borderBottom: '1px solid #E5E7EB',
          backgroundColor: 'white',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/images/site-logo.png" 
              alt="ตราสัญลักษณ์จังหวัดศรีสะเกษ"
              style={{
                width: '120px',
                height: '80px',
                objectFit: 'contain',
                borderRadius: '0.5rem',
                background: 'white',
                padding: '0.25rem'
              }}
            />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#212529' }}>
              เสื้อเฉลิมฉลอง
            </h2>
          </div>
          
          {/* User Dropdown - แสดงเฉพาะเมื่อ login แล้ว */}
          {isLoggedIn && <UserDropdown />}
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          {/* Hero Section */}
          <section className="fade-in" style={{ 
            textAlign: 'center', 
            padding: '3rem 1rem',
            marginBottom: '2rem'
          }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: '900', 
              marginBottom: '1rem',
              color: '#212529',
              lineHeight: '1.2'
            }}>
              เสื้อเฉลิมฉลองเนื่องในโอกาส 243 ปี
            </h1>
            <p style={{ 
              fontSize: '1rem', 
              color: '#6B7280',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              ร่วมเป็นส่วนหนึ่งของการเฉลิมฉลองครั้งประวัติศาสตร์ สั่งซื้อเสื้อโปโลเพื่อการกุศลได้แล้ววันนี้
            </p>
          </section>

          {/* Products Grid */}
          <section style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem',
            padding: '0 1rem'
          }}>
            {/* Single Product Card with Two Types */}
            <div className="hover-scale" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              cursor: 'pointer',
              maxWidth: '400px',
              width: '100%'
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                backgroundColor: '#FEF3E2',
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src="/images/shirt_243_black.jpg"
                  alt="เสื้อเฉลิมฉลอง 243 ปี"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#212529' }}>
                    เสื้อสีปกติ
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#212529' }}>
                    เสื้อไว้ทุกข์
                  </p>
                </div>
                <p style={{ fontSize: '1rem', color: '#6B7280', fontWeight: '500', marginTop: '0.25rem' }}>
                  198 บาท
                </p>
              </div>
            </div>
          </section>

          {/* Order Button / Login Button */}
          <section style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '4rem',
            padding: '0 1rem'
          }}>
            <Link href={isLoggedIn ? "/order" : "/login"} style={{ textDecoration: 'none', width: '100%', maxWidth: '480px' }}>
              <button className="hover-btn" style={{
                width: '100%',
                backgroundColor: '#6F42C1',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(111, 66, 193, 0.3)',
              }}>
                {isLoggedIn ? 'สั่งซื้อเสื้อ' : 'เข้าสู่ระบบ'}
              </button>
            </Link>
          </section>

          {/* Statistics Section */}
          <section style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem',
            padding: '2rem 1rem'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#212529'
            }}>
              สถิติการสั่งซื้อ
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* Stat 1 - เสื้อปกติ */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '2.5rem' }}>💡</span>
                <p style={{ color: '#6B7280', fontSize: '1rem', fontWeight: '500' }}>
                  เสื้อสีปกติ
                </p>
                <p style={{ 
                  fontSize: '3rem', 
                  fontWeight: '900', 
                  color: '#FFD700',
                  margin: '0.5rem 0',
                  lineHeight: '1'
                }}>
                  1,258
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>ตัว</p>
              </div>

              {/* Stat 2 - เสื้อไว้ทุกข์ */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '2.5rem' }}>⚡</span>
                <p style={{ color: '#6B7280', fontSize: '1rem', fontWeight: '500' }}>
                  เสื้อไว้ทุกข์
                </p>
                <p style={{ 
                  fontSize: '3rem', 
                  fontWeight: '900', 
                  color: '#212529',
                  margin: '0.5rem 0',
                  lineHeight: '1'
                }}>
                  973
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>ตัว</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
