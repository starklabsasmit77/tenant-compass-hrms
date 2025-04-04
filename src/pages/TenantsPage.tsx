
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
import { Search, Plus, Filter, MoreVertical, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock tenants data
const tenants = [
  {
    id: "1",
    name: "TechCorp Inc.",
    domain: "techcorp.com",
    industry: "Technology",
    plan: "Enterprise",
    employees: 250,
    maxEmployees: 300,
    status: "Active",
    createdAt: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Acme Marketing",
    domain: "acmemarketing.com",
    industry: "Marketing",
    plan: "Professional",
    employees: 85,
    maxEmployees: 100,
    status: "Active",
    createdAt: "Mar 22, 2023",
  },
  {
    id: "3",
    name: "Global Logistics",
    domain: "globallogistics.com",
    industry: "Transportation",
    plan: "Enterprise",
    employees: 420,
    maxEmployees: 500,
    status: "Active",
    createdAt: "Feb 8, 2023",
  },
  {
    id: "4",
    name: "Healthcare Solutions",
    domain: "healthcaresolutions.com",
    industry: "Healthcare",
    plan: "Standard",
    employees: 45,
    maxEmployees: 50,
    status: "Pending",
    createdAt: "Apr 5, 2023",
  },
  {
    id: "5",
    name: "City Restaurants",
    domain: "cityrestaurants.com",
    industry: "Food & Beverage",
    plan: "Standard",
    employees: 38,
    maxEmployees: 50,
    status: "Suspended",
    createdAt: "Nov 15, 2022",
  },
  {
    id: "6",
    name: "Education First",
    domain: "educationfirst.org",
    industry: "Education",
    plan: "Professional",
    employees: 110,
    maxEmployees: 150,
    status: "Active",
    createdAt: "Jul 30, 2023",
  }
];

// Stats data
const tenantStats = [
  { title: "Total Organizations", value: "6", change: "+2", changeDirection: "up" },
  { title: "Active Organizations", value: "4", change: "67%", changeDirection: "none" },
  { title: "Total Employees", value: "948", change: "+45", changeDirection: "up" },
  { title: "Avg. Utilization", value: "78%", change: "+5%", changeDirection: "up" }
];

const TenantsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleNewTenant = () => {
    toast({
      title: "New Organization",
      description: "Add organization functionality coming soon!"
    });
  };

  const handleViewTenant = (id: string) => {
    toast({
      title: "View Organization",
      description: `Viewing organization ${id} details.`
    });
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tenant.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [...new Set(tenants.map(tenant => tenant.status))];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Organizations</h1>
          <Button onClick={handleNewTenant}>
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tenantStats.map((stat, index) => (
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
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Employee Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewTenant(tenant.id)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Building size={16} />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{tenant.name}</span>
                          <span className="text-xs text-muted-foreground">{tenant.domain}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{tenant.industry}</TableCell>
                    <TableCell>{tenant.plan}</TableCell>
                    <TableCell className="w-36">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          {tenant.employees} of {tenant.maxEmployees} employees
                        </div>
                        <Progress value={(tenant.employees / tenant.maxEmployees) * 100} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          tenant.status === "Active" ? "outline" : 
                          tenant.status === "Pending" ? "secondary" : "destructive"
                        }
                      >
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Organization</DropdownMenuItem>
                          <DropdownMenuItem>Manage Users</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className={tenant.status === "Suspended" ? "text-primary" : "text-destructive"}>
                            {tenant.status === "Suspended" ? "Activate" : "Suspend"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No organizations found matching your search criteria
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

export default TenantsPage;
