
// Common application interfaces
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

// Auth Interfaces
export interface LoginCredentials {
  email: string;
  password: string;
  organizationId?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  planId?: string;
}

// Employee Interfaces
export interface EmployeeBase {
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
  address?: string;
  emergencyContact?: string;
}

export interface Employee extends EmployeeBase {
  id: string;
  avatar?: string;
  salary?: number;
  createdAt: string;
  updatedAt: string;
}

// Attendance Interfaces
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
  createdAt: string;
  updatedAt: string;
}

// Leave Interfaces
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

// Payroll Interfaces
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
  createdAt: string;
  updatedAt: string;
}

// Organization Interfaces
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
  settings?: OrganizationSettings;
  createdAt: string;
  updatedAt: string;
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

// Tenant Interfaces
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
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}
