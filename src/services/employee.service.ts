
import { apiService } from './api';

// Types
export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

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
  avatar?: string;
  salary?: number;
  managerId?: string;
  address?: string;
  emergencyContact?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Employee service functions
export const employeeService = {
  // Get all employees with pagination and filters
  getEmployees: (filters: EmployeeFilters = {}) => {
    return apiService.get<PaginatedResponse<Employee>>('/employees', { params: filters });
  },
  
  // Get employee by ID
  getEmployeeById: (id: string) => {
    return apiService.get<Employee>(`/employees/${id}`);
  },
  
  // Create new employee
  createEmployee: (employee: Omit<Employee, 'id'>) => {
    return apiService.post<Employee>('/employees', employee);
  },
  
  // Update employee
  updateEmployee: (id: string, employee: Partial<Employee>) => {
    return apiService.put<Employee>(`/employees/${id}`, employee);
  },
  
  // Delete employee
  deleteEmployee: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/employees/${id}`);
  },
  
  // Bulk import employees
  bulkImportEmployees: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiService.post<{ success: boolean; imported: number; failed: number }>('/employees/bulk-import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Get employee documents
  getEmployeeDocuments: (employeeId: string) => {
    return apiService.get<any[]>(`/employees/${employeeId}/documents`);
  },
  
  // Upload employee document
  uploadEmployeeDocument: (employeeId: string, file: File, documentType: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    return apiService.post<any>(`/employees/${employeeId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Update employee status
  updateEmployeeStatus: (id: string, status: 'active' | 'inactive' | 'onboarding' | 'terminated') => {
    return apiService.patch<Employee>(`/employees/${id}/status`, { status });
  }
};
