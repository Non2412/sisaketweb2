'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'order' | 'payment' | null>(null);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // โหลดออเดอร์จาก localStorage ของทุก user
  useEffect(() => {
    const loadAllOrders = () => {
      const allUserOrders: any[] = [];
      
      // วนหาทุก key ที่ขึ้นต้นด้วย orders_
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('orders_')) {
          try {
            const userOrders = JSON.parse(localStorage.getItem(key) || '[]');
            allUserOrders.push(...userOrders);
          } catch (e) {
            console.log('Error loading orders from', key);
          }
        }
      }
      
      setAllOrders(allUserOrders);
      
      // แปลงเป็นรูปแบบที่ admin ใช้
      const formattedOrders = allUserOrders.map(order => ({
        id: order.id,
        customer: order.customerName,
        items: order.items,
        total: typeof order.total === 'string' ? parseFloat(order.total.replace(/,/g, '')) : order.total,
        status: order.status,
        date: order.date,
        payment: order.status === 'สำเร็จ' ? 'ชำระแล้ว' : 'รอชำระ'
      }));
      
      setOrders(formattedOrders);
    };
    
    loadAllOrders();
  }, []);

  // Mock Data - Payments (ยังคงใช้ mock)
  const [payments] = useState([
    { id: 'PAY-001', orderId: '#CT-20240012', amount: 1500, method: 'โอนธนาคาร', date: '18/07/2024', status: 'สำเร็จ' },
    { id: 'PAY-002', orderId: '#CT-20240011', amount: 500, method: 'PromptPay', date: '15/07/2024', status: 'สำเร็จ' },
  ]);

  // Stats - คำนวณจากข้อมูลจริง
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const shippingOrders = orders.filter(order => order.status === 'กำลังจัดส่ง').length;
  const stats = [
    { label: 'คำสั่งซื้อทั้งหมด', value: totalOrders.toString(), icon: '🛒', color: 'blue' },
    { label: 'รายได้ทั้งหมด', value: `฿${totalRevenue.toLocaleString()}`, icon: '💳', color: 'green' },
    { label: 'ผู้ใช้ทั้งหมด', value: '128', icon: '👥', color: 'purple' },
    { label: 'ขณะนี้กำลังจัดส่ง', value: shippingOrders.toString(), icon: '📈', color: 'orange' },
  ];

  const handleOpenModal = (type: 'order' | 'payment') => {
    setModalType(type);
    setShowModal(true);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'สำเร็จ':
      case 'ชำระแล้ว':
        return 'success';
      case 'กำลังจัดส่ง':
        return 'pending';
      case 'รอดำเนินการ':
        return 'warning';
      case 'รอชำระ':
        return 'cancelled';
      default:
        return 'success';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={styles.headerButton}
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <h1 className={styles.headerTitle}>Admin Dashboard</h1>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.headerButton}>
              🚪
            </button>
            <div className={styles.profileAvatar}></div>
          </div>
        </div>
      </header>

      <div className={styles.mainLayout}>
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              <button
                onClick={() => setActiveTab('overview')}
                className={`${styles.sidebarButton} ${activeTab === 'overview' ? styles.active : ''}`}
              >
                <span>📊</span>
                <span>ภาพรวม</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${styles.sidebarButton} ${activeTab === 'orders' ? styles.active : ''}`}
              >
                <span>🛒</span>
                <span>จัดการคำสั่งซื้อ</span>
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`${styles.sidebarButton} ${activeTab === 'payments' ? styles.active : ''}`}
              >
                <span>💰</span>
                <span>บันทึกการโอนเงิน</span>
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`${styles.sidebarButton} ${activeTab === 'statistics' ? styles.active : ''}`}
              >
                <span>📈</span>
                <span>สถิติและรายงาน</span>
              </button>
              <hr className={styles.sidebarDivider} />
              <Link href="/" className={styles.sidebarLink}>
                ← กลับหน้าหลัก
              </Link>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className={styles.sectionTitle}>ภาพรวม</h2>

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.statCard}>
                    <div className={styles.statCardContent}>
                      <div className={styles.statCardInfo}>
                        <p className={styles.statCardLabel}>{stat.label}</p>
                        <p className={styles.statCardValue}>{stat.value}</p>
                      </div>
                      <div className={`${styles.statCardIcon} ${styles[stat.color]}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className={styles.quickActions}>
                <button
                  onClick={() => handleOpenModal('order')}
                  className={styles.actionCard}
                >
                  <div className={styles.actionCardIcon} style={{ color: '#0284c7' }}>🛒</div>
                  <h3 className={styles.actionCardTitle}>ดูคำสั่งซื้อทั้งหมด</h3>
                  <p className={styles.actionCardDesc}>จัดการและตรวจสอบคำสั่งซื้อ</p>
                </button>
                <button
                  onClick={() => handleOpenModal('payment')}
                  className={styles.actionCard}
                >
                  <div className={styles.actionCardIcon} style={{ color: '#16a34a' }}>💰</div>
                  <h3 className={styles.actionCardTitle}>บันทึกการโอนเงิน</h3>
                  <p className={styles.actionCardDesc}>บันทึกและตรวจสอบการชำระเงิน</p>
                </button>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={styles.actionCard}
                >
                  <div className={styles.actionCardIcon} style={{ color: '#7c3bed' }}>📈</div>
                  <h3 className={styles.actionCardTitle}>ดูสถิติ</h3>
                  <p className={styles.actionCardDesc}>สถิติและรายงานการขาย</p>
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                  <h2 className={styles.tableTitle}>จัดการคำสั่งซื้อ</h2>
                  <button className={styles.exportButton}>
                    📥 ส่งออก
                  </button>
                </div>

                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                  <div className={styles.tableControls}>
                    <input
                      type="text"
                      placeholder="ค้นหาเลขที่คำสั่งซื้อ..."
                      className={styles.searchInput}
                    />
                    <button className={styles.filterButton}>
                      🔍 ตัวกรอง
                    </button>
                  </div>
                </div>

                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead className={styles.tableHeadRow}>
                      <tr>
                        <th className={styles.tableHeadCell}>เลขที่คำสั่งซื้อ</th>
                        <th className={styles.tableHeadCell}>ชื่อลูกค้า</th>
                        <th className={styles.tableHeadCell}>จำนวน</th>
                        <th className={styles.tableHeadCell}>ยอดรวม</th>
                        <th className={styles.tableHeadCell}>สถานะ</th>
                        <th className={styles.tableHeadCell}>การชำระเงิน</th>
                        <th className={styles.tableHeadCell}>จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className={styles.tableBodyRow}>
                          <td className={`${styles.tableCell} ${styles.tableCellBold}`}>{order.id}</td>
                          <td className={styles.tableCell}>{order.customer}</td>
                          <td className={styles.tableCell}>{order.items}</td>
                          <td className={`${styles.tableCell} ${styles.tableCellBold}`}>฿{order.total}</td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${styles[getStatusClass(order.status)]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${styles[getStatusClass(order.payment)]}`}>
                              {order.payment}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <div className={styles.actionButtons}>
                              <button className={`${styles.actionButton} ${styles.view}`} title="ดู">
                                👁️
                              </button>
                              <button className={`${styles.actionButton} ${styles.edit}`} title="แก้ไข">
                                ✏️
                              </button>
                              <button className={`${styles.actionButton} ${styles.delete}`} title="ลบ">
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                  <h2 className={styles.tableTitle}>บันทึกการโอนเงิน</h2>
                  <button
                    onClick={() => handleOpenModal('payment')}
                    className={styles.exportButton}
                  >
                    ➕ เพิ่มการโอนเงิน
                  </button>
                </div>

                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead className={styles.tableHeadRow}>
                      <tr>
                        <th className={styles.tableHeadCell}>เลขที่การโอน</th>
                        <th className={styles.tableHeadCell}>เลขที่คำสั่งซื้อ</th>
                        <th className={styles.tableHeadCell}>จำนวนเงิน</th>
                        <th className={styles.tableHeadCell}>วิธีการ</th>
                        <th className={styles.tableHeadCell}>วันที่</th>
                        <th className={styles.tableHeadCell}>สถานะ</th>
                        <th className={styles.tableHeadCell}>จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className={styles.tableBodyRow}>
                          <td className={`${styles.tableCell} ${styles.tableCellBold}`}>{payment.id}</td>
                          <td className={styles.tableCell}>{payment.orderId}</td>
                          <td className={`${styles.tableCell} ${styles.tableCellBold}`}>฿{payment.amount}</td>
                          <td className={styles.tableCell}>{payment.method}</td>
                          <td className={styles.tableCell}>{payment.date}</td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${styles.success}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className={styles.tableCell}>
                            <div className={styles.actionButtons}>
                              <button className={`${styles.actionButton} ${styles.view}`} title="ดู">
                                👁️
                              </button>
                              <button className={`${styles.actionButton} ${styles.edit}`} title="แก้ไข">
                                ✏️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'statistics' && (
            <div>
              <h2 className={styles.sectionTitle}>สถิติและรายงาน</h2>

              <div className={styles.chartGrid}>
                {/* Sales Chart */}
                <div className={styles.chartCard}>
                  <h3 className={styles.chartCardTitle}>ยอดขายประจำเดือน</h3>
                  <div className={styles.chartContainer}>
                    <div className={styles.chartBar} style={{ height: '60%' }}></div>
                    <div className={styles.chartBar} style={{ height: '80%' }}></div>
                    <div className={styles.chartBar} style={{ height: '70%' }}></div>
                    <div className={styles.chartBar} style={{ height: '90%' }}></div>
                    <div className={styles.chartBar} style={{ height: '50%' }}></div>
                  </div>
                </div>

                {/* Top Products */}
                <div className={styles.chartCard}>
                  <h3 className={styles.chartCardTitle}>เสื้อที่ขายได้มากที่สุด</h3>
                  <div className={styles.chartLegend}>
                    {[
                      { name: 'เสื้อสีทอง (ลายไทย)', sales: 1258 },
                      { name: 'เสื้อสีดำ (ลายโมเดิร์น)', sales: 973 },
                      { name: 'เสื้อสีขาว (ลายดั้งเดิม)', sales: 654 },
                    ].map((product, index) => (
                      <div key={index}>
                        <div className={styles.chartLegendItem}>
                          <span className={styles.chartLegendLabel}>{product.name}</span>
                          <span className={styles.chartLegendValue}>{product.sales}</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${(product.sales / 1258) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Summary */}
                <div className={styles.chartCard}>
                  <h3 className={styles.chartCardTitle}>สรุปรายได้</h3>
                  <div className={styles.chartLegend}>
                    <div className={styles.chartLegendItem}>
                      <span className={styles.chartLegendLabel}>รายได้ทั้งหมด:</span>
                      <span className={styles.chartLegendValue}>฿ 45,500</span>
                    </div>
                    <div className={styles.chartLegendItem}>
                      <span className={styles.chartLegendLabel}>ค่าใช้สอย:</span>
                      <span className={styles.chartLegendValue}>฿ 5,200</span>
                    </div>
                    <div className={styles.chartLegendItem} style={{ backgroundColor: '#dcfce7' }}>
                      <span className={styles.chartLegendLabel}>กำไรสุทธิ:</span>
                      <span className={styles.chartLegendValue} style={{ color: '#16a34a' }}>฿ 40,300</span>
                    </div>
                  </div>
                </div>

                {/* Order Status Summary */}
                <div className={styles.chartCard}>
                  <h3 className={styles.chartCardTitle}>สรุปสถานะคำสั่งซื้อ</h3>
                  <div className={styles.chartLegend}>
                    {[
                      { label: 'สำเร็จ', value: 32, color: '#16a34a' },
                      { label: 'กำลังจัดส่ง', value: 8, color: '#0284c7' },
                      { label: 'รอดำเนินการ', value: 5, color: '#ea580c' },
                    ].map((item, index) => (
                      <div key={index} className={styles.chartLegendItem}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: '0.75rem',
                              height: '0.75rem',
                              backgroundColor: item.color,
                              borderRadius: '50%',
                            }}
                          ></div>
                          <span className={styles.chartLegendLabel}>{item.label}:</span>
                        </div>
                        <span className={styles.chartLegendValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              {modalType === 'order' ? 'เพิ่มคำสั่งซื้อ' : 'บันทึกการโอนเงิน'}
            </h3>
            <div className={styles.modalBody}>
              <input type="text" placeholder="เลขที่" className={styles.modalInput} />
              {modalType === 'payment' && (
                <>
                  <input type="text" placeholder="เลขที่คำสั่งซื้อ" className={styles.modalInput} />
                  <input type="number" placeholder="จำนวนเงิน" className={styles.modalInput} />
                  <select className={styles.modalSelect}>
                    <option>โอนธนาคาร</option>
                    <option>PromptPay</option>
                    <option>เงินสด</option>
                  </select>
                </>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setShowModal(false)} className={`${styles.modalButton} ${styles.modalButtonCancel}`}>
                ยกเลิก
              </button>
              <button onClick={() => setShowModal(false)} className={`${styles.modalButton} ${styles.modalButtonSubmit}`}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
