import { apiClient } from './client';
import { ApiResponse } from '@/types/order';

export interface Product {
  _id: string;
  productCode: string;
  name: string;
  description: string;
  price: number;
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
  sizes: {
    size: string;
    stock: number;
    available: boolean;
  }[];
  isActive: boolean;
  category: string;
  tags: string[];
}

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>('/api/products');
    return response;
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (productId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/api/products/${productId}`
    );
    return response;
  } catch (error) {
    console.error('Get product error:', error);
    throw error;
  }
};
