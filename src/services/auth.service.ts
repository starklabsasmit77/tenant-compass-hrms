
import { apiService } from './api';

// Types
interface LoginParams {
  email: string;
  password: string;
  organizationId?: string;
}

interface LoginResponse {
  user: any;
  token: string;
}

interface SignupParams {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

interface ResetPasswordParams {
  email: string;
}

interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

// Auth service functions
export const authService = {
  // Login user
  login: (params: LoginParams) => {
    return apiService.post<LoginResponse>('/auth/login', params);
  },
  
  // Register new tenant
  signup: (params: SignupParams) => {
    return apiService.post<{success: boolean}>('/auth/register', params);
  },
  
  // Request password reset
  requestPasswordReset: (params: ResetPasswordParams) => {
    return apiService.post<{success: boolean}>('/auth/forgot-password', params);
  },
  
  // Reset password with token
  resetPassword: (token: string, password: string) => {
    return apiService.post<{success: boolean}>(`/auth/reset-password/${token}`, { password });
  },
  
  // Change password (authenticated)
  changePassword: (params: ChangePasswordParams) => {
    return apiService.post<{success: boolean}>('/auth/change-password', params);
  },
  
  // Get current user profile
  getCurrentUser: () => {
    return apiService.get<any>('/auth/me');
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    return Promise.resolve({ success: true });
  }
};
