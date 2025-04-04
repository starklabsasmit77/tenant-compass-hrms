
# HRMS API Services

This directory contains service modules for interacting with the backend API.

## Architecture Overview

The service layer is organized by domain and follows a consistent pattern:
- Each service module exports a set of functions for performing API operations related to that domain
- All services use the base `apiService` for HTTP requests with consistent error handling
- Types and interfaces are defined in each service module or imported from a common types file

## Available Services

1. **Auth Service**: Authentication and user management
2. **Employee Service**: Employee data management
3. **Attendance Service**: Time tracking and attendance management  
4. **Leave Service**: Leave requests and approvals
5. **Payroll Service**: Salary processing and payslips
6. **Organization Service**: Company settings and departments
7. **Report Service**: Report generation and export
8. **Tenant Service**: Multi-tenant management (Super Admin only)

## Backend API Requirements

### Node.js Backend Architecture

The backend should be built using:
- Node.js with Express.js framework
- MongoDB for data storage with Mongoose ORM
- JWT for authentication
- Microservices architecture (optional for scaling)

### Core Backend Components

1. **Authentication Service**
   - User registration and login
   - JWT token generation and verification
   - Password reset functionality
   - Multi-tenant support with organization isolation

2. **Employee Service**
   - Employee CRUD operations
   - Employee profile management
   - Document storage and retrieval
   - Department and role management

3. **Attendance Service**
   - Clock in/out tracking
   - Attendance records with geolocation
   - Attendance reports and summaries
   - Working hours calculation

4. **Leave Management Service**
   - Leave request submission
   - Approval workflows
   - Leave balance tracking
   - Leave type management

5. **Payroll Service**
   - Salary calculation
   - Tax and deduction processing
   - Payslip generation
   - Payment status tracking

6. **Organization Service**
   - Company profile management
   - Department management
   - Settings and configuration
   - Working schedule management

7. **Report Service**
   - Various report generation
   - Data export (PDF, Excel, CSV)
   - Custom report templates
   - Scheduled report generation

8. **Tenant Management Service**
   - Organization onboarding
   - Subscription and billing management
   - Plan features and limits
   - Cross-tenant administration

## API Endpoints

### Auth APIs
- POST /api/auth/login - User login
- POST /api/auth/register - Register new organization
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password/:token - Reset password
- POST /api/auth/change-password - Change password (authenticated)
- GET /api/auth/me - Get current user profile
- POST /api/auth/logout - Logout (optional)

### Employee APIs
- GET /api/employees - List employees with pagination and filters
- GET /api/employees/:id - Get employee details
- POST /api/employees - Create new employee
- PUT /api/employees/:id - Update employee
- DELETE /api/employees/:id - Delete employee
- POST /api/employees/bulk-import - Import employees from CSV/Excel
- GET /api/employees/:id/documents - Get employee documents
- POST /api/employees/:id/documents - Upload employee document
- PATCH /api/employees/:id/status - Update employee status

### Attendance APIs
- GET /api/attendance - Get attendance records with filters
- GET /api/attendance/me - Get current user attendance
- POST /api/attendance/clock-in - Clock in
- POST /api/attendance/clock-out - Clock out
- GET /api/attendance/:id - Get attendance record by ID
- PUT /api/attendance/:id - Update attendance record
- GET /api/attendance/summary/:employeeId - Get attendance summary
- GET /api/attendance/summary/me - Get own attendance summary
- POST /api/attendance/bulk-import - Import attendance data

### Leave APIs
- GET /api/leaves - Get leave requests with filters
- GET /api/leaves/me - Get current user leave requests
- GET /api/leaves/:id - Get leave request details
- POST /api/leaves - Create new leave request
- PUT /api/leaves/:id - Update leave request
- PATCH /api/leaves/:id/cancel - Cancel leave request
- PATCH /api/leaves/:id/approve - Approve leave request
- PATCH /api/leaves/:id/reject - Reject leave request
- GET /api/leaves/balance/:employeeId - Get leave balance
- GET /api/leaves/balance/me - Get own leave balance
- GET /api/leaves/check-availability - Check if dates are available

### Payroll APIs
- GET /api/payroll - Get payslips with filters
- GET /api/payroll/me - Get current user payslips
- GET /api/payroll/:id - Get payslip details
- GET /api/payroll/employee/:id - Get payslip by employee and month/year
- POST /api/payroll/generate - Generate payslips for a period
- PUT /api/payroll/:id - Update payslip
- PATCH /api/payroll/:id/pay - Mark payslip as paid
- GET /api/payroll/:id/download - Download payslip as PDF
- POST /api/payroll/bulk-generate - Bulk generate payslips

### Organization APIs
- GET /api/organization - Get organization details
- PUT /api/organization - Update organization
- GET /api/organization/settings - Get organization settings
- PUT /api/organization/settings - Update organization settings
- GET /api/organization/departments - Get departments
- POST /api/organization/departments - Create department
- PUT /api/organization/departments/:id - Update department
- DELETE /api/organization/departments/:id - Delete department

### Report APIs
- POST /api/reports/attendance - Generate attendance report
- POST /api/reports/leaves - Generate leave report
- POST /api/reports/payroll - Generate payroll report
- POST /api/reports/employees - Generate employee report
- POST /api/reports/custom - Generate custom report
- GET /api/reports/templates - Get saved report templates
- POST /api/reports/templates - Save report template
- DELETE /api/reports/templates/:id - Delete report template

### Tenant APIs (Super Admin)
- GET /api/tenants - List tenants with pagination and filters
- GET /api/tenants/:id - Get tenant details
- POST /api/tenants - Create new tenant
- PUT /api/tenants/:id - Update tenant
- PATCH /api/tenants/:id/status - Change tenant status
- GET /api/tenants/stats - Get tenant statistics
- GET /api/tenants/plans - Get subscription plans
- POST /api/tenants/plans - Create subscription plan
- PUT /api/tenants/plans/:id - Update subscription plan
- DELETE /api/tenants/plans/:id - Delete subscription plan
