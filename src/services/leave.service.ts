
import { apiService } from './api';
import { PaginatedResponse } from '@/types/interfaces';

// Types
export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName?: string;
  startDate: string;
  endDate: string;
  leaveType: 'annual' | 'sick' | 'personal' | 'unpaid' | 'maternity' | 'paternity' | 'bereavement' | 'other';
  totalDays: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reason: string;
  comments?: string;
  attachments?: string[];
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface LeaveBalance {
  annual: number;
  sick: number;
  personal: number;
  unpaid: number;
  maternity: number;
  paternity: number;
  bereavement: number;
}

export interface LeaveFilters {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  leaveType?: string;
  page?: number;
  limit?: number;
}

// Leave service functions
export const leaveService = {
  // Get leave requests with filters
  getLeaveRequests: (filters: LeaveFilters = {}) => {
    return apiService.get<PaginatedResponse<LeaveRequest>>('/leaves', { params: filters });
  },
  
  // Get current user's leave requests
  getMyLeaves: (filters: Omit<LeaveFilters, 'employeeId'> = {}) => {
    return apiService.get<PaginatedResponse<LeaveRequest>>('/leaves/me', { params: filters });
  },
  
  // Get leave request by ID
  getLeaveById: (id: string) => {
    return apiService.get<LeaveRequest>(`/leaves/${id}`);
  },
  
  // Create leave request
  createLeaveRequest: (data: Omit<LeaveRequest, 'id' | 'status' | 'employeeId' | 'employeeName' | 'approvedBy' | 'approvedAt' | 'createdAt'>) => {
    return apiService.post<LeaveRequest>('/leaves', data);
  },
  
  // Update leave request
  updateLeaveRequest: (id: string, data: Partial<LeaveRequest>) => {
    return apiService.put<LeaveRequest>(`/leaves/${id}`, data);
  },
  
  // Cancel leave request (by employee)
  cancelLeaveRequest: (id: string) => {
    return apiService.patch<LeaveRequest>(`/leaves/${id}/cancel`);
  },
  
  // Approve leave request (by manager/HR)
  approveLeaveRequest: (id: string, comments?: string) => {
    return apiService.patch<LeaveRequest>(`/leaves/${id}/approve`, { comments });
  },
  
  // Reject leave request (by manager/HR)
  rejectLeaveRequest: (id: string, comments?: string) => {
    return apiService.patch<LeaveRequest>(`/leaves/${id}/reject`, { comments });
  },
  
  // Get leave balances for an employee
  getLeaveBalances: (employeeId: string) => {
    return apiService.get<LeaveBalance>(`/leaves/balance/${employeeId}`);
  },
  
  // Get my leave balances
  getMyLeaveBalances: () => {
    return apiService.get<LeaveBalance>('/leaves/balance/me');
  },
  
  // Update leave balance (HR/admin only)
  updateLeaveBalance: (employeeId: string, data: Partial<LeaveBalance>) => {
    return apiService.put<LeaveBalance>(`/leaves/balance/${employeeId}`, data);
  }
};
