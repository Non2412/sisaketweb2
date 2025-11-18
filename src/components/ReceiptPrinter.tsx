'use client';

import React, { useRef, useState } from 'react';

interface OrderData {
  id: string;
  date: string;
  items: number;
  total: string;
  status: string;
  customerName?: string;
  customerPhone?: string;
  address?: string;
  itemDetails?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface ReceiptPrinterProps {
  order: OrderData;
  onClose?: () => void;
}

export default function ReceiptPrinter({ order, onClose }: ReceiptPrinterProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  // ฟังก์ชันพิมพ์ลงกระดาษ
  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      window.print();
    }
  };

  // ฟังก์ชันดาวน์โหลด PDF (ใช้ Browser's Print to PDF)
  const handleDownloadPDF = () => {
    if (receiptRef.current) {
      // สร้าง iframe เพื่อพิมพ์เป็น PDF
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.write(`
          <html>
            <head>
              <title>receipt-${order.id}</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: "Noto Sans Thai", sans-serif;
                }
                @media print {
                  body { margin: 0; padding: 0; }
                }
              </style>
            </head>
            <body>
              ${receiptRef.current.innerHTML}
            </body>
          </html>
        `);
        iframeDoc.close();

        setTimeout(() => {
          iframe.contentWindow?.print();
          document.body.removeChild(iframe);
        }, 250);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* ปุ่มการทำงาน */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={handlePrintReceipt}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          🖨️ พิมพ์ใบเสร็จ
        </button>
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          📥 ดาวน์โหลด PDF
        </button>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ✕ ปิด
          </button>
        )}
      </div>

      {/* ใบเสร็จ */}
      <div
        ref={receiptRef}
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: '"Noto Sans Thai", sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #000',
            paddingBottom: '1rem',
          }}
        >
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '24px', fontWeight: 'bold' }}>
            CHARITY TEES
          </h1>
          <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '12px' }}>
            เสื้อเนื้อดีเพื่อสาธารณชน
          </p>
          <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '12px' }}>
            📞 081-234-5678 | 📧 contact@charitytees.com
          </p>
        </div>

        {/* ข้อมูลใบเสร็จ */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>เลขที่ใบเสร็จ:</span>
            <span>{order.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 'bold' }}>วันที่:</span>
            <span>{order.date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>เวลา:</span>
            <span>{new Date().toLocaleTimeString('th-TH')}</span>
          </div>
        </div>

        {/* ข้อมูลผู้ซื้อ */}
        {order.customerName && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.25rem',
            }}
          >
            <div style={{ marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 'bold' }}>ชื่อผู้ซื้อ:</span> {order.customerName}
            </div>
            {order.customerPhone && (
              <div style={{ marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 'bold' }}>เบอร์โทร:</span> {order.customerPhone}
              </div>
            )}
            {order.address && (
              <div>
                <span style={{ fontWeight: 'bold' }}>ที่อยู่:</span> {order.address}
              </div>
            )}
          </div>
        )}

        {/* รายการสินค้า */}
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              borderTop: '1px solid #000',
              borderBottom: '2px solid #000',
              padding: '0.5rem 0',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>รายการ</span>
              <span style={{ fontWeight: 'bold', textAlign: 'center' }}>จำนวน</span>
              <span style={{ fontWeight: 'bold', textAlign: 'right' }}>ราคา</span>
            </div>
          </div>

          {order.itemDetails && order.itemDetails.length > 0 ? (
            order.itemDetails.map((item, index) => (
              <div
                key={index}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}
              >
                <span>{item.name}</span>
                <span style={{ textAlign: 'center' }}>{item.quantity}</span>
                <span style={{ textAlign: 'right' }}>฿{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))
          ) : (
            <div style={{ marginBottom: '0.5rem' }}>
              <span>สินค้า x {order.items}</span>
              <span style={{ float: 'right' }}>฿{order.total}</span>
            </div>
          )}

          <div style={{ borderTop: '1px solid #000', paddingTop: '0.5rem' }} />
        </div>

        {/* สรุปยอด */}
        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '14px',
            }}
          >
            <span>ราคารวม:</span>
            <span>฿{order.total}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '14px',
            }}
          >
            <span>ค่าจัดส่ง:</span>
            <span>฿50</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '14px',
            }}
          >
            <span>ภาษี (7%):</span>
            <span>฿{(parseInt(order.total) * 0.07).toFixed(2)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '2px solid #000',
              paddingTop: '0.5rem',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            <span>ยอดรวมทั้งสิ้น:</span>
            <span>฿{(parseInt(order.total) + 50 + parseInt(order.total) * 0.07).toFixed(2)}</span>
          </div>
        </div>

        {/* สถานะ */}
        <div
          style={{
            textAlign: 'center',
            padding: '0.75rem',
            backgroundColor: '#f0fdf4',
            borderRadius: '0.25rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
            color: '#16a34a',
          }}
        >
          สถานะ: {order.status}
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1rem',
            fontSize: '12px',
            color: '#666',
          }}
        >
          <p style={{ margin: '0.5rem 0' }}>ขอบคุณที่ซื้อสินค้าจากเรา</p>
          <p style={{ margin: '0.5rem 0' }}>Thank you for your purchase</p>
          <p style={{ margin: '0.5rem 0', fontSize: '10px' }}>
            {new Date().toLocaleString('th-TH')}
          </p>
        </div>
      </div>

      {/* CSS สำหรับ Print */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          * {
            box-shadow: none !important;
            text-shadow: none !important;
          }
          div[style*="display: flex"][style*="gap: 1rem"][style*="justifyContent: flex-end"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}