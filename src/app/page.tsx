'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Poster Display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Poster Card 1 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '100%',
              marginBottom: '1rem'
            }}>
              <img 
                src="/images/shirt_243_black.jpg"
                alt="เสื้อแบบดี สีขาว-ทอง"
                width={500}
                height={700}
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto'
                }}
              />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.75rem'
            }}>เสื้อแบบดี สีขาว-ทอง</h3>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                color: '#6b7280',
                fontSize: '1.125rem'
              }}>ราคาตัวละ</span>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#6366f1'
              }}>198.-</span>
            </div>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem'
            }}>ราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
          </div>

          {/* Poster Card 2 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '100%',
              marginBottom: '1rem'
            }}>
              <img 
                src="/images/shirt_243_black.jpg"
                alt="เสื้อแบบดี สีขาว-ทอง"
                width={500}
                height={700}
                style={{ 
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto'
                }}
              />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.75rem'
            }}>เสื้อแบบดี สีขาว-ทอง</h3>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                color: '#6b7280',
                fontSize: '1.125rem'
              }}>ราคาตัวละ</span>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#6366f1'
              }}>198.-</span>
            </div>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem'
            }}>ราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <style>{`
          .btn-primary {
            background: #6366f1;
            color: white;
            padding: 1rem 3rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1.125rem;
            text-decoration: none;
            text-align: center;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
          }
          .btn-primary:hover {
            background: #4f46e5;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          }
          .btn-secondary {
            background: white;
            color: #6366f1;
            padding: 1rem 3rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 1.125rem;
            text-decoration: none;
            text-align: center;
            border: 2px solid #6366f1;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
          }
          .btn-secondary:hover {
            background: #eff6ff;
            transform: translateY(-2px);
          }
        `}</style>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 400px))',
          gap: '1rem',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          maxWidth: '900px'
        }}>
          <Link href="/login" className="btn-primary">
            เข้าสู่ระบบ
          </Link>
          <Link href="/order" className="btn-secondary">
            สั่งซื้อเสื้อเลย
          </Link>
        </div>

        {/* Info Section */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '900px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>รายละเอียด</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1.125rem',
              color: '#374151'
            }}>
              <span style={{ 
                color: '#10b981',
                fontSize: '1.25rem'
              }}>☑</span>
              <span>สั่งได้ 2 ช่องทาง (LINE หรือ SCAN)</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1.125rem',
              color: '#374151'
            }}>
              <span style={{ 
                color: '#10b981',
                fontSize: '1.25rem'
              }}>☑</span>
              <span>ค่าจัดส่ง ตัวแรก 50 บาท</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1.125rem',
              color: '#374151'
            }}>
              <span style={{ 
                color: '#10b981',
                fontSize: '1.25rem'
              }}>☑</span>
              <span>ตัวถัดไปเพิ่มตัวละ 10 บาท</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '1.125rem',
              color: '#374151'
            }}>
              <span style={{ 
                color: '#10b981',
                fontSize: '1.25rem'
              }}>☑</span>
              <span>ยอมสุด วันที่ 28 ตุลาคม 2568</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
