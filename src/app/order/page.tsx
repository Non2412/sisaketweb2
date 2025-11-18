'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import UserDropdown from '@/components/UserDropdown';
import styles from './order.module.css';

interface SizeQuantity {
  size: string;
  quantity: number;
}

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [selectedShirtType, setSelectedShirtType] = useState<'แบบสีปกติ' | 'แบบไว้ทุกข์' | null>(null);
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
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <img 
                src="/images/site-logo.png" 
                alt="ตราสัญลักษณ์จังหวัดศรีสะเกษ" 
                className={styles.logo}
              />
              <div>
                <Link href="/products" className={styles.backLink}>← กลับหน้าแรก</Link>
                <h1>สั่งซื้อเสื้อเฉลิมฉลองเนื่อง 243 ปี</h1>
              </div>
            </div>
            <UserDropdown />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* Step 1: Select Shirt Type */}
        {step === 1 && (
          <div className={styles.stepContent}>
            {/* Product Image - Large Display */}
            <div className={styles.productImageDisplay}>
              <img 
                src="/images/shirt_243_black.jpg"
                alt="เสื้อเฉลิมฉลอง 243 ปี"
                width={400}
                height={400}
              />
            </div>

            {/* Shirt Type Selection */}
            <div className={styles.formSection}>
              <h3>เลือกแบบเสื้อ</h3>
              <div className={styles.shirtTypeSelection}>
                <div 
                  className={`${styles.typeOption} ${selectedShirtType === 'แบบสีปกติ' ? styles.selected : ''}`}
                  onClick={() => setSelectedShirtType('แบบสีปกติ')}
                >
                  <div className={styles.typeLabel}>แบบสีปกติ</div>
                  <div className={styles.typePrice}>198 บาท</div>
                </div>
                <div 
                  className={`${styles.typeOption} ${selectedShirtType === 'แบบไว้ทุกข์' ? styles.selected : ''}`}
                  onClick={() => setSelectedShirtType('แบบไว้ทุกข์')}
                >
                  <div className={styles.typeLabel}>แบบไว้ทุกข์</div>
                  <div className={styles.typePrice}>198 บาท</div>
                </div>
              </div>
            </div>

            <div className={styles.btnContainer}>
              <button 
                type="button"
                className={styles.btnNext}
                disabled={!selectedShirtType}
                onClick={() => setStep(2)}
              >
                ถัดไป →
              </button>
            </div>
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
                <img 
                  src="/images/shirt_243_black.jpg"
                  alt={selectedShirtType || ''}
                  width={120}
                  height={120}
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
                  ← กลับไปเลือกแบบเสื้อ
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={totalQuantity === 0}>
                  ยืนยันสั่งซื้อ →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* Header with Icon */}
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                ❓
              </div>
              <h2 className={styles.modalTitle}>
                ยืนยันการสั่งซื้อ
              </h2>
            </div>

            {/* Order Details */}
            <div className={styles.modalDetails}>
              <div className={styles.modalDetailRow}>
                <p className={styles.modalDetailLabel}>ชื่อ-นามสกุล:</p>
                <p className={styles.modalDetailValue}>
                  {formData.firstName} {formData.lastName}
                </p>
              </div>

              <div className={styles.modalDetailRow}>
                <p className={styles.modalDetailLabel}>โทรศัพท์:</p>
                <p className={styles.modalDetailValue}>
                  {formData.phone}
                </p>
              </div>

              <div className={styles.modalDetailRow}>
                <p className={styles.modalDetailLabel}>อีเมล:</p>
                <p className={styles.modalDetailValue}>
                  {formData.email}
                </p>
              </div>

              <div className={styles.modalDetailRow}>
                <p className={styles.modalDetailLabel}>ที่อยู่:</p>
                <p className={styles.modalDetailValue}>
                  {formData.address}
                </p>
              </div>

              <div className={styles.modalDetailRow}>
                <p className={styles.modalDetailLabel}>รูปแบบเสื้อ:</p>
                <p className={styles.modalDetailValue}>
                  {selectedShirtType}
                </p>
              </div>

              <div className={styles.modalDetailRow}>
                <p className={styles.modalDetailLabel}>รายการสั่งซื้อ:</p>
                {sizes.map((item, index) => (
                  <p key={index} className={styles.modalDetailValue}>
                    {item.size}: {item.quantity} ตัว
                  </p>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className={styles.modalSummary}>
              <div className={styles.modalSummaryRow}>
                <span className={styles.modalSummaryLabel}>จำนวนรวม:</span>
                <span className={styles.modalSummaryValue}>{totalQuantity} ตัว</span>
              </div>
              <div className={styles.modalSummaryRow}>
                <span className={styles.modalSummaryLabel}>ราคาเสื้อ:</span>
                <span className={styles.modalSummaryValue}>฿{totalPrice}</span>
              </div>
              <div className={styles.modalSummaryRow}>
                <span className={styles.modalSummaryLabel}>ราคาจัดส่งสินค้า:</span>
                <span className={styles.modalSummaryValue}>฿{shippingCost}</span>
              </div>
              <div className={styles.modalTotal}>
                <span className={styles.modalTotalLabel}>ราคารวมทั้งสิ้น:</span>
                <span className={styles.modalTotalValue}>฿{grandTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className={styles.modalBtnCancel}
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  // TODO: Process payment
                  alert('ดำเนินการสั่งซื้อสำเร็จ!');
                  setShowConfirmModal(false);
                }}
                className={styles.modalBtnConfirm}
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
