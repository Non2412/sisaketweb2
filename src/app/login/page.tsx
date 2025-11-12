'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // TODO: Call login API
      // For now, just redirect to dashboard
      router.push('/dashboard');
    } else {
      // TODO: Call register API
      if (formData.password !== formData.confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
      }
      alert('สมัครสมาชิกสำเร็จ!');
      setIsLogin(true);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    alert('Google Login - Coming soon!');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <Image 
            src="/images/site-logo.png"
            alt="Logo"
            width={200}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Title */}
        <h1 className={styles.title}>กลับโปหน้าแรก</h1>
        <p className={styles.subtitle}>
          {isLogin ? 'ยังไม่มีบัญชี? ' : 'มีบัญชีอยู่แล้ว? '}
          <button 
            type="button"
            className={styles.toggleLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'สมัครเลย' : 'เข้าสู่ระบบ'}
          </button>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Google Login */}
          <button 
            type="button"
            className={styles.googleBtn}
            onClick={handleGoogleLogin}
          >
            <span className={styles.googleIcon}>G</span>
            Continue with Google
          </button>

          <div className={styles.divider}>
            <span>หรือ</span>
          </div>

          {/* Email/Password */}
          <div className={styles.formGroup}>
            <label>แอดมินหรือโทรศัพท์</label>
            <input
              type="text"
              required
              placeholder="กรอกแอดมินหรือโทรศัพท์"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>รหัสผ่าน</label>
            <input
              type="password"
              required
              placeholder="กรอกรหัสผ่าน"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button type="button" className={styles.showPassword}>👁</button>
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label>ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                required
                placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>
        </form>

        {/* Back Link */}
        <Link href="/" className={styles.backLink}>
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
