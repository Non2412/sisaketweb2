import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OrderList from '@/components/dashboard/OrderList';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardWrapper}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitleSection}>
              <h1>
                <span className={styles.icon}>⏱</span>
                <span>ประวัติการสั่งซื้อเสื้อ</span>
              </h1>
              <p>รายการคำสั่งซื้อเสื้อเฉลิมฉลองเนื่อง 243 ปี</p>
            </div>
            
            {/* User Info */}
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>👤</div>
              <span className={styles.userName}>Supachai Wicheer</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <DashboardStats />

        {/* Add New Order Button */}
        <div className={styles.addOrderSection}>
          <button className={styles.btnAddOrder}>
            <span className={styles.icon}>+</span>
            <span>สั่งซื้อเสื้อใหม่</span>
          </button>
        </div>

        {/* Orders List */}
        <OrderList />
      </div>
    </div>
  );
}
