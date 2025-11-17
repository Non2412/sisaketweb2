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

// Backend API Types
export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface OrderPricing {
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

export interface OrderShipping {
  method: string;
  firstItemFee: number;
  additionalItemFee: number;
  totalItems: number;
}

export interface OrderPayment {
  method: 'promptpay' | 'bank_transfer' | 'cod';
  status: 'pending' | 'paid' | 'failed';
  paidAt?: Date;
  slipUrl?: string;
  transactionId?: string;
}

export interface CreateOrderRequest {
  customer: {
    name: string;
    phone: string;
    email?: string;
    googleId?: string;
    address: {
      fullAddress: string;
      street?: string;
      subDistrict?: string;
      district?: string;
      province?: string;
      postalCode?: string;
    };
  };
  items: OrderItem[];
  pricing: OrderPricing;
  shipping: OrderShipping;
  payment: OrderPayment;
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}
