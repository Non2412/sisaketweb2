'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call login API
    router.push('/products');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    router.push('/products');
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
            {/* Google Login */}
            <button 
              type="button"
              className={styles.googleBtn}
              onClick={handleGoogleLogin}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.0125 12.2725C22.0125 11.235 21.9225 10.2225 21.75 9.24H12.2475V13.5H17.7525C17.5275 14.865 16.815 16.035 15.7575 16.785V19.41H18.66C20.73 17.55 22.0125 15.12 22.0125 12.2725Z" fill="#4285F4"/>
                <path d="M12.2475 22.5C14.94 22.5 17.205 21.6225 18.66 20.145L15.7575 17.52C14.88 18.1125 13.68 18.45 12.2475 18.45C9.69 18.45 7.5075 16.7625 6.72 14.58H3.69V17.3025C5.1375 20.3175 8.445 22.5 12.2475 22.5Z" fill="#34A853"/>
                <path d="M6.72 14.58C6.54 14.0475 6.4425 13.485 6.4425 12.9C6.4425 12.315 6.5475 11.7525 6.72 11.22V8.4975H3.69C3.15 9.54 2.8575 10.695 2.8575 11.925C2.8575 13.155 3.15 14.31 3.69 15.3525L6.72 12.63V14.58Z" fill="#FBBC05"/>
                <path d="M12.2475 6.3C13.7175 6.3 15.03 6.8175 16.02 7.755L18.7275 5.0475C17.205 3.63 14.94 2.85 12.2475 2.85C8.445 2.85 5.1375 5.0325 3.69 8.0475L6.72 10.77C7.5075 8.5875 9.69 6.9 12.2475 6.3V6.3Z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className={styles.divider}>
              <hr />
              <span>OR</span>
              <hr />
            </div>

            {/* Phone Input */}
            <div className={styles.formGroup}>
              <label>เบอร์โทรศัพท์</label>
              <input
                type="tel"
                required
                placeholder="กรอกเบอร์โทรศัพท์"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
            <button type="submit" className={styles.submitBtn}>
              เข้าสู่ระบบ
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
