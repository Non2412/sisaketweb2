import { apiClient } from './client';
import { ApiResponse } from '@/types/order';

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  phone?: string;
}

// Create or update user from Google login
export const syncGoogleUser = async (userData: GoogleUser) => {
  try {
    const response = await apiClient.post<ApiResponse<any>>(
      '/api/users',
      userData
    );
    return response;
  } catch (error) {
    console.error('Sync Google user error:', error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any[]>>('/api/users');
    return response;
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      `/api/users/${userId}`
    );
    return response;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};
