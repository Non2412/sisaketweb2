'use client';

import React from 'react';

export default function OrderList() {
  const orders: any[] = [];

  if (orders.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '3rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          {/* Icon */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '128px',
              height: '128px',
              background: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4.5rem'
            }}>📦</div>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.75rem'
          }}>
            ยังไม่มีประวัติการสั่งซื้อ
          </h3>

          {/* Description */}
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            maxWidth: '28rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            เมื่อคุณสั่งซื้อเสื้อแล้ว ประวัติและสถานะการสั่งซื้อจะแสดงที่นี่
          </p>

          {/* Call to Action Button */}
          <style jsx>{`
            .btn-order {
              background: #4f46e5;
              color: white;
              padding: 0.75rem 2rem;
              border-radius: 0.5rem;
              font-weight: 500;
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              border: none;
              cursor: pointer;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
            }
            .btn-order:hover {
              background: #4338ca;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
          `}</style>
          <button className="btn-order">
            <span style={{ fontSize: '1.25rem' }}>+</span>
            <span>สั่งซื้อเสื้อเลย</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '1.5rem' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          <span>📝</span>
          <span>รายการคำสั่งซื้อ</span>
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>เลขที่คำสั่งซื้อ</th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>ชื่อ-สกุล</th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>ประเภทเสื้อ</th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>จำนวน</th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>ราคา</th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>สถานะ</th>
                <th style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>วันที่สั่ง</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{order.orderNumber}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{order.customerName}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{order.shirtType}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{order.totalQuantity}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>{order.totalPrice} บาท</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      background: '#fef3c7',
                      color: '#92400e'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4b5563' }}>
                    {new Date(order.createdAt).toLocaleDateString('th-TH')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
