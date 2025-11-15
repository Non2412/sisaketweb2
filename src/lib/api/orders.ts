// Mock API สำหรับจัดการคำสั่งซื้อ (จะเปลี่ยนเป็น API จริงในภายหลัง)

import { Order, OrderStats, CreateOrderInput } from '@/types/order';

// ฟังก์ชันสร้าง Order ID
const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ฟังก์ชันดึงสถิติคำสั่งซื้อ
export const getOrderStats = async (): Promise<OrderStats> => {
  // TODO: เชื่อมต่อกับ API จริง
  return {
    totalOrders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    completedOrders: 0,
  };
};

// ฟังก์ชันดึงรายการคำสั่งซื้อทั้งหมด
export const getAllOrders = async (): Promise<Order[]> => {
  // TODO: เชื่อมต่อกับ API จริง
  return [];
};

// ฟังก์ชันดึงคำสั่งซื้อตาม ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  // TODO: เชื่อมต่อกับ API จริง
  return null;
};

// ฟังก์ชันสร้างคำสั่งซื้อใหม่
export const createOrder = async (input: CreateOrderInput): Promise<Order> => {
  // TODO: เชื่อมต่อกับ API จริง
  const totalQuantity = input.sizes.reduce((sum, size) => sum + size.quantity, 0);
  const pricePerShirt = input.shirtType === 'แบบดี' ? 198 : 198;
  const totalPrice = totalQuantity * pricePerShirt;

  const newOrder: Order = {
    id: generateOrderId(),
    orderNumber: `243-${Date.now()}`,
    customerName: input.customerName,
    studentId: input.studentId,
    phone: input.phone,
    email: input.email,
    address: input.address,
    notes: input.notes,
    shirtType: input.shirtType,
    sizes: input.sizes,
    totalQuantity,
    totalPrice,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newOrder;
};

// ฟังก์ชันอัพเดทสถานะคำสั่งซื้อ
export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<Order | null> => {
  // TODO: เชื่อมต่อกับ API จริง
  return null;
};

// ฟังก์ชันอัพโหลดหลักฐานการชำระเงิน
export const uploadPaymentProof = async (
  orderId: string,
  file: File
): Promise<Order | null> => {
  // TODO: เชื่อมต่อกับ API จริง
  return null;
};
