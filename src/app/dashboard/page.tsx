'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';
import ReceiptPrinter from '@/components/ReceiptPrinter';
import UserDropdown from '@/components/UserDropdown';

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

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // Load orders from localStorage (per user)
  useEffect(() => {
    const loadOrders = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        const userId = userData.id || userData.email;
        const ordersKey = `orders_${userId}`;
        const savedOrders = localStorage.getItem(ordersKey);
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
        }
      }
      // No default mock orders - start with empty list
    };
    
    loadOrders();
    
    // Listen for storage changes (when order is added from another tab/page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'orders') {
        loadOrders();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats from orders
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + (typeof order.items === 'number' ? order.items : 0), 0);
  const totalAmount = orders.reduce((sum, order) => {
    const amount = typeof order.total === 'string' ? parseFloat(order.total.replace(/,/g, '')) : order.total;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  const completedOrders = orders.filter(order => order.status === 'สำเร็จ').length;

  const stats = [
    { label: 'คำสั่งซื้อทั้งหมด', value: totalOrders.toString(), icon: '🛍️', statClass: 'purple' },
    { label: 'เสื้อที่สั่งทั้งหมด', value: totalItems.toString(), icon: '👕', statClass: 'green' },
    { label: 'ยอดรวมทั้งหมด', value: `฿${totalAmount.toLocaleString()}`, icon: '💰', statClass: 'blue' },
    { label: 'สำเร็จแล้ว', value: completedOrders.toString(), icon: '✔️', statClass: 'orange' },
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
      {/* Header */}
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>Charity Tees</div>
            <UserDropdown />
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>ประวัติการสั่งซื้อ</h1>
          <Link href="/order" className={styles.primaryButton}>
            <span style={{ fontSize: 18 }}>➕</span>
            <span>สั่งซื้อเสื้อใหม่</span>
          </Link>
        </div>

        {/* Stats Grid */}
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

        {/* Orders Section */}
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

          {/* Table */}
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
