import { apiClient } from './client';
import { CreateOrderRequest, ApiResponse } from '@/types/order';

// Create new order
export const createOrder = async (orderData: CreateOrderRequest) => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      '/api/orders',
      orderData
    );
    return response;
  } catch (error) {
    // Silent error - will be handled by caller
    throw error;
  }
};

// Get all orders
export const getAllOrders = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>('/api/orders');
    return response;
  } catch (error) {
    console.error('Get orders error:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      `/api/orders/${orderId}`
    );
    return response;
  } catch (error) {
    console.error('Get order error:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  try {
    const response = await apiClient.put<ApiResponse<any>>(
      `/api/orders/${orderId}`,
      { status }
    );
    return response;
  } catch (error) {
    console.error('Update order error:', error);
    throw error;
  }
};

// Get shipping settings
export const getShippingSettings = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      '/api/settings/shipping_config'
    );
    return response;
  } catch (error) {
    console.error('Get shipping settings error:', error);
    throw error;
  }
};

// Get payment methods
export const getPaymentMethods = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      '/api/settings/payment_methods'
    );
    return response;
  } catch (error) {
    console.error('Get payment methods error:', error);
    throw error;
  }
};
