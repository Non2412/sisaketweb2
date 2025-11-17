'use client';

import { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';
import styles from './login-adminhistory.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!email.trim()) {
      setError('กรุณากรอกอีเมล');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('กรุณากรอกรหัสผ่าน');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('อีเมลไม่ถูกต้อง');
      setIsLoading(false);
      return;
    }

    try {
      // เปลี่ยนให้เรียก API จริงของคุณ
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ล็อกอินสำเร็จ
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        // Redirect ไปยังหน้า admin
        window.location.href = '/admin';
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.loginHeader}>
            <div className={styles.loginIconBox}>
              <Lock size={28} />
            </div>
            <h1 className={styles.loginTitle}>Admin Panel</h1>
            <p className={styles.loginSubtitle}>ล็อกอินเข้าสู่ระบบผู้ดูแล</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={styles.errorAlert}>
              <AlertCircle size={20} />
              <p className={styles.errorMessage}>{error}</p>
            </div>
          )}

          {/* Demo Credentials */}
          <div className={styles.demoBox}>
            <p className={styles.demoTitle}>📝 ข้อมูลทดสอบ:</p>
            <p className={styles.demoText}>Email: admin@example.com</p>
            <p className={styles.demoText}>Password: admin123</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>อีเมล</label>
              <div className={styles.inputContainer}>
                <User size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className={styles.formInput}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>รหัสผ่าน</label>
              <div className={styles.inputContainer}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={styles.formInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className={styles.rememberWrapper}>
              <input
                type="checkbox"
                id="remember"
                className={styles.rememberCheckbox}
              />
              <label htmlFor="remember" className={styles.rememberLabel}>
                จำรหัสผ่านไว้
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  กำลังประมวลผล...
                </>
              ) : (
                'ล็อกอิน'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.loginFooter}>
            <p className={styles.footerText}>
              มีปัญหาหรือ? <a href="#" className={styles.footerLink}>ติดต่อเรา</a>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <p className={styles.securityNote}>
          🔒 หน้านี้ปลอดภัยและเข้ารหัส
        </p>
      </div>
    </div>
  );
}