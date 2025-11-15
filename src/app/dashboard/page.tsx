"use client";

import { useState } from 'react';
import { LogOut, Plus, Search, ShoppingBag, Shirt, CreditCard, CheckCircle } from 'lucide-react';


export default function OrderHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: '#CT-20240012',
      date: '18/07/2024',
      items: 3,
      total: '฿1,500',
      status: 'สำเร็จ',
      statusColor: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    },
    {
      id: '#CT-20240011',
      date: '15/07/2024',
      items: 1,
      total: '฿500',
      status: 'กำลังจัดส่ง',
      statusColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    },
    {
      id: '#CT-20240010',
      date: '12/07/2024',
      items: 2,
      total: '฿1,000',
      status: 'รอดำเนินการ',
      statusColor: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300',
    },
    {
      id: '#CT-20240009',
      date: '10/07/2024',
      items: 5,
      total: '฿2,500',
      status: 'ยกเลิก',
      statusColor: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    },
  ];

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-background-dark px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold">Charity Tees</h2>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium">
            หน้าแรก
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary text-sm font-medium">
            สั่งซื้อ
          </a>
          <a href="#" className="text-primary text-sm font-bold">
            ประวัติการสั่งซื้อ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <LogOut size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-300" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center py-5 sm:py-8 lg:py-12">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 pb-6">
            <h1 className="text-gray-900 dark:text-white text-4xl font-black min-w-72">
              ประวัติการสั่งซื้อ
            </h1>
            <button className="flex items-center justify-center gap-2 min-w-[140px] h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold rounded-xl shadow-sm">
              <Plus size={20} />
              <span>สั่งซื้อเสื้อใหม่</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="คำสั่งซื้อทั้งหมด"
              value="12"
              icon={<ShoppingBag size={20} />}
              bgColor="bg-primary/10 dark:bg-primary/20"
              textColor="text-primary"
            />
            <StatCard
              label="เสื้อที่สั่งทั้งหมด"
              value="25"
              icon={<Shirt size={20} />}
              bgColor="bg-green-500/10 dark:bg-green-500/20"
              textColor="text-green-600 dark:text-green-400"
            />
            <StatCard
              label="ยอดรวมทั้งหมด"
              value="฿12,500"
              icon={<CreditCard size={20} />}
              bgColor="bg-blue-500/10 dark:bg-blue-500/20"
              textColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              label="สำเร็จแล้ว"
              value="8"
              icon={<CheckCircle size={20} />}
              bgColor="bg-orange-500/10 dark:bg-orange-500/20"
              textColor="text-orange-600 dark:text-orange-400"
            />
          </div>

          {/* Orders Section */}
          <div className="mt-8">
            <h2 className="text-gray-900 dark:text-white text-2xl font-bold pb-3 pt-5">
              รายการคำสั่งซื้อ
            </h2>

            {/* Search Bar */}
            <div className="py-3">
              <div className="flex items-center max-w-md h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark overflow-hidden">
                <div className="flex items-center justify-center pl-4 text-gray-500 dark:text-gray-400">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="ค้นหาเลขที่คำสั่งซื้อ"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="mt-4 overflow-x-auto rounded-xl shadow ring-1 ring-black ring-opacity-5 dark:ring-white/10">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      เลขที่คำสั่งซื้อ
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      วันที่
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      จำนวนรายการ
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      ยอดรวม
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      สถานะ
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      การดำเนินการ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-background-dark">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                          {order.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {order.date}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {order.items}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {order.total}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-primary hover:text-primary/80">
                            ดูรายละเอียด
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                        ไม่พบคำสั่งซื้อ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, bgColor, textColor }) {
  return (
    <div className={`flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 ${bgColor} ${textColor}`}>
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">{label}</p>
        <span className="opacity-80">{icon}</span>
      </div>
      <p className="tet-3xl font-bold">{value}</p>
    </div>
  );
}