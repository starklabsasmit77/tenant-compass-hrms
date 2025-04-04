
# HRMS API Architecture Specification

## 1. Technology Stack

- **Framework**: Node.js with Express
- **Database**: MongoDB with Mongoose for multi-tenant data
- **Authentication**: JWT with refresh token pattern
- **APIs**: RESTful API endpoints
- **Validation**: Joi for request validation
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Deployment**: Docker, Kubernetes or AWS ECS

## 2. System Architecture

### 2.1 High-Level Architecture

```
                 ┌───────────────┐
                 │   Frontend    │
                 │   (React)     │
                 └───────┬───────┘
                         │
                         ▼
┌───────────────────────────────────────────┐
│                 API Gateway                │
└────┬──────────────┬───────────────┬───────┘
     │              │               │
     ▼              ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────────┐
│  Auth   │   │  Core   │   │  Reporting  │
│ Service │   │ Service │   │  Service    │
└─────────┘   └─────────┘   └─────────────┘
     │              │               │
     └──────────────┼───────────────┘
                    │
                    ▼
             ┌─────────────┐
             │  MongoDB    │
             │ (Multi-tenant) │
             └─────────────┘
```

### 2.2 Services

1. **Auth Service**: Handle authentication, registration, authorization
2. **Core Service**: Handle HR functions (employees, attendance, leaves)
3. **Reporting Service**: Handle report generation and scheduling

## 3. Database Design

### 3.1 Multi-Tenant Architecture

- Each tenant has separate database or collection prefix
- Global superadmin database for SaaS management

### 3.2 Core Collections

1. **Tenants**: Store tenant organization information
2. **Users**: Store user accounts for all roles
3. **Employees**: Store employee details
4. **Departments**: Store department structure
5. **Attendance**: Store attendance records
6. **Leaves**: Store leave requests and balances
7. **Payroll**: Store payroll information
8. **Documents**: Store document metadata (S3 links)
9. **Jobs**: Store job opening details
10. **Candidates**: Store candidate information
11. **Interviews**: Store interview schedules and feedback
12. **Performance**: Store performance reviews
13. **Training**: Store training programs
14. **Announcements**: Store company announcements

## 4. API Endpoints

### 4.1 Auth API

