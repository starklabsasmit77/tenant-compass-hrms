
import { apiService } from './api';

// Types
export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  logo?: string;
  adminEmail: string;
  adminName: string;
  status: 'active' | 'inactive' | 'suspended' | 'trial';
  planId: string;
  planName: string;
  employeeCount: number;
  subscriptionStatus: 'active' | 'trial' | 'expired' | 'cancelled';
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  createdAt: string;
}

export interface TenantFilters {
  search?: string;
  status?: string;
  planId?: string;
  subscriptionStatus?: string;
  page?: number;
  limit?: number;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'quarterly';
  features: string[];
  limits: {
    employees: number;
    departments: number;
    storage: number; // in GB
  };
  isActive: boolean;
}

// Tenant service functions (Super Admin only)
export const tenantService = {
  // Get all tenants with pagination and filters
  getTenants: (filters: TenantFilters = {}) => {
    return apiService.get<PaginatedResponse<Tenant>>('/tenants', { params: filters });
  },
  
  // Get tenant by ID
  getTenantById: (id: string) => {
    return apiService.get<Tenant>(`/tenants/${id}`);
  },
  
  // Create new tenant
  createTenant: (tenant: Omit<Tenant, 'id' | 'employeeCount' | 'createdAt'>) => {
    const formData = new FormData();
    
    Object.entries(tenant).forEach(([key, value]) => {
      if (key === 'logo' && value instanceof File) {
        formData.append('logo', value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    return apiService.post<Tenant>('/tenants', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Update tenant
  updateTenant: (id: string, tenant: Partial<Tenant>) => {
    const formData = new FormData();
    
    Object.entries(tenant).forEach(([key, value]) => {
      if (key === 'logo' && value instanceof File) {
        formData.append('logo', value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    return apiService.put<Tenant>(`/tenants/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Change tenant status
  changeTenantStatus: (id: string, status: 'active' | 'inactive' | 'suspended') => {
    return apiService.patch<Tenant>(`/tenants/${id}/status`, { status });
  },
  
  // Get tenant stats
  getTenantStats: () => {
    return apiService.get<{
      totalTenants: number;
      activeTenants: number;
      trialTenants: number;
      suspendedTenants: number;
      revenue: { monthly: number; yearly: number; total: number };
    }>('/tenants/stats');
  },
  
  // Get subscription plans
  getPlans: () => {
    return apiService.get<Plan[]>('/tenants/plans');
  },
  
  // Create subscription plan
  createPlan: (plan: Omit<Plan, 'id'>) => {
    return apiService.post<Plan>('/tenants/plans', plan);
  },
  
  // Update subscription plan
  updatePlan: (id: string, plan: Partial<Omit<Plan, 'id'>>) => {
    return apiService.put<Plan>(`/tenants/plans/${id}`, plan);
  },
  
  // Delete subscription plan
  deletePlan: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/tenants/plans/${id}`);
  }
};
