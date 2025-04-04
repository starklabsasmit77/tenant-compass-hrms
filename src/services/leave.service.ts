
import { apiService } from './api';

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
  status?: string;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// Leave service functions
export const leaveService = {
  // Get leave requests with filters
  getLeaveRequests: (filters: LeaveFilters = {}) => {
    return apiService.get<PaginatedResponse<LeaveRequest>>('/leaves', { params: filters });
  },
  
  // Get my leave requests
  getMyLeaveRequests: (filters: Omit<LeaveFilters, 'employeeId'> = {}) => {
    return apiService.get<PaginatedResponse<LeaveRequest>>('/leaves/me', { params: filters });
  },
  
  // Get leave request by ID
  getLeaveRequestById: (id: string) => {
    return apiService.get<LeaveRequest>(`/leaves/${id}`);
  },
  
  // Create new leave request
  createLeaveRequest: (leaveRequest: Omit<LeaveRequest, 'id' | 'employeeId' | 'status' | 'createdAt'>) => {
    return apiService.post<LeaveRequest>('/leaves', leaveRequest);
  },
  
  // Update leave request
  updateLeaveRequest: (id: string, leaveRequest: Partial<LeaveRequest>) => {
    return apiService.put<LeaveRequest>(`/leaves/${id}`, leaveRequest);
  },
  
  // Cancel leave request
  cancelLeaveRequest: (id: string) => {
    return apiService.patch<LeaveRequest>(`/leaves/${id}/cancel`, {});
  },
  
  // Approve leave request
  approveLeaveRequest: (id: string, comments?: string) => {
    return apiService.patch<LeaveRequest>(`/leaves/${id}/approve`, { comments });
  },
  
  // Reject leave request
  rejectLeaveRequest: (id: string, comments: string) => {
    return apiService.patch<LeaveRequest>(`/leaves/${id}/reject`, { comments });
  },
  
  // Get leave balance
  getLeaveBalance: (employeeId: string) => {
    return apiService.get<LeaveBalance>(`/leaves/balance/${employeeId}`);
  },
  
  // Get my leave balance
  getMyLeaveBalance: () => {
    return apiService.get<LeaveBalance>('/leaves/balance/me');
  },
  
  // Check if dates are available for leave
  checkLeaveAvailability: (startDate: string, endDate: string) => {
    return apiService.get<{ available: boolean; conflictingDays?: string[] }>('/leaves/check-availability', {
      params: { startDate, endDate }
    });
  }
};
