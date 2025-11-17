'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setIsLoading(true);

    try {
      // เรียก Next.js API route (relative path) แทนการเรียก backend โดยตรง
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ');
        router.push('/login');
      } else {
        setError(data.message || 'ลงทะเบียนไม่สำเร็จ');
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.registerPage}>
      {/* Back Link */}
      <div className={styles.backLinkWrapper}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.backIcon}>←</span>
          <span>กลับไปหน้าแรก</span>
        </Link>
      </div>

      <div className={styles.registerContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>📝</span>
          </div>
          <h1 className={styles.title}>ลงทะเบียน</h1>
          <p className={styles.subtitle}>สร้างบัญชีใหม่เพื่อสั่งซื้อเสื้อ</p>
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

            {/* Name Fields */}
            <div className={styles.nameRow}>
              <div className={styles.formGroup}>
                <label>ชื่อ</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="กรอกชื่อ"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>นามสกุล</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="กรอกนามสกุล"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className={styles.formGroup}>
              <label>เบอร์โทรศัพท์</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="กรอกเบอร์โทรศัพท์"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div className={styles.formGroup}>
              <label>อีเมล</label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className={styles.formGroup}>
              <label>รหัสผ่าน</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="กรอกรหัสผ่าน"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password Input */}
            <div className={styles.formGroup}>
              <label>ยืนยันรหัสผ่าน</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className={styles.footer}>
          <p>
            มีบัญชีอยู่แล้ว ? <Link href="/login">เข้าสู่ระบบ</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
