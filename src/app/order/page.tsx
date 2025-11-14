'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserDropdown from '@/components/UserDropdown';
import styles from './order.module.css';

interface SizeQuantity {
  size: string;
  quantity: number;
}

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [selectedShirtType, setSelectedShirtType] = useState<'แบบดี' | 'แบบโปโล' | null>(null);
  const [sizes, setSizes] = useState<SizeQuantity[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const availableSizes = [
    'SS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL'
  ];

  const handleSizeChange = (size: string, quantity: number) => {
    setSizes(prev => {
      const existing = prev.find(s => s.size === size);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(s => s.size !== size);
        }
        return prev.map(s => s.size === size ? { ...s, quantity } : s);
      }
      if (quantity > 0) {
        return [...prev, { size, quantity }];
      }
      return prev;
    });
  };

  const totalQuantity = sizes.reduce((sum, s) => sum + s.quantity, 0);
  const totalPrice = totalQuantity * 198;
  const shippingCost = totalQuantity > 0 ? 50 + ((totalQuantity - 1) * 10) : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  return (
    <div className={styles.orderPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <Link href="/products" className={styles.backLink}>← กลับหน้าแรก</Link>
              <h1>สั่งซื้อเสื้อเฉลิมฉลองเนื่อง 243 ปี</h1>
            </div>
            <UserDropdown />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* Progress Steps */}
        <div className={styles.progressSteps}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLabel}>เลือกสินค้อ</div>
          </div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLabel}>กรอกข้อมูลและจำนวน</div>
          </div>
        </div>

        {/* Step 1: Select Shirt Type */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2>เลือกแบบเสื้อ</h2>
            <div className={styles.shirtSelection}>
              <div 
                className={`${styles.shirtOption} ${selectedShirtType === 'แบบดี' ? styles.selected : ''}`}
                onClick={() => setSelectedShirtType('แบบดี')}
              >
                <div className={styles.shirtImagePlaceholder}>
                  เสื้อแบบดี<br/>(รอภาพ)
                </div>
                <h3>แบบดี</h3>
                <p className={styles.price}>198 บาท</p>
              </div>

              <div 
                className={`${styles.shirtOption} ${selectedShirtType === 'แบบโปโล' ? styles.selected : ''}`}
                onClick={() => setSelectedShirtType('แบบโปโล')}
              >
                <div className={styles.shirtImageWrapper}>
                  <Image 
                    src="/images/shirt_243_black.jpg"
                    alt="แบบโปโล"
                    width={250}
                    height={250}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3>แบบโปโล</h3>
                <p className={styles.price}>198 บาท</p>
              </div>
            </div>

            <button 
              className={styles.btnNext}
              disabled={!selectedShirtType}
              onClick={() => setStep(2)}
            >
              ถัดไป →
            </button>
          </div>
        )}

        {/* Step 2: Fill Form & Select Sizes */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <button className={styles.btnBack} onClick={() => setStep(1)}>
              ← กลับ
            </button>

            <form onSubmit={handleSubmit} className={styles.orderForm}>
              {/* Product Info */}
              <div className={styles.productInfo}>
                <Image 
                  src="/images/shirt_243_black.jpg"
                  alt={selectedShirtType || ''}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
                <div>
                  <h3>{selectedShirtType}</h3>
                  <p>ราคา 198 บาท/ตัว</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className={styles.formSection}>
                <h3>ข้อมูลผู้สั่งซื้อ</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>ชื่อ *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>นามสกุล *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>เบอร์โทรศัพท์ *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0XX-XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>อีเมล</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>ที่อยู่ที่จัดส่ง *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="กรอกที่อยู่ในการจัดส่ง"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>หมายเหตุ</label>
                  <textarea
                    rows={2}
                    placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>

              {/* Size Selection */}
              <div className={styles.formSection}>
                <h3>จำนวนเสื้อและไซส์ (รวมที่สั่ง)</h3>
                <div className={styles.sizeGrid}>
                  {availableSizes.map(size => {
                    const current = sizes.find(s => s.size === size)?.quantity || 0;
                    return (
                      <div key={size} className={styles.sizeItem}>
                        <label>{size}</label>
                        <div className={styles.quantityControl}>
                          <button
                            type="button"
                            onClick={() => handleSizeChange(size, Math.max(0, current - 1))}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={current}
                            onChange={(e) => handleSizeChange(size, parseInt(e.target.value) || 0)}
                          />
                          <button
                            type="button"
                            onClick={() => handleSizeChange(size, current + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className={styles.orderSummary}>
                <h3>สรุปการสั่งซื้อ</h3>
                <div className={styles.summaryRow}>
                  <span>เสื้อจำนวน:</span>
                  <span>{totalQuantity} ตัว</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>ราคาเสื้อ:</span>
                  <span>{totalPrice} บาท</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>ค่าจัดส่ง:</span>
                  <span>{shippingCost} บาท</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>ราคารวมทั้งหมด:</span>
                  <span>{grandTotal} บาท</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => setStep(1)}>
                  ← กลับไปเลือกสินค้อ
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={totalQuantity === 0}>
                  + ยืนยัน สั่งซื้อ และชำระเงิน
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {/* Header with Icon */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2.5rem'
              }}>
                ❓
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1F2937',
                margin: 0
              }}>
                ยืนยันการสั่งซื้อ
              </h2>
            </div>

            {/* Order Details */}
            <div style={{
              backgroundColor: '#F9FAFB',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.25rem 0' }}>ชื่อ-นามสกุล:</p>
                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                  {formData.firstName} {formData.lastName}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.25rem 0' }}>โทรศัพท์:</p>
                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                  {formData.phone}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.25rem 0' }}>อีเมล:</p>
                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                  {formData.email}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.25rem 0' }}>ที่อยู่:</p>
                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                  {formData.address}
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.25rem 0' }}>รูปแบบเสื้อ:</p>
                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                  {selectedShirtType}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 0.5rem 0' }}>รายการสั่งซื้อ:</p>
                {sizes.map((item, index) => (
                  <p key={index} style={{ fontSize: '1rem', fontWeight: '600', color: '#1F2937', margin: '0.25rem 0' }}>
                    {item.size}: {item.quantity} ตัว
                  </p>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{
              borderTop: '2px solid #E5E7EB',
              paddingTop: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>จำนวนรวม:</span>
                <span style={{ fontWeight: '600' }}>{totalQuantity} ตัว</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>ราคาเสื้อ:</span>
                <span style={{ fontWeight: '600' }}>฿{totalPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>ราคาจัดส่งสินค้า:</span>
                <span style={{ fontWeight: '600', color: '#3B82F6' }}>฿{shippingCost}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: '1px solid #E5E7EB',
                marginTop: '0.5rem'
              }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>ราคารวมทั้งสิ้น:</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#3B82F6' }}>฿{grandTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#E5E7EB',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  // TODO: Process payment
                  alert('ดำเนินการสั่งซื้อสำเร็จ!');
                  setShowConfirmModal(false);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
              >
                ยืนยันสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
