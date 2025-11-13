'use client';

import React from 'react';
import { OrderStats } from '@/types/order';

interface StatCardProps {
  title: string;
  count: number;
  bgGradient: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, bgGradient, icon }) => {
  return (
    <div 
      className="stat-card"
      style={{
        background: bgGradient,
        borderRadius: '0.75rem',
        padding: '1.5rem',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: 'translateY(0)'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>{title}</p>
          <p style={{
            fontSize: '2.25rem',
            fontWeight: 'bold'
          }}>{count}</p>
        </div>
        <div style={{
          fontSize: '3rem',
          opacity: 0.8
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function DashboardStats() {
  const stats: OrderStats = {
    totalOrders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    completedOrders: 0,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  return (
    <div style={gridStyle}>
      <style jsx global>{`
        .stat-card:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-4px) !important;
        }
        @media (min-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
      <div className="stats-grid" style={gridStyle}>
        <StatCard
          title="คำสั่งซื้อทั้งหมด"
          count={stats.totalOrders}
          bgGradient="linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
          icon="📋"
        />
        
        <StatCard
          title="เสื้อที่สั่งทั้งหมด"
          count={stats.pendingOrders}
          bgGradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
          icon="👕"
        />
        
        <StatCard
          title="ยอดรวมที่ค่าย"
          count={stats.paidOrders}
          bgGradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
          icon="📷"
        />
        
        <StatCard
          title="สถานะที่คลายหลาย"
          count={stats.completedOrders}
          bgGradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          icon="📊"
        />
      </div>
    </div>
  );
}
