
import { apiService } from './api';

// Types
export interface Payslip {
  id: string;
  employeeId: string;
  employeeName?: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: {
    type: string;
    amount: number;
  }[];
  deductions: {
    type: string;
    amount: number;
  }[];
  grossSalary: number;
  netSalary: number;
  taxAmount: number;
  paymentDate: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  bankAccount?: string;
  bankName?: string;
  transactionId?: string;
  notes?: string;
}

export interface PayrollFilters {
  employeeId?: string;
  department?: string;
  month?: number;
  year?: number;
  status?: string;
  page?: number;
  limit?: number;
}

// Payroll service functions
export const payrollService = {
  // Get payslips with filters
  getPayslips: (filters: PayrollFilters = {}) => {
    return apiService.get<PaginatedResponse<Payslip>>('/payroll', { params: filters });
  },
  
  // Get my payslips
  getMyPayslips: (filters: Omit<PayrollFilters, 'employeeId' | 'department'> = {}) => {
    return apiService.get<PaginatedResponse<Payslip>>('/payroll/me', { params: filters });
  },
  
  // Get payslip by ID
  getPayslipById: (id: string) => {
    return apiService.get<Payslip>(`/payroll/${id}`);
  },
  
  // Get payslip by employee and month/year
  getPayslipByMonthYear: (employeeId: string, month: number, year: number) => {
    return apiService.get<Payslip>(`/payroll/employee/${employeeId}`, {
      params: { month, year }
    });
  },
  
  // Generate payslips for a month/year
  generatePayslips: (month: number, year: number, departmentId?: string) => {
    return apiService.post<{ generated: number }>('/payroll/generate', { month, year, departmentId });
  },
  
  // Update payslip
  updatePayslip: (id: string, data: Partial<Payslip>) => {
    return apiService.put<Payslip>(`/payroll/${id}`, data);
  },
  
  // Mark payslip as paid
  markAsPaid: (id: string, transactionId?: string) => {
    return apiService.patch<Payslip>(`/payroll/${id}/pay`, { transactionId });
  },
  
  // Download payslip as PDF
  downloadPayslip: (id: string) => {
    return apiService.get<Blob>(`/payroll/${id}/download`, {
      responseType: 'blob' as any
    });
  },
  
  // Bulk generate and send payslips
  bulkGenerateAndSendPayslips: (month: number, year: number, sendEmail: boolean = false) => {
    return apiService.post<{ generated: number; sent: number }>('/payroll/bulk-generate', {
      month, year, sendEmail
    });
  }
};
