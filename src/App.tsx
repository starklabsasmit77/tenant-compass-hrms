
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import LeavesPage from "./pages/LeavesPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import PayrollPage from "./pages/PayrollPage";
import ReportsPage from "./pages/ReportsPage";
import BenefitsPage from "./pages/BenefitsPage";
import OrganizationPage from "./pages/OrganizationPage";
import SettingsPage from "./pages/SettingsPage";
import TenantsPage from "./pages/TenantsPage";

// New pages we've created
import PlansPage from "./pages/PlansPage";
import BillingPage from "./pages/BillingPage";
import CompliancePage from "./pages/CompliancePage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import PoliciesPage from "./pages/PoliciesPage";
import JobOpeningsPage from "./pages/JobOpeningsPage";
import CandidatesPage from "./pages/CandidatesPage";
import InterviewsPage from "./pages/InterviewsPage";
import PerformancePage from "./pages/PerformancePage";
import AppraisalsPage from "./pages/AppraisalsPage";
import TrainingsPage from "./pages/TrainingsPage";
import CertificationsPage from "./pages/CertificationsPage";
import GoalsPage from "./pages/GoalsPage";
import WorkSchedulesPage from "./pages/WorkSchedulesPage";
import MessagesPage from "./pages/MessagesPage";
import ShiftsPage from "./pages/ShiftsPage";
import FAQPage from "./pages/FAQPage";
import SupportPage from "./pages/SupportPage";

// Employee pages
import EmployeeLeaveRequestPage from "./pages/employee/LeaveRequestPage";
import EmployeeAttendancePage from "./pages/employee/AttendancePage";
import EmployeePayslipsPage from "./pages/employee/PayslipsPage";
import EmployeeDocumentsPage from "./pages/employee/DocumentsPage";

// Protected route wrapper
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Main pages */}
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            
            {/* HR and Admin pages */}
            <Route path="/employees" element={<ProtectedRoute element={<EmployeesPage />} roles={['hr', 'org-admin', 'super-admin']} />} />
            <Route path="/attendance" element={<ProtectedRoute element={<AttendancePage />} roles={['hr', 'org-admin', 'super-admin']} />} />
            <Route path="/leaves" element={<ProtectedRoute element={<LeavesPage />} roles={['hr', 'org-admin', 'super-admin']} />} />
            <Route path="/payroll" element={<ProtectedRoute element={<PayrollPage />} roles={['accounts', 'org-admin', 'super-admin']} />} />
            <Route path="/reports" element={<ProtectedRoute element={<ReportsPage />} roles={['hr', 'accounts', 'org-admin', 'super-admin']} />} />
            <Route path="/benefits" element={<ProtectedRoute element={<BenefitsPage />} roles={['hr', 'org-admin', 'super-admin']} />} />
            <Route path="/organization" element={<ProtectedRoute element={<OrganizationPage />} roles={['org-admin', 'super-admin']} />} />
            <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
            
            {/* Super Admin pages */}
            <Route path="/tenants" element={<ProtectedRoute element={<TenantsPage />} roles={['super-admin']} />} />
            <Route path="/plans" element={<ProtectedRoute element={<PlansPage />} roles={['super-admin']} />} />
            <Route path="/billing" element={<ProtectedRoute element={<BillingPage />} />} />
            <Route path="/compliance" element={<ProtectedRoute element={<CompliancePage />} />} />
            
            {/* HR Team pages */}
            <Route path="/jobs" element={<ProtectedRoute element={<JobOpeningsPage />} roles={['hr', 'org-admin']} />} />
            <Route path="/candidates" element={<ProtectedRoute element={<CandidatesPage />} roles={['hr', 'org-admin']} />} />
            <Route path="/interviews" element={<ProtectedRoute element={<InterviewsPage />} roles={['hr', 'org-admin']} />} />
            <Route path="/performance" element={<ProtectedRoute element={<PerformancePage />} roles={['hr', 'org-admin', 'super-admin']} />} />
            <Route path="/appraisals" element={<ProtectedRoute element={<AppraisalsPage />} roles={['hr', 'org-admin']} />} />
            <Route path="/trainings" element={<ProtectedRoute element={<TrainingsPage />} roles={['hr', 'org-admin']} />} />
            <Route path="/certifications" element={<ProtectedRoute element={<CertificationsPage />} roles={['hr', 'org-admin']} />} />
            
            {/* Manager pages */}
            <Route path="/goals" element={<ProtectedRoute element={<GoalsPage />} />} />
            <Route path="/work-schedules" element={<ProtectedRoute element={<WorkSchedulesPage />} />} />
            <Route path="/messages" element={<ProtectedRoute element={<MessagesPage />} />} />
            
            {/* Common pages */}
            <Route path="/announcements" element={<ProtectedRoute element={<AnnouncementsPage />} />} />
            <Route path="/policies" element={<ProtectedRoute element={<PoliciesPage />} />} />
            
            {/* Employee self-service pages */}
            <Route path="/employee/leaves" element={<ProtectedRoute element={<EmployeeLeaveRequestPage />} />} />
            <Route path="/employee/attendance" element={<ProtectedRoute element={<EmployeeAttendancePage />} />} />
            <Route path="/employee/payslips" element={<ProtectedRoute element={<EmployeePayslipsPage />} />} />
            <Route path="/employee/documents" element={<ProtectedRoute element={<EmployeeDocumentsPage />} />} />
            <Route path="/shifts" element={<ProtectedRoute element={<ShiftsPage />} />} />
            <Route path="/faq" element={<ProtectedRoute element={<FAQPage />} />} />
            <Route path="/support" element={<ProtectedRoute element={<SupportPage />} />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
