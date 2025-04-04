
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter, Calendar, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock payroll data
const payrollData = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    department: "Engineering",
    payPeriod: "Apr 2025",
    basicSalary: 5000,
    allowances: 800,
    deductions: 600,
    netPay: 5200,
    status: "Paid",
    paymentDate: "Apr 5, 2025",
    bankAccount: "XXXX-XXXX-1234"
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Michael Chen",
    department: "Engineering",
    payPeriod: "Apr 2025",
    basicSalary: 4500,
    allowances: 750,
    deductions: 550,
    netPay: 4700,
    status: "Paid",
    paymentDate: "Apr 5, 2025",
    bankAccount: "XXXX-XXXX-5678"
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emma Wilson",
    department: "Marketing",
    payPeriod: "Apr 2025",
    basicSalary: 4200,
    allowances: 600,
    deductions: 500,
    netPay: 4300,
    status: "Processing",
    paymentDate: "Pending",
    bankAccount: "XXXX-XXXX-9012"
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "James Rodriguez",
    department: "Sales",
    payPeriod: "Apr 2025",
    basicSalary: 4800,
    allowances: 900,
    deductions: 700,
    netPay: 5000,
    status: "Failed",
    paymentDate: "Error",
    bankAccount: "XXXX-XXXX-3456"
  }
];

// Stats data
const payrollStats = [
  { title: "Total Payroll", value: "$19,200", change: "+5.2%", changeDirection: "up" },
  { title: "Employees Paid", value: "2/4", change: "50%", changeDirection: "none" },
  { title: "Avg. Salary", value: "$4,800", change: "+2.1%", changeDirection: "up" },
  { title: "Total Deductions", value: "$2,350", change: "-1.5%", changeDirection: "down" }
];

const PayrollPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [payPeriod, setPayPeriod] = useState("Apr 2025");
  const [activeTab, setActiveTab] = useState("payroll");

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Processing",
      description: "Payroll has been scheduled for processing."
    });
  };

  const handleDownloadPayslip = (id: string) => {
    toast({
      title: "Payslip Downloaded",
      description: `Payslip for ID ${id} has been downloaded.`
    });
  };

  const filteredPayroll = payrollData.filter(item => {
    const matchesSearch = item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || item.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(payrollData.map(item => item.department))];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Payroll Management</h1>
          <div className="flex gap-3">
            <Select value={payPeriod} onValueChange={setPayPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apr 2025">April 2025</SelectItem>
                <SelectItem value="Mar 2025">March 2025</SelectItem>
                <SelectItem value="Feb 2025">February 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRunPayroll}>
              <Plus className="mr-2 h-4 w-4" />
              Run Payroll
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {payrollStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                  <span className="text-2xl font-bold mt-1">{stat.value}</span>
                  <span className={`text-xs mt-1 ${
                    stat.changeDirection === 'up' ? 'text-green-600' : 
                    stat.changeDirection === 'down' ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {stat.change} {stat.changeDirection === 'up' ? '↑' : stat.changeDirection === 'down' ? '↓' : ''}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="payroll">Payroll List</TabsTrigger>
            <TabsTrigger value="salary">Salary Structure</TabsTrigger>
            <TabsTrigger value="settings">Payroll Settings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payroll" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Gross Pay</TableHead>
                    <TableHead className="text-right">Deductions</TableHead>
                    <TableHead className="text-right">Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayroll.length > 0 ? (
                    filteredPayroll.map((item) => (
                      <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="font-medium">{item.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{item.employeeId}</div>
                        </TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell className="text-right">${(item.basicSalary + item.allowances).toLocaleString()}</TableCell>
                        <TableCell className="text-right">${item.deductions.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">${item.netPay.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              item.status === "Paid" ? "outline" : 
                              item.status === "Processing" ? "secondary" : "destructive"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDownloadPayslip(item.id)}
                            disabled={item.status !== "Paid"}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No payroll records found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="salary" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Salary Structure</CardTitle>
                <CardDescription>Manage salary components and structures</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Salary structure components will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
                <CardDescription>Configure payroll processing settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Payroll configuration options will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Reports</CardTitle>
                <CardDescription>Generate and view payroll reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Payroll reporting options will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PayrollPage;
