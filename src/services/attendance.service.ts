
import { apiService } from './api';

// Types
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'half-day' | 'leave' | 'weekend' | 'holiday';
  workHours: number;
  overtimeHours: number;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  ipAddress?: string;
  device?: string;
  notes?: string;
}

export interface AttendanceFilters {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  leave: number;
  halfDay: number;
  totalWorkHours: number;
  totalOvertime: number;
}

// Attendance service functions
export const attendanceService = {
  // Get attendance records with filters
  getAttendanceRecords: (filters: AttendanceFilters = {}) => {
    return apiService.get<PaginatedResponse<AttendanceRecord>>('/attendance', { params: filters });
  },
  
  // Get current user's attendance records
  getMyAttendance: (filters: Omit<AttendanceFilters, 'employeeId'> = {}) => {
    return apiService.get<PaginatedResponse<AttendanceRecord>>('/attendance/me', { params: filters });
  },
  
  // Clock in
  clockIn: (data: { location?: { latitude: number; longitude: number } }) => {
    return apiService.post<AttendanceRecord>('/attendance/clock-in', data);
  },
  
  // Clock out
  clockOut: (data: { location?: { latitude: number; longitude: number } }) => {
    return apiService.post<AttendanceRecord>('/attendance/clock-out', data);
  },
  
  // Get attendance by ID
  getAttendanceById: (id: string) => {
    return apiService.get<AttendanceRecord>(`/attendance/${id}`);
  },
  
  // Update attendance record (admin/HR)
  updateAttendance: (id: string, data: Partial<AttendanceRecord>) => {
    return apiService.put<AttendanceRecord>(`/attendance/${id}`, data);
  },
  
  // Get attendance summary
  getAttendanceSummary: (employeeId: string, month: number, year: number) => {
    return apiService.get<AttendanceSummary>(`/attendance/summary/${employeeId}`, {
      params: { month, year }
    });
  },
  
  // Get my attendance summary
  getMyAttendanceSummary: (month: number, year: number) => {
    return apiService.get<AttendanceSummary>('/attendance/summary/me', {
      params: { month, year }
    });
  },
  
  // Bulk import attendance
  bulkImportAttendance: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiService.post<{ success: boolean; imported: number; failed: number }>('/attendance/bulk-import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};
