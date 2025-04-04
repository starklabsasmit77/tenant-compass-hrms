
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Clock,
  Calendar,
  AlertCircle,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for dashboard stats
const stats = [
  {
    title: "Total Employees",
    value: "142",
    change: "+4.3%",
    increasing: true,
    icon: Users,
    description: "vs. last month",
  },
  {
    title: "Present Today",
    value: "124",
    change: "87%",
    increasing: true,
    icon: Clock,
    description: "attendance rate",
  },
  {
    title: "On Leave",
    value: "18",
    change: "12.7%",
    increasing: false,
    icon: Calendar,
    description: "of workforce",
  },
  {
    title: "Pending Approvals",
    value: "7",
    change: "-2",
    increasing: false,
    icon: AlertCircle,
    description: "vs. yesterday",
  },
];

// Mock data for department distribution
const departments = [
  { name: "Engineering", count: 48, percentage: 33.8 },
  { name: "Sales", count: 32, percentage: 22.5 },
  { name: "Marketing", count: 24, percentage: 16.9 },
  { name: "Customer Support", count: 18, percentage: 12.7 },
  { name: "Finance", count: 12, percentage: 8.5 },
  { name: "HR", count: 8, percentage: 5.6 },
];

// Mock data for recent activities
const activities = [
  {
    id: 1,
    type: "leave",
    user: "Sarah Chen",
    action: "requested sick leave",
    time: "15 minutes ago",
  },
  {
    id: 2,
    type: "onboarding",
    user: "Michael Johnson",
    action: "completed onboarding",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "attendance",
    user: "Emma Wilson",
    action: "clocked in late",
    time: "2 hours ago",
  },
  {
    id: 4,
    type: "approval",
    user: "Robert Garcia",
    action: "approved time off request",
    time: "3 hours ago",
  },
  {
    id: 5,
    type: "payroll",
    user: "Lisa Kumar",
    action: "generated payroll report",
    time: "5 hours ago",
  },
];

const Dashboard = () => {
  // Helper function to format dates
  const getCurrentMonthYear = () => {
    const date = new Date();
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          {getCurrentMonthYear()} Overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center gap-1">
                <span className={stat.increasing ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {dept.count} ({dept.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={dept.percentage} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === "leave" && <Calendar className="h-4 w-4 text-primary" />}
                    {activity.type === "onboarding" && <Users className="h-4 w-4 text-primary" />}
                    {activity.type === "attendance" && <Clock className="h-4 w-4 text-primary" />}
                    {activity.type === "approval" && <AlertCircle className="h-4 w-4 text-primary" />}
                    {activity.type === "payroll" && <TrendingUp className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Add Employee", icon: Users, color: "bg-blue-500" },
          { title: "Process Payroll", icon: Activity, color: "bg-green-500" },
          { title: "Approve Leaves", icon: Calendar, color: "bg-amber-500" },
          { title: "View Reports", icon: TrendingUp, color: "bg-purple-500" },
        ].map((action) => (
          <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-row items-center gap-4">
              <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium">{action.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
