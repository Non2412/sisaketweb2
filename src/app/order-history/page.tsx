'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './order-history.module.css';
import ReceiptPrinter from '@/components/ReceiptPrinter';

interface Order {
  id: string;
  date: string;
  items: number;
  total: string;
  status: string;
  statusType: string;
  customerName?: string;
  customerPhone?: string;
  address?: string;
  itemDetails?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#CT-20240012',
      date: '18/07/2024',
      items: 3,
      total: '1,500',
      status: 'สำเร็จ',
      statusType: 'success',
      customerName: 'สมชาย ใจดี',
      customerPhone: '081-234-5678',
      address: '123 ซ.ดินแดง ถ.ดินแดง เขตดินแดง กรุงเทพฯ 10110',
      itemDetails: [
        { name: 'เสื้อสีทอง (ลายไทย)', quantity: 1, price: 499 },
        { name: 'เสื้อสีดำ (ลายโมเดิร์น)', quantity: 2, price: 499 },
      ],
    },
    {
      id: '#CT-20240011',
      date: '15/07/2024',
      items: 1,
      total: '500',
      status: 'กำลังจัดส่ง',
      statusType: 'pending',
      customerName: 'สมหญิง สวยใจ',
      customerPhone: '082-345-6789',
    },
    {
      id: '#CT-20240010',
      date: '12/07/2024',
      items: 2,
      total: '1,000',
      status: 'รอดำเนินการ',
      statusType: 'warning',
      customerName: 'สมศักดิ์ ทำดี',
      customerPhone: '083-456-7890',
    },
    {
      id: '#CT-20240009',
      date: '10/07/2024',
      items: 5,
      total: '2,500',
      status: 'ยกเลิก',
      statusType: 'cancelled',
      customerName: 'สมใจ หวังดี',
      customerPhone: '084-567-8901',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'คำสั่งซื้อทั้งหมด', value: '12', icon: '🛍️', statClass: 'purple' },
    { label: 'เสื้อที่สั่งทั้งหมด', value: '25', icon: '👕', statClass: 'green' },
    { label: 'ยอดรวมทั้งหมด', value: '฿12,500', icon: '💰', statClass: 'blue' },
    { label: 'สำเร็จแล้ว', value: '8', icon: '✔️', statClass: 'orange' },
  ];

  const handlePrintReceipt = (order: Order) => {
    setSelectedOrder(order);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedOrder(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>Charity Tees</div>
            <nav className={styles.navLinks}>
              <Link href="/">หน้าหลัก</Link>
              <Link href="/product">สั่งซื้อ</Link>
              <Link href="/order-history" className={styles.active}>
                ประวัติการสั่งซื้อ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>ประวัติการสั่งซื้อ</h1>
          <Link href="/product" className={styles.primaryButton}>
            <span style={{ fontSize: 18 }}>➕</span>
            <span>สั่งซื้อเสื้อใหม่</span>
          </Link>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.statClass]}`}>
              <span className={styles.statIcon} style={{ fontSize: 24 }}>
                {stat.icon}
              </span>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className={styles.ordersSection}>
          <div className={styles.orderHeader}>
            <h2 className={styles.orderTitle}>รายการคำสั่งซื้อ</h2>

            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="ค้นหาเลขที่คำสั่งซื้อ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeader}>เลขที่คำสั่งซื้อ</th>
                  <th className={styles.tableHeader}>วันที่</th>
                  <th className={styles.tableHeader}>จำนวนรายการ</th>
                  <th className={styles.tableHeader}>ยอดรวม</th>
                  <th className={styles.tableHeader}>สถานะ</th>
                  <th className={styles.tableHeader}>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellBold}`}>{order.id}</td>
                      <td className={styles.tableCell}>{order.date}</td>
                      <td className={styles.tableCell}>{order.items}</td>
                      <td className={`${styles.tableCell} ${styles.tableCellBold}`}>
                        ฿{order.total}
                      </td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${styles[order.statusType]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <button
                          onClick={() => handlePrintReceipt(order)}
                          className={styles.actionLink}
                        >
                          🖨️ พิมพ์ใบเสร็จ
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.emptyState}>
                      ไม่พบคำสั่งซื้อที่ตรงกับการค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Receipt Printer Modal */}
      {showReceipt && selectedOrder && (
        <div className={styles.modalOverlay} onClick={handleCloseReceipt}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>ใบเสร็จการสั่งซื้อ</h3>
            <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <ReceiptPrinter order={selectedOrder} onClose={handleCloseReceipt} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}