
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Settings, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Building,
  BriefcaseMedical,
  CreditCard,
  User,
  FileCheck,
  BarChart3,
  Building2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUser, UserRole } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: number;
}

// Navigation items based on user role
const getNavItems = (role: UserRole) => {
  // Common items for all roles
  const commonItems = [
    { icon: Home, text: "Dashboard", to: "/dashboard" },
    { icon: User, text: "Profile", to: "/profile" },
    { icon: Settings, text: "Settings", to: "/settings" },
  ];

  // Role-specific items
  const roleItems: Record<UserRole, Array<{ icon: React.ElementType; text: string; to: string; badge?: number }>> = {
    'employee': [
      { icon: Clock, text: "Leave Requests", to: "/employee/leaves" },
      { icon: Calendar, text: "My Attendance", to: "/employee/attendance" },
      { icon: CreditCard, text: "Payslips", to: "/employee/payslips" },
      { icon: FileCheck, text: "Documents", to: "/employee/documents" },
    ],
    'hr': [
      { icon: Users, text: "Employees", to: "/employees" },
      { icon: Calendar, text: "Attendance", to: "/attendance" },
      { icon: Clock, text: "Leaves", to: "/leaves", badge: 3 },
      { icon: BriefcaseMedical, text: "Benefits", to: "/benefits" },
      { icon: FileText, text: "Reports", to: "/reports" },
    ],
    'accounts': [
      { icon: CreditCard, text: "Payroll", to: "/payroll" },
      { icon: FileText, text: "Reports", to: "/reports" },
    ],
    'org-admin': [
      { icon: Users, text: "Employees", to: "/employees" },
      { icon: Calendar, text: "Attendance", to: "/attendance" },
      { icon: Clock, text: "Leaves", to: "/leaves" },
      { icon: CreditCard, text: "Payroll", to: "/payroll" },
      { icon: FileText, text: "Reports", to: "/reports" },
      { icon: BriefcaseMedical, text: "Benefits", to: "/benefits" },
      { icon: Building, text: "Organization", to: "/organization" },
    ],
    'super-admin': [
      { icon: Building2, text: "Tenants", to: "/tenants" },
      { icon: Users, text: "Employees", to: "/employees" },
      { icon: Calendar, text: "Attendance", to: "/attendance" },
      { icon: Clock, text: "Leaves", to: "/leaves" },
      { icon: CreditCard, text: "Payroll", to: "/payroll" },
      { icon: FileText, text: "Reports", to: "/reports" },
      { icon: Globe, text: "Organization", to: "/organization" },
      { icon: BarChart3, text: "Analytics", to: "/reports" },
    ],
  };

  return [...roleItems[role], ...commonItems];
};

const NavItem = ({ icon: Icon, text, to, isActive, isCollapsed, badge }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon size={20} />
      {!isCollapsed && (
        <span className="flex-1">{text}</span>
      )}
      {!isCollapsed && badge !== undefined && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();
  
  // Get navigation items based on user role
  const navItems = currentUser ? getNavItems(currentUser.role) : [];

  // For demo purposes - in a real app this would come from an authentication context
  const companyName = currentUser?.organizationId ? "TechCorp Inc." : "TenantHR Admin";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const roleLabel = () => {
    switch(currentUser?.role) {
      case 'employee': return 'Employee';
      case 'hr': return 'HR Manager';
      case 'accounts': return 'Accounts Manager';
      case 'org-admin': return 'Org Admin';
      case 'super-admin': return 'System Admin';
      default: return '';
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-14 items-center border-b border-sidebar-border px-3">
          {!isCollapsed && (
            <div className="flex flex-1 items-center justify-between">
              <span className="text-lg font-semibold text-sidebar-foreground">TenantHR</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Company info */}
        <div className={cn(
          "flex items-center gap-3 border-b border-sidebar-border p-3",
          isCollapsed ? "justify-center" : ""
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={companyName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {companyName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-sidebar-foreground/80">
                {currentUser?.role === 'super-admin' ? 'System' : 'Company'}
              </span>
              <span className="text-sm font-semibold text-sidebar-foreground">{companyName}</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-auto py-3 px-2">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                icon={item.icon} 
                text={item.text} 
                to={item.to} 
                isActive={location.pathname === item.to}
                isCollapsed={isCollapsed}
                badge={item.badge}
              />
            ))}
          </div>
        </nav>

        {/* User info */}
        <div className={cn(
          "flex items-center gap-3 border-t border-sidebar-border p-3",
          isCollapsed ? "justify-center" : ""
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={currentUser?.name || ""} />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                {currentUser?.name || "User"}
              </span>
              <span className="text-xs text-sidebar-foreground/70">{roleLabel()}</span>
            </div>
          )}
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
