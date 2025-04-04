
import React, { useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parseISO, addMonths } from "date-fns";
import { Download, FileText, Filter, CreditCard, DollarSign } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

// Mock invoices for super admin view
const mockInvoices = [
  {
    id: "INV-001",
    tenantId: "1",
    tenantName: "TechCorp Inc",
    planName: "Enterprise",
    amount: 399.99,
    status: "paid",
    dueDate: "2023-03-15",
    paidDate: "2023-03-10",
    periodStart: "2023-03-01",
    periodEnd: "2023-03-31"
  },
  {
    id: "INV-002",
    tenantId: "2",
    tenantName: "Acme Marketing",
    planName: "Professional",
    amount: 199.99,
    status: "paid",
    dueDate: "2023-03-15",
    paidDate: "2023-03-14",
    periodStart: "2023-03-01",
    periodEnd: "2023-03-31"
  },
  {
    id: "INV-003",
    tenantId: "3",
    tenantName: "Global Logistics",
    planName: "Enterprise",
    amount: 399.99,
    status: "overdue",
    dueDate: "2023-03-15",
    paidDate: null,
    periodStart: "2023-03-01",
    periodEnd: "2023-03-31"
  },
  {
    id: "INV-004",
    tenantId: "4",
    tenantName: "Healthcare Solutions",
    planName: "Standard",
    amount: 99.99,
    status: "pending",
    dueDate: "2023-04-15",
    paidDate: null,
    periodStart: "2023-04-01",
    periodEnd: "2023-04-30"
  }
];

// Mock tenant subscription data
const mockSubscription = {
  planName: "Professional",
  status: "active",
  amount: 19.99,
  billingCycle: "monthly",
  nextBillingDate: addMonths(new Date(), 1).toISOString(),
  cardLast4: "4242",
  cardBrand: "visa"
};

// Mock tenant invoices
const mockTenantInvoices = [
  {
    id: "INV-T001",
    amount: 19.99,
    status: "paid",
    dueDate: "2023-03-15",
    paidDate: "2023-03-10",
    periodStart: "2023-03-01",
    periodEnd: "2023-03-31"
  },
  {
    id: "INV-T002",
    amount: 19.99,
    status: "paid",
    dueDate: "2023-02-15",
    paidDate: "2023-02-12",
    periodStart: "2023-02-01",
    periodEnd: "2023-02-28"
  },
  {
    id: "INV-T003",
    amount: 19.99,
    status: "paid",
    dueDate: "2023-01-15",
    paidDate: "2023-01-14",
    periodStart: "2023-01-01",
    periodEnd: "2023-01-31"
  }
];

// Billing stats
const billingStats = [
  {
    title: "Monthly Recurring Revenue",
    value: "$1,099.96",
    change: "+$199.99",
    changeDirection: "up"
  },
  {
    title: "Active Subscriptions",
    value: "3",
    change: "75%",
    changeDirection: "none"
  },
  {
    title: "Overdue Invoices",
    value: "1",
    change: "-2",
    changeDirection: "down"
  },
  {
    title: "Revenue This Month",
    value: "$999.97",
    change: "+12%",
    changeDirection: "up"
  }
];

const BillingPage = () => {
  const { currentUser } = useUser();
  const isSuperAdmin = currentUser?.role === 'super-admin';

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    const matchesSearch = !searchQuery || 
      invoice.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Invoice ${invoiceId} downloaded`);
  };

  const handleUpdatePaymentMethod = () => {
    toast.success("Payment method updated successfully");
  };

  // Render different views based on user role
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">{isSuperAdmin ? "Billing Management" : "Billing & Subscription"}</h1>
          {isSuperAdmin && (
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export All Invoices
            </Button>
          )}
        </div>
        
        {isSuperAdmin ? (
          // Super admin view
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {billingStats.map((stat, index) => (
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
                <Input
                  placeholder="Search tenants or invoice numbers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
      
            <Card>
              <CardHeader>
                <CardTitle>Tenant Invoices</CardTitle>
                <CardDescription>
                  Manage billing and subscription invoices for all tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.tenantName}</TableCell>
                        <TableCell>{invoice.planName}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {format(parseISO(invoice.periodStart), "MMM d")} - {format(parseISO(invoice.periodEnd), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>{format(parseISO(invoice.dueDate), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              invoice.status === "paid" ? "outline" : 
                              invoice.status === "pending" ? "secondary" : 
                              "destructive"
                            }
                          >
                            {invoice.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInvoices.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No invoices found matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        ) : (
          // Tenant admin view
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Plan</div>
                        <div className="font-medium text-lg">{mockSubscription.planName}</div>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <div className="text-sm text-muted-foreground">Status</div>
                        <Badge variant="outline" className="mt-1">
                          {mockSubscription.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <div className="text-sm text-muted-foreground">Next Billing Date</div>
                        <div>{format(parseISO(mockSubscription.nextBillingDate), "MMMM d, yyyy")}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="font-medium text-lg">${mockSubscription.amount} / {mockSubscription.billingCycle}</div>
                      </div>
                      
                      <div className="mt-4 space-y-1">
                        <div className="text-sm text-muted-foreground">Payment Method</div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>•••• {mockSubscription.cardLast4} ({mockSubscription.cardBrand.toUpperCase()})</span>
                        </div>
                      </div>
                      
                      <Button onClick={handleUpdatePaymentMethod} className="mt-6">
                        Update Payment Method
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Plans
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Latest Invoice
                    </Button>
                    <Button className="w-full" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Billing History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTenantInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {format(parseISO(invoice.periodStart), "MMM d")} - {format(parseISO(invoice.periodEnd), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              invoice.status === "paid" ? "outline" : 
                              invoice.status === "pending" ? "secondary" : 
                              "destructive"
                            }
                          >
                            {invoice.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(parseISO(invoice.dueDate), "MMM d, yyyy")}</TableCell>
                        <TableCell>
                          {invoice.paidDate ? format(parseISO(invoice.paidDate), "MMM d, yyyy") : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BillingPage;
