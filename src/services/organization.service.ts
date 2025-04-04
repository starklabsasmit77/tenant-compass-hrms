
import { apiService } from './api';

// Types
export interface Organization {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  taxId?: string;
  registrationNumber?: string;
  establishedDate?: string;
  status: 'active' | 'inactive' | 'suspended';
  planId?: string;
  planName?: string;
  subscriptionStatus?: 'active' | 'trial' | 'expired' | 'cancelled';
  subscriptionEndDate?: string;
  settings?: Record<string, any>;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  managerName?: string;
  employeeCount?: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface OrganizationSettings {
  workHours: {
    perDay: number;
    startTime: string;
    endTime: string;
    weekends: number[]; // 0 = Sunday, 6 = Saturday
  };
  leave: {
    annualLeaveEntitlement: number;
    sickLeaveEntitlement: number;
    carryOverLimit: number;
    requireAttachmentAfterDays: number;
  };
  payroll: {
    salaryDay: number;
    currency: string;
    taxRate: number;
    allowances: {
      name: string;
      type: 'percentage' | 'fixed';
      value: number;
    }[];
    deductions: {
      name: string;
      type: 'percentage' | 'fixed';
      value: number;
    }[];
  };
}

// Organization service functions
export const organizationService = {
  // Get organization details
  getOrganization: () => {
    return apiService.get<Organization>('/organization');
  },
  
  // Update organization
  updateOrganization: (data: Partial<Organization>) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'logo' && value instanceof File) {
        formData.append('logo', value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    return apiService.put<Organization>('/organization', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Get organization settings
  getSettings: () => {
    return apiService.get<OrganizationSettings>('/organization/settings');
  },
  
  // Update organization settings
  updateSettings: (settings: Partial<OrganizationSettings>) => {
    return apiService.put<OrganizationSettings>('/organization/settings', settings);
  },
  
  // Get departments
  getDepartments: () => {
    return apiService.get<Department[]>('/organization/departments');
  },
  
  // Create department
  createDepartment: (department: Omit<Department, 'id' | 'employeeCount' | 'createdAt'>) => {
    return apiService.post<Department>('/organization/departments', department);
  },
  
  // Update department
  updateDepartment: (id: string, department: Partial<Omit<Department, 'id' | 'employeeCount' | 'createdAt'>>) => {
    return apiService.put<Department>(`/organization/departments/${id}`, department);
  },
  
  // Delete department
  deleteDepartment: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/organization/departments/${id}`);
  }
};
