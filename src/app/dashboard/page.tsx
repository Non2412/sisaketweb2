'use client';

import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OrderList from '@/components/dashboard/OrderList';

export default function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '2.25rem' }}>⏱</span>
                <span>ประวัติการสั่งซื้อเสื้อ</span>
              </h1>
              <p style={{
                color: '#6b7280',
                marginLeft: '3.5rem'
              }}>
                รายการคำสั่งซื้อเสื้อเฉลิมฉลองเนื่อง 243 ปี
              </p>
            </div>
            
            {/* User Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#e0e7ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>👤</div>
              <span style={{
                color: '#374151',
                fontWeight: '500'
              }}>Supachai Wicheer</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <DashboardStats />

        {/* Add New Order Button */}
        <style jsx>{`
          .btn-add-order {
            background: #4f46e5;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: none;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          .btn-add-order:hover {
            background: #4338ca;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
          }
        `}</style>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1.5rem'
        }}>
          <button className="btn-add-order">
            <span style={{ fontSize: '1.25rem' }}>+</span>
            <span>สั่งซื้อเสื้อใหม่</span>
          </button>
        </div>

        {/* Orders List */}
        <OrderList />
      </div>
    </div>
  );
}
