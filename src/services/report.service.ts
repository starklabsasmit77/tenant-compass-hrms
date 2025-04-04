
import { apiService } from './api';

// Types
export interface ReportOptions {
  type: 'attendance' | 'leave' | 'payroll' | 'employee' | 'custom';
  startDate?: string;
  endDate?: string;
  department?: string;
  employeeId?: string;
  format?: 'pdf' | 'excel' | 'csv';
  customFields?: string[];
}

// Report service functions
export const reportService = {
  // Generate attendance report
  generateAttendanceReport: (options: Omit<ReportOptions, 'type'>) => {
    return apiService.post<Blob>('/reports/attendance', options, {
      responseType: 'blob' as any
    });
  },
  
  // Generate leave report
  generateLeaveReport: (options: Omit<ReportOptions, 'type'>) => {
    return apiService.post<Blob>('/reports/leaves', options, {
      responseType: 'blob' as any
    });
  },
  
  // Generate payroll report
  generatePayrollReport: (options: Omit<ReportOptions, 'type'>) => {
    return apiService.post<Blob>('/reports/payroll', options, {
      responseType: 'blob' as any
    });
  },
  
  // Generate employee report
  generateEmployeeReport: (options: Omit<ReportOptions, 'type'>) => {
    return apiService.post<Blob>('/reports/employees', options, {
      responseType: 'blob' as any
    });
  },
  
  // Generate custom report
  generateCustomReport: (options: ReportOptions) => {
    return apiService.post<Blob>('/reports/custom', options, {
      responseType: 'blob' as any
    });
  },
  
  // Get saved report templates
  getSavedReportTemplates: () => {
    return apiService.get<any[]>('/reports/templates');
  },
  
  // Save report template
  saveReportTemplate: (name: string, options: ReportOptions) => {
    return apiService.post<any>('/reports/templates', { name, options });
  },
  
  // Delete report template
  deleteReportTemplate: (id: string) => {
    return apiService.delete<{ success: boolean }>(`/reports/templates/${id}`);
  }
};