- POST `/api/auth/register` - Register new tenant
- POST `/api/auth/login` - User login
- POST `/api/auth/refresh` - Refresh access token
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password/:token` - Reset password
- POST `/api/auth/change-password` - Change password (authenticated)
- GET `/api/auth/me` - Get current user profile

### 4.2 Tenant API (Super Admin)

- GET `/api/tenants` - List all tenants (paginated)
- GET `/api/tenants/:id` - Get tenant details
- POST `/api/tenants` - Create new tenant
- PUT `/api/tenants/:id` - Update tenant
- PATCH `/api/tenants/:id/status` - Update tenant status
- GET `/api/tenants/stats` - Get tenant statistics
- GET `/api/tenants/plans` - List all subscription plans
- POST `/api/tenants/plans` - Create subscription plan
- PUT `/api/tenants/plans/:id` - Update subscription plan
- DELETE `/api/tenants/plans/:id` - Delete subscription plan

### 4.3 Employee API

- GET `/api/employees` - List employees (paginated, filtered)
- GET `/api/employees/:id` - Get employee details
- POST `/api/employees` - Create new employee
- PUT `/api/employees/:id` - Update employee
- PATCH `/api/employees/:id/status` - Update employee status
- GET `/api/employees/:id/documents` - List employee documents
- POST `/api/employees/:id/documents` - Upload employee document
- DELETE `/api/employees/:id/documents/:documentId` - Delete document
- GET `/api/employees/me/documents` - Get my documents
- GET `/api/employees/manager/:id/team` - Get team members
- GET `/api/employees/me/team` - Get my team members

### 4.4 Attendance API

- GET `/api/attendance` - List attendance records
- GET `/api/attendance/me` - Get my attendance
- POST `/api/attendance/clock-in` - Clock in
- POST `/api/attendance/clock-out` - Clock out
- GET `/api/attendance/:id` - Get attendance details
- PUT `/api/attendance/:id` - Update attendance
- GET `/api/attendance/summary/:id` - Get attendance summary
- GET `/api/attendance/summary/me` - Get my attendance summary
- POST `/api/attendance/bulk-import` - Import attendance

### 4.5 Leave API

- GET `/api/leaves` - List leave requests
- GET `/api/leaves/me` - Get my leave requests
- GET `/api/leaves/:id` - Get leave request details
- POST `/api/leaves` - Create leave request
- PUT `/api/leaves/:id` - Update leave request
- PATCH `/api/leaves/:id/cancel` - Cancel leave request
- PATCH `/api/leaves/:id/approve` - Approve leave request
- PATCH `/api/leaves/:id/reject` - Reject leave request
- GET `/api/leaves/balance/:id` - Get leave balance
- GET `/api/leaves/balance/me` - Get my leave balance
- PUT `/api/leaves/balance/:id` - Update leave balance

### 4.6 Payroll API

- GET `/api/payroll` - List payslips
- GET `/api/payroll/me` - Get my payslips
- GET `/api/payroll/:id` - Get payslip details
- GET `/api/payroll/employee/:id` - Get employee payslip
- POST `/api/payroll/generate` - Generate payslips
- PUT `/api/payroll/:id` - Update payslip
- PATCH `/api/payroll/:id/pay` - Mark payslip as paid
- GET `/api/payroll/:id/download` - Download payslip
- POST `/api/payroll/bulk-generate` - Bulk generate payslips

### 4.7 Report API

- POST `/api/reports/attendance` - Generate attendance report
- POST `/api/reports/leaves` - Generate leave report
- POST `/api/reports/payroll` - Generate payroll report
- POST `/api/reports/employees` - Generate employee report
- POST `/api/reports/custom` - Generate custom report
- GET `/api/reports/templates` - Get report templates
- POST `/api/reports/templates` - Save report template
- DELETE `/api/reports/templates/:id` - Delete report template

### 4.8 Announcement API

- GET `/api/announcements` - List announcements
- GET `/api/announcements/:id` - Get announcement details
- POST `/api/announcements` - Create announcement
- PUT `/api/announcements/:id` - Update announcement
- DELETE `/api/announcements/:id` - Delete announcement

### 4.9 Policy API

- GET `/api/policies` - List policies
- GET `/api/policies/:id` - Get policy details
- POST `/api/policies` - Create policy
- PUT `/api/policies/:id` - Update policy
- DELETE `/api/policies/:id` - Delete policy
- GET `/api/policies/:id/download` - Download policy

### 4.10 Job API

- GET `/api/jobs` - List job openings
- GET `/api/jobs/:id` - Get job details
- POST `/api/jobs` - Create job opening
- PUT `/api/jobs/:id` - Update job opening
- DELETE `/api/jobs/:id` - Delete job opening
- PATCH `/api/jobs/:id/status` - Update job status

### 4.11 Candidate API

- GET `/api/candidates` - List candidates
- GET `/api/candidates/:id` - Get candidate details
- POST `/api/candidates` - Create candidate
- PUT `/api/candidates/:id` - Update candidate
- PATCH `/api/candidates/:id/status` - Update candidate status
- GET `/api/candidates/:id/documents` - Get candidate documents
- POST `/api/candidates/:id/documents` - Upload candidate document

### 4.12 Interview API

- GET `/api/interviews` - List interviews
- GET `/api/interviews/:id` - Get interview details
- POST `/api/interviews` - Schedule interview
- PUT `/api/interviews/:id` - Update interview
- DELETE `/api/interviews/:id` - Delete interview
- POST `/api/interviews/:id/feedback` - Submit interview feedback

### 4.13 Performance API

- GET `/api/performance/reviews` - List performance reviews
- GET `/api/performance/reviews/:id` - Get review details
- POST `/api/performance/reviews` - Create review
- PUT `/api/performance/reviews/:id` - Update review
- POST `/api/performance/reviews/:id/submit` - Submit review
- GET `/api/performance/cycles` - List performance cycles
- POST `/api/performance/cycles` - Create cycle
- PUT `/api/performance/cycles/:id` - Update cycle

### 4.14 Training API

- GET `/api/training` - List training programs
- GET `/api/training/:id` - Get training details
- POST `/api/training` - Create training program
- PUT `/api/training/:id` - Update training program
- DELETE `/api/training/:id` - Delete training program
- GET `/api/training/employee/:id` - Get employee trainings
- POST `/api/training/:id/enroll` - Enroll in training
- POST `/api/training/:id/complete` - Mark training completed

### 4.15 Goal API

- GET `/api/goals` - List goals
- GET `/api/goals/:id` - Get goal details
- POST `/api/goals` - Create goal
- PUT `/api/goals/:id` - Update goal
- DELETE `/api/goals/:id` - Delete goal
- GET `/api/goals/team/:id` - Get team goals
- PATCH `/api/goals/:id/status` - Update goal status

## 5. Middleware

1. **Authentication Middleware**: Validate JWT token
2. **Tenant Context Middleware**: Set current tenant context
3. **Role-Based Access Control**: Check user permissions
4. **Request Validation**: Validate request parameters and body
5. **Error Handling**: Standardized error responses
6. **Audit Logging**: Log sensitive operations

## 6. Security Considerations

1. **Input validation** on all endpoints
2. **Rate limiting** to prevent abuse
3. **CORS configuration** for secure frontend access
4. **Password hashing** using bcrypt
5. **JWT with short expiry** and refresh token rotation
6. **Tenant isolation** to prevent data leakage
7. **Audit logs** for sensitive operations
8. **Encrypted storage** for sensitive data
9. **Security headers** (Helmet middleware)
10. **Data sanitization** to prevent NoSQL injection

## 7. Implementation Approach

1. Set up project structure with Express and MongoDB
2. Implement multi-tenant architecture
3. Create authentication and user management
4. Implement core HR modules (employees, attendance, leaves)
5. Add payroll and benefits functionality
6. Develop reporting and analytics
7. Integrate with external services (email, storage)
8. Implement search functionality
9. Add WebSocket for real-time notifications
10. Write documentation and tests

## 8. Deployment Strategy

1. Use Docker containers for services
2. Implement CI/CD pipeline
3. Set up staging and production environments
4. Configure auto-scaling for API services
5. Set up database backups
6. Implement monitoring and alerting
7. Configure CDN for static assets

This specification provides a comprehensive blueprint for implementing the backend API services required for the multi-tenant SaaS-based HRMS platform.
