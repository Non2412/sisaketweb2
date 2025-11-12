'use client';

import React from 'react';
import { OrderStats } from '@/types/order';
import styles from './DashboardStats.module.css';

interface StatCardProps {
  title: string;
  count: number;
  colorClass: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, colorClass, icon }) => {
  return (
    <div className={`${styles.statCard} ${styles[colorClass]}`}>
      <div className={styles.statCardContent}>
        <div className={styles.statInfo}>
          <p className={styles.statTitle}>{title}</p>
          <p className={styles.statCount}>{count}</p>
        </div>
        <div className={styles.statIcon}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function DashboardStats() {
  // ข้อมูลสถิติ (จะเชื่อมต่อกับ API ภายหลัง)
  const stats: OrderStats = {
    totalOrders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    completedOrders: 0,
  };

  return (
    <div className={styles.statsGrid}>
      <StatCard
        title="คำสั่งซื้อทั้งหมด"
        count={stats.totalOrders}
        colorClass="statCardIndigo"
        icon="📋"
      />
      
      <StatCard
        title="เสื้อที่สั่งทั้งหมด"
        count={stats.pendingOrders}
        colorClass="statCardGreen"
        icon="👕"
      />
      
      <StatCard
        title="ยอดรวมที่ค่าย"
        count={stats.paidOrders}
        colorClass="statCardCyan"
        icon="📷"
      />
      
      <StatCard
        title="สถานะที่คลายหลาย"
        count={stats.completedOrders}
        colorClass="statCardOrange"
        icon="📊"
      />
    </div>
  );
}
