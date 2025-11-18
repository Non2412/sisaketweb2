import { apiClient } from './client';
import { ApiResponse } from '@/types/order';

export interface StatisticsSummary {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  totalItems: number;
}

export interface DailyStats {
  date: Date;
  totalOrders: number;
  totalItems: number;
  totalRevenue: number;
}

export interface TopProduct {
  _id: string;
  productName: string;
  totalSold: number;
  totalRevenue: number;
}

export interface SizeStats {
  _id: string;
  count: number;
}

// Get summary statistics
export const getStatisticsSummary = async () => {
  try {
    const response = await apiClient.get<ApiResponse<StatisticsSummary>>(
      '/api/statistics/summary'
    );
    return response;
  } catch (error) {
    console.error('Get statistics summary error:', error);
    throw error;
  }
};

// Get daily statistics
export const getDailyStatistics = async () => {
  try {
    const response = await apiClient.get<ApiResponse<DailyStats>>(
      '/api/statistics/daily'
    );
    return response;
  } catch (error) {
    console.error('Get daily statistics error:', error);
    throw error;
  }
};

// Get top products
export const getTopProducts = async () => {
  try {
    const response = await apiClient.get<ApiResponse<TopProduct[]>>(
      '/api/statistics/top-products'
    );
    return response;
  } catch (error) {
    console.error('Get top products error:', error);
    throw error;
  }
};

// Get size statistics
export const getSizeStatistics = async () => {
  try {
    const response = await apiClient.get<ApiResponse<SizeStats[]>>(
      '/api/statistics/sizes'
    );
    return response;
  } catch (error) {
    console.error('Get size statistics error:', error);
    throw error;
  }
};
