
import { apiService } from './api';
import { PaginatedResponse } from '@/types/interfaces';

// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorId: string;
  important: boolean;
  expiryDate?: string;
  attachments?: string[];
  sendEmail: boolean;
  sendSms: boolean;
  targetGroups?: string[];
  createdAt: string;
  updatedAt: string;
}

// Policy Types
export interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  version: string;
  effectiveDate: string;
  requiredAcknowledgement: boolean;
  acknowledgements?: {
    employeeId: string;
    employeeName: string;
    date: string;
  }[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Organization settings types
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
  branding: {
    primaryColor: string;
    logo: string;
    companyName: string;
    companyWebsite: string;
  };
}

// Organization department types
export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  managerName?: string;
  employeeCount?: number;
  status: 'active' | 'inactive';
  parentDepartmentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Organization service functions
export const organizationService = {
  // Get organization details
  getOrganizationDetails: () => {
    return apiService.get<any>('/organization');
  },
  
  // Update organization details
  updateOrganization: (data: any) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'logo' && value instanceof File) {
        formData.append('logo', value);
      } else if (value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    
    return apiService.put<any>('/organization', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Get organization settings
  getOrganizationSettings: () => {
    return apiService.get<OrganizationSettings>('/organization/settings');
  },
  
  // Update organization settings
  updateOrganizationSettings: (settings: Partial<OrganizationSettings>) => {
    return apiService.put<OrganizationSettings>('/organization/settings', settings);
  },
  
  // Get departments
  getDepartments: () => {
    return apiService.get<Department[]>('/organization/departments');
  },
  
  // Create department
  createDepartment: (department: Omit<Department, 'id' | 'employeeCount' | 'createdAt' | 'updatedAt'>) => {
    return apiService.post<Department>('/organization/departments', department);
  },
  
  // Update department
  updateDepartment: (id: string, department: Partial<Omit<Department, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return apiService.put<Department>(`/organization/departments/${id}`, department);
  },
  
  // Delete department
  deleteDepartment: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/organization/departments/${id}`);
  },
  
  // Get announcements
  getAnnouncements: () => {
    return apiService.get<Announcement[]>('/organization/announcements');
  },
  
  // Get announcement by ID
  getAnnouncementById: (id: string) => {
    return apiService.get<Announcement>(`/organization/announcements/${id}`);
  },
  
  // Create announcement
  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>) => {
    const formData = new FormData();
    
    Object.entries(announcement).forEach(([key, value]) => {
      if (key === 'attachments' && Array.isArray(value) && value[0] instanceof File) {
        value.forEach((file: File) => {
          formData.append('attachments', file);
        });
      } else if (value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    
    return apiService.post<Announcement>('/organization/announcements', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Update announcement
  updateAnnouncement: (id: string, announcement: Partial<Omit<Announcement, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>>) => {
    return apiService.put<Announcement>(`/organization/announcements/${id}`, announcement);
  },
  
  // Delete announcement
  deleteAnnouncement: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/organization/announcements/${id}`);
  },
  
  // Get policies
  getPolicies: () => {
    return apiService.get<Policy[]>('/organization/policies');
  },
  
  // Get policy by ID
  getPolicyById: (id: string) => {
    return apiService.get<Policy>(`/organization/policies/${id}`);
  },
  
  // Create policy
  createPolicy: (policy: Omit<Policy, 'id' | 'fileUrl' | 'fileSize' | 'createdAt' | 'updatedAt'> & { file: File }) => {
    const formData = new FormData();
    
    // Extract file from policy object
    const { file, ...policyData } = policy;
    formData.append('file', file);
    
    // Add remaining policy data
    Object.entries(policyData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    
    return apiService.post<Policy>('/organization/policies', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Update policy
  updatePolicy: (id: string, policy: Partial<Omit<Policy, 'id' | 'fileUrl' | 'fileSize' | 'createdAt' | 'updatedAt'>> & { file?: File }) => {
    const formData = new FormData();
    
    // Extract file from policy object if it exists
    const { file, ...policyData } = policy;
    if (file) {
      formData.append('file', file);
    }
    
    // Add remaining policy data
    Object.entries(policyData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    
    return apiService.put<Policy>(`/organization/policies/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Delete policy
  deletePolicy: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/organization/policies/${id}`);
  },
  
  // Download policy
  downloadPolicy: (id: string) => {
    return apiService.get<Blob>(`/organization/policies/${id}/download`, {
      responseType: 'blob' as any
    });
  },
  
  // Acknowledge policy
  acknowledgePolicy: (id: string) => {
    return apiService.post<{ success: boolean }>(`/organization/policies/${id}/acknowledge`);
  }
};
