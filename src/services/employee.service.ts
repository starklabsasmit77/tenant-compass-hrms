
import { apiService } from './api';
import { PaginatedResponse } from '@/types/interfaces';

// Types
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  employeeId: string;
  department: string;
  position: string;
  joiningDate: string;
  status: 'active' | 'inactive' | 'onboarding' | 'terminated';
  role: string;
  managerId?: string;
  managerName?: string;
  address?: string;
  avatar?: string;
  emergencyContact?: string;
  salary?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

// Employee service functions
export const employeeService = {
  // Get employees with filters
  getEmployees: (filters: EmployeeFilters = {}) => {
    return apiService.get<PaginatedResponse<Employee>>('/employees', { params: filters });
  },
  
  // Get employee by ID
  getEmployeeById: (id: string) => {
    return apiService.get<Employee>(`/employees/${id}`);
  },
  
  // Create new employee
  createEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    const formData = new FormData();
    
    Object.entries(employee).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append('avatar', value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    return apiService.post<Employee>('/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Update employee
  updateEmployee: (id: string, employee: Partial<Employee>) => {
    const formData = new FormData();
    
    Object.entries(employee).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append('avatar', value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    return apiService.put<Employee>(`/employees/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Change employee status
  changeEmployeeStatus: (id: string, status: 'active' | 'inactive' | 'onboarding' | 'terminated') => {
    return apiService.patch<Employee>(`/employees/${id}/status`, { status });
  },
  
  // Get employee documents
  getEmployeeDocuments: (employeeId: string) => {
    return apiService.get<any[]>(`/employees/${employeeId}/documents`);
  },
  
  // Upload employee document
  uploadEmployeeDocument: (employeeId: string, file: File, documentType: string, description?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    if (description) formData.append('description', description);
    
    return apiService.post<any>(`/employees/${employeeId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Delete employee document
  deleteEmployeeDocument: (employeeId: string, documentId: string) => {
    return apiService.delete<{ success: boolean }>(`/employees/${employeeId}/documents/${documentId}`);
  },
  
  // Get my documents (for employee)
  getMyDocuments: () => {
    return apiService.get<any[]>('/employees/me/documents');
  },
  
  // Get employee team members (for managers)
  getTeamMembers: (managerId: string) => {
    return apiService.get<Employee[]>(`/employees/manager/${managerId}/team`);
  },
  
  // Get my team members (for current manager)
  getMyTeamMembers: () => {
    return apiService.get<Employee[]>('/employees/me/team');
  }
};
