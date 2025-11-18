'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // เรียก Next.js API route (relative path) แทนการเรียก backend โดยตรง
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        // บันทึก user data ลง localStorage
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('token', data.data.token || data.token);
        
        alert('✅ เข้าสู่ระบบสำเร็จ!');
        router.push('/products');
      } else {
        setError(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err: any) {
      setError(err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Back Link */}
      <div className={styles.backLinkWrapper}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.backIcon}>←</span>
          <span>กลับไปหน้าแรก</span>
        </Link>
      </div>

      <div className={styles.loginContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🤝</span>
          </div>
          <h1 className={styles.title}>เข้าใช้งานระบบ</h1>
          <p className={styles.subtitle}>กรุณากรอกข้อมูลเพื่อเข้าสู่บัญชีของคุณ</p>
        </div>

        {/* Form Card */}
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                ❌ {error}
              </div>
            )}

            {/* Email Input */}
            <div className={styles.formGroup}>
              <label>อีเมล</label>
              <input
                type="email"
                required
                placeholder="กรอกอีเมล"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Password Input */}
            <div className={styles.formGroup}>
              <label>รหัสผ่าน</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="กรอกรหัสผ่าน"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>

        {/* Register Link */}
        <div className={styles.footer}>
          <p>
            ยังไม่มีบัญชี ? <Link href="/register">ลงทะเบียน</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
