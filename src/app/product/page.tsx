'use client';

import styles from './product.module.css';

export default function ProductPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>เสื้อเฉลิมฉลอง</div>
            <nav className={styles.navLinks}>
              <a href="#home">หน้าหลัก</a>
              <a href="#about">เกี่ยวกับโครงการ</a>
              <a href="#contact">ติดต่อเรา</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.mainTitle}>
              เสื้อเฉลิมฉลองเนื่องในโอกาส 243 ปี
            </h1>
            <p className={styles.subtitle}>
              ร่วมเป็นส่วนหนึ่งของการเฉลิมฉลองครั้งประวัติศาสตร์ สั่งซื้อเสื้อโปโลเพื่อการกุศลได้แล้ววันนี้
            </p>
          </div>
        </div>
      </section>

      {/* Arrow and Image Section */}
      <section className={styles.arrowImageSection}>
        <div className={styles.container}>
          <div className={styles.shirtImageContainer}>
            <img 
              src="/images/shirt_243_black.jpg"
              alt="เสื้อเฉลิมฉลอง 243 ปี"
              className={styles.shirtImage}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.colorSelectionContainer}>
            <h2 className={styles.colorTitle}>เลือกสีเสื้อ</h2>
            <div className={styles.colorGrid}>
              <button className={styles.colorButton} style={{backgroundColor: '#FFD700'}} title="สีทอง">
                <span>สีทอง (ลายไทย)</span>
                <span className={styles.colorPrice}>198 บาท</span>
              </button>
              <button className={styles.colorButton} style={{backgroundColor: '#000000', color: '#fff'}} title="สีดำ">
                <span>สีดำ (ลายโมเดิร์น)</span>
                <span className={styles.colorPrice}>198 บาท</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <section className={styles.ctaSection}>
        <button className={styles.primaryButton}>
          สั่งซื้อเสื้อ
        </button>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <h2 className={styles.statsTitle}>สถิติการสั่งซื้อ</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🥇</div>
              <p className={styles.statLabel}>เสื้อสีทอง (ลายไทย)</p>
              <p className={styles.statNumber}>1,258</p>
              <p className={styles.statUnit}>ตัว</p>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚡</div>
              <p className={styles.statLabel}>เสื้อสีดำ (ลายโมเดิร์น)</p>
              <p className={styles.statNumber}>973</p>
              <p className={styles.statUnit}>ตัว</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

