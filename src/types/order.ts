// Types สำหรับระบบสั่งซื้อเสื้อ

export type OrderStatus = 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';

export type ShirtType = 'แบบดี' | 'แบบโปโล';

export interface ShirtSize {
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  studentId: string;
  phone: string;
  email?: string;
  
  // รายละเอียดที่อยู่จัดส่ง
  address: string;
  notes?: string;
  
  // รายละเอียดคำสั่งซื้อ
  shirtType: ShirtType;
  sizes: ShirtSize[];
  totalQuantity: number;
  totalPrice: number;
  
  // สถานะ
  status: OrderStatus;
  paymentProof?: string;
  
  // วันที่
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  completedAt?: Date;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  paidOrders: number;
  completedOrders: number;
}

export interface CreateOrderInput {
  customerName: string;
  studentId: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
  shirtType: ShirtType;
  sizes: ShirtSize[];
}
