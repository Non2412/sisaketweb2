import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.homePage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logos}>
              <Image 
                src="/images/site-logo.png" 
                alt="Site Logo" 
                width={150} 
                height={80}
                className={styles.logo}
              />
            </div>
            <h1>เสื้อฉลองครบรอบ ๒๔๓ ปี<br/>วัดศรีสะเกษ</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h2 className={styles.mainTitle}>
              เสื้อเฉลิมฉลองเนื่อง 243 ปี
            </h2>
            <p className={styles.subtitle}>
              ฉลองครบรอบ 243 ปี วัดศรีสะเกษ
            </p>
            
            <div className={styles.shirtGrid}>
              {/* Shirt 1 */}
              <div className={styles.shirtCard}>
                <div className={styles.shirtImage}>
                  <Image 
                    src="/images/shirt_243_black.jpg" 
                    alt="เสื้อแบบโปโล สีดำ" 
                    width={400} 
                    height={400}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3>เสื้อโปโล สีดำ</h3>
                <div className={styles.price}>
                  <span className={styles.priceTag}>ราคาตัวละ</span>
                  <span className={styles.priceAmount}>198.-</span>
                </div>
                <p className={styles.detail}>ราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
              </div>

              {/* Shirt 2 */}
              <div className={styles.shirtCard}>
                <div className={styles.shirtImage}>
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#6b7280'
                  }}>
                    เสื้อแบบที่ 2<br/>(รอภาพ)
                  </div>
                </div>
                <h3>เสื้อแบบดี สีขาว-ทอง</h3>
                <div className={styles.price}>
                  <span className={styles.priceTag}>ราคาตัวละ</span>
                  <span className={styles.priceAmount}>198.-</span>
                </div>
                <p className={styles.detail}>ราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <Link href="/dashboard" className={styles.btnPrimary}>
                เข้าสู่ระบบ
              </Link>
              <Link href="/order" className={styles.btnSecondary}>
                สั่งซื้อเสื้อเลย
              </Link>
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
              <h3>รายละเอียด</h3>
              <ul>
                <li>✅ สั่งได้ 2 ช่องทาง (LINE หรือ SCAN)</li>
                <li>✅ ค่าจัดส่ง ตัวแรก 50 บาท</li>
                <li>✅ ตัวถัดไปเพิ่มตัวละ 10 บาท</li>
                <li>✅ ยอมสุด วันที่ 28 ตุลาคม 2568</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 ประชารัฐธุรกิจสมัครคริสระเกษ (วิสาหกิจเพื่อสังคม)</p>
        <p>โทรศัพท์ 093-358 1622</p>
      </footer>
    </div>
  );
}
