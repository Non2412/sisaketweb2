'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './order-history.module.css';

<<<<<<< HEAD
=======
// ❌ ลบ import ของ lucide-react ออก
// import { Search, LogOut, Plus, ShoppingBag, Shirt, Wallet, CheckCircle } from 'lucide-react';

>>>>>>> origin/Login-admin
export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([
    { id: '#CT-20240012', date: '18/07/2024', items: 3, total: '1,500', status: 'สำเร็จ', statusType: 'success' },
    { id: '#CT-20240011', date: '15/07/2024', items: 1, total: '500', status: 'กำลังจัดส่ง', statusType: 'pending' },
    { id: '#CT-20240010', date: '12/07/2024', items: 2, total: '1,000', status: 'รอดำเนินการ', statusType: 'warning' },
    { id: '#CT-20240009', date: '10/07/2024', items: 5, total: '2,500', status: 'ยกเลิก', statusType: 'cancelled' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

<<<<<<< HEAD
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'คำสั่งซื้อทั้งหมด', value: '12', icon: '🛒' },
    { label: 'เสื้อที่สั่งทั้งหมด', value: '25', icon: '👕' },
    { label: 'ยอดรวมทั้งหมด', value: '฿12,500', icon: '💳' },
    { label: 'สำเร็จแล้ว', value: '8', icon: '✓' },
=======
  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 แทน icon ด้วย emoji
  const stats = [
    { label: 'คำสั่งซื้อทั้งหมด', value: '12', icon: '🛍️', statClass: 'purple' },
    { label: 'เสื้อที่สั่งทั้งหมด', value: '25', icon: '👕', statClass: 'green' },
    { label: 'ยอดรวมทั้งหมด', value: '฿12,500', icon: '💰', statClass: 'blue' },
    { label: 'สำเร็จแล้ว', value: '8', icon: '✔️', statClass: 'orange' },
>>>>>>> origin/Login-admin
  ];

  return (
    <div className={styles.page}>
<<<<<<< HEAD
      {/* Header */}
=======
>>>>>>> origin/Login-admin
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>Charity Tees</div>
            <nav className={styles.navLinks}>
              <Link href="/">หน้าหลัก</Link>
<<<<<<< HEAD
              <Link href="/order">สั่งซื้อ</Link>
=======
              <Link href="/product">สั่งซื้อ</Link>
>>>>>>> origin/Login-admin
              <Link href="/order-history" className={styles.active}>ประวัติการสั่งซื้อ</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
<<<<<<< HEAD
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>ประวัติการสั่งซื้อ</h1>
          <Link href="/order" className={styles.primaryButton}>
            <span>➕</span>
=======

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>ประวัติการสั่งซื้อ</h1>
          <Link href="/product" className={styles.primaryButton}>
            {/* 🔄 emoji แทน Plus icon */}
            <span style={{ fontSize: 18 }}>➕</span>
>>>>>>> origin/Login-admin
            <span>สั่งซื้อเสื้อใหม่</span>
          </Link>
        </div>

<<<<<<< HEAD
        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard}`}>
              <div className={styles.statIcon}>{stat.icon}</div>
=======
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.statClass]}`}>
              <span className={styles.statIcon} style={{ fontSize: 24 }}>
                {stat.icon}
              </span>
>>>>>>> origin/Login-admin
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>

<<<<<<< HEAD
        {/* Orders Section */}
        <div className={styles.ordersSection}>
          <div className={styles.orderHeader}>
            <h2 className={styles.orderTitle}>รายการคำสั่งซื้อ</h2>
            <div className={styles.searchContainer}>
=======
        <div className={styles.ordersSection}>
          <div className={styles.orderHeader}>
            <h2 className={styles.orderTitle}>รายการคำสั่งซื้อ</h2>

            <div className={styles.searchContainer}>
              {/* 🔄 emoji แทน Search icon */}
>>>>>>> origin/Login-admin
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

<<<<<<< HEAD
          {/* Table */}
=======
>>>>>>> origin/Login-admin
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
                      <td className={`${styles.tableCell} ${styles.tableCellBold}`}>฿{order.total}</td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${styles[order.statusType]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className={styles.actionLink}
                        >
                          ดูรายละเอียด
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

<<<<<<< HEAD
      {/* Modal */}
=======
>>>>>>> origin/Login-admin
      {selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>รายละเอียดคำสั่งซื้อ</h3>
            <div className={styles.modalBody}>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>เลขที่คำสั่งซื้อ:</span>
                <span className={styles.modalValue}>{selectedOrder.id}</span>
              </div>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>วันที่:</span>
                <span className={styles.modalValue}>{selectedOrder.date}</span>
              </div>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>จำนวนรายการ:</span>
                <span className={styles.modalValue}>{selectedOrder.items} ชิ้น</span>
              </div>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>ยอดรวม:</span>
                <span className={styles.modalValue}>฿{selectedOrder.total}</span>
              </div>
              <div className={styles.modalRow}>
                <span className={styles.modalLabel}>สถานะ:</span>
                <span className={`${styles.statusBadge} ${styles[selectedOrder.statusType]}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>
<<<<<<< HEAD
=======

>>>>>>> origin/Login-admin
            <div className={styles.modalFooter}>
              <button
                onClick={() => setSelectedOrder(null)}
                className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
              >
                ปิด
              </button>
              <button
                onClick={() => alert(`พิมพ์ใบเสร็จสำหรับ ${selectedOrder.id}`)}
                className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
              >
                พิมพ์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
