
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
import { Search, Plus, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock employee data
const employees = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    department: "Engineering",
    position: "Senior Software Engineer",
    status: "Active",
    joiningDate: "Jan 15, 2022",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@techcorp.com",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    joiningDate: "Mar 5, 2022",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.wilson@techcorp.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joiningDate: "Nov 10, 2021",
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "james.rodriguez@techcorp.com",
    department: "Sales",
    position: "Sales Executive",
    status: "On Leave",
    joiningDate: "Jun 22, 2022",
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia.davis@techcorp.com",
    department: "HR",
    position: "HR Specialist",
    status: "Active",
    joiningDate: "Feb 8, 2021",
  },
  {
    id: "6",
    name: "Robert Kim",
    email: "robert.kim@techcorp.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "Active",
    joiningDate: "Sep 15, 2022",
  },
  {
    id: "7",
    name: "Jessica Martinez",
    email: "jessica.martinez@techcorp.com",
    department: "Engineering",
    position: "QA Engineer",
    status: "Active",
    joiningDate: "Apr 17, 2022",
  },
  {
    id: "8",
    name: "David Thompson",
    email: "david.thompson@techcorp.com",
    department: "Customer Support",
    position: "Support Manager",
    status: "Terminated",
    joiningDate: "Aug 30, 2021",
  }
];

const EmployeesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleNewEmployee = () => {
    toast({
      title: "New Employee",
      description: "Add employee functionality coming soon!"
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "" || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map(e => e.department))];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Employees</h1>
          <Button onClick={handleNewEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
        
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
                <SelectItem value="">All Departments</SelectItem>
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
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joining Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={employee.name} />
                          <AvatarFallback>
                            {employee.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{employee.name}</span>
                          <span className="text-xs text-muted-foreground">{employee.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          employee.status === "Active" ? "outline" : 
                          employee.status === "On Leave" ? "secondary" : "destructive"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.joiningDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No employees found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeesPage;
