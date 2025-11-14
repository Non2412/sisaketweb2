'use client';

import Link from 'next/link';
import Image from 'next/image';
import UserDropdown from '@/components/UserDropdown';

export default function ProductsPage() {
  return (
    <>
      <style jsx>{`
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
            <div style={{ color: '#6F42C1', width: '32px', height: '32px' }}>
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"/>
                <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#212529' }}>
              เสื้อเฉลิมฉลอง
            </h2>
          </div>
          
          {/* User Dropdown */}
          <UserDropdown />
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
                <Image
                  src="/images/shirt_243_black.jpg"
                  alt="เสื้อเฉลิมฉลอง 243 ปี"
                  fill
                  style={{ objectFit: 'cover' }}
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

          {/* Order Button */}
          <section style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '4rem',
            padding: '0 1rem'
          }}>
            <Link href="/order" style={{ textDecoration: 'none', width: '100%', maxWidth: '480px' }}>
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
                สั่งซื้อเสื้อ
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
