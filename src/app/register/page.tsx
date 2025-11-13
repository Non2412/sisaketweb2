'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }
    // TODO: Implement registration logic
    console.log('Register data:', formData);
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleRegister = () => {
    // TODO: Implement Google OAuth
    alert('Google Register - Coming soon!');
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
            {/* Google Register */}
            <button 
              type="button"
              className={styles.googleBtn}
              onClick={handleGoogleRegister}
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
              <label>อีเมล (ไม่บังคับ)</label>
              <input
                type="email"
                name="email"
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
            <button type="submit" className={styles.submitBtn}>
              ลงทะเบียน
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
