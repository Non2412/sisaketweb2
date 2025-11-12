'use client';

import React from 'react';
import styles from './OrderList.module.css';

export default function OrderList() {
  // ตอนนี้ยังไม่มีข้อมูล จะแสดง Empty State
  const orders: any[] = [];

  if (orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          {/* Icon */}
          <div className={styles.emptyIconWrapper}>
            <div className={styles.emptyIcon}>📦</div>
          </div>

          {/* Title */}
          <h3 className={styles.emptyTitle}>
            ยังไม่มีประวัติการสั่งซื้อ
          </h3>

          {/* Description */}
          <p className={styles.emptyDescription}>
            เมื่อคุณสั่งซื้อเสื้อแล้ว ประวัติและสถานะการสั่งซื้อจะแสดงที่นี่
          </p>

          {/* Call to Action Button */}
          <button className={styles.btnEmptyAction}>
            <span className={styles.icon}>+</span>
            <span>สั่งซื้อเสื้อเลย</span>
          </button>
        </div>
      </div>
    );
  }

  // เมื่อมีข้อมูล จะแสดงรายการคำสั่งซื้อ
  return (
    <div className={styles.orderListContainer}>
      <div className={styles.orderListHeader}>
        <h2 className={styles.orderListTitle}>
          <span>📝</span>
          <span>รายการคำสั่งซื้อ</span>
        </h2>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>เลขที่คำสั่งซื้อ</th>
                <th>ชื่อ-สกุล</th>
                <th>ประเภทเสื้อ</th>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>สถานะ</th>
                <th>วันที่สั่ง</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.customerName}</td>
                  <td>{order.shirtType}</td>
                  <td>{order.totalQuantity}</td>
                  <td>{order.totalPrice} บาท</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${order.status}`]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
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
