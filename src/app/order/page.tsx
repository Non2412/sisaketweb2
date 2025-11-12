'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './order.module.css';

interface SizeQuantity {
  size: string;
  quantity: number;
}

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [selectedShirtType, setSelectedShirtType] = useState<'แบบดี' | 'แบบโปโล' | null>(null);
  const [sizes, setSizes] = useState<SizeQuantity[]>([]);

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
    // TODO: Submit order
    alert('ยืนยันการสั่งซื้อสำเร็จ!');
  };

  return (
    <div className={styles.orderPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>← กลับหน้าแรก</Link>
          <h1>สั่งซื้อเสื้อเฉลิมฉลองเนื่อง 243 ปี</h1>
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
    </div>
  );
}
