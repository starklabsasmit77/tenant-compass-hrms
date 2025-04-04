
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

// Mock payslips data
const payslips = [
  {
    id: "1",
    period: "Apr 2025",
    issueDate: "Apr 30, 2025",
    grossPay: 5000,
    deductions: 1200,
    netPay: 3800,
    status: "Paid"
  },
  {
    id: "2",
    period: "Mar 2025",
    issueDate: "Mar 31, 2025",
    grossPay: 5000,
    deductions: 1200,
    netPay: 3800,
    status: "Paid"
  },
  {
    id: "3",
    period: "Feb 2025",
    issueDate: "Feb 28, 2025",
    grossPay: 4800,
    deductions: 1150,
    netPay: 3650,
    status: "Paid"
  }
];

// Mock latest payslip details
const latestPayslip = {
  id: "1",
  employee: {
    name: "John Employee",
    id: "EMP001",
    department: "Engineering",
    position: "Developer",
    bankAccount: "XXXX-XXXX-1234"
  },
  payPeriod: "Apr 2025",
  paymentDate: "Apr 30, 2025",
  earnings: [
    { description: "Basic Salary", amount: 4500 },
    { description: "Housing Allowance", amount: 300 },
    { description: "Transport Allowance", amount: 200 }
  ],
  deductions: [
    { description: "Income Tax", amount: 600 },
    { description: "Pension Contribution", amount: 450 },
    { description: "Health Insurance", amount: 150 }
  ],
  totalEarnings: 5000,
  totalDeductions: 1200,
  netPay: 3800
};

const PayslipsPage = () => {
  const { currentUser } = useUser();
  const [year, setYear] = useState("2025");
  
  const handleDownloadPayslip = (id: string) => {
    toast.success("Payslip downloaded", {
      description: "Your payslip has been downloaded successfully."
    });
  };

  const handleViewPayslip = (id: string) => {
    toast.success("Viewing payslip details");
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">My Payslips</h1>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Latest Payslip Card */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Payslip</CardTitle>
            <CardDescription>Pay Period: {latestPayslip.payPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Employee Info */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Employee Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {latestPayslip.employee.name}</p>
                  <p><span className="text-muted-foreground">Employee ID:</span> {latestPayslip.employee.id}</p>
                  <p><span className="text-muted-foreground">Department:</span> {latestPayslip.employee.department}</p>
                  <p><span className="text-muted-foreground">Position:</span> {latestPayslip.employee.position}</p>
                </div>
              </div>
              
              {/* Pay Summary */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Pay Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span className="font-medium">${latestPayslip.totalEarnings}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Total Deductions</span>
                    <span className="font-medium">-${latestPayslip.totalDeductions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Net Pay</span>
                    <span className="font-semibold">${latestPayslip.netPay}</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Info */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Payment Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Payment Date:</span> {latestPayslip.paymentDate}</p>
                  <p><span className="text-muted-foreground">Bank Account:</span> {latestPayslip.employee.bankAccount}</p>
                  <p><span className="text-muted-foreground">Payment Method:</span> Direct Deposit</p>
                </div>
                <Button variant="outline" className="mt-4" onClick={() => handleDownloadPayslip(latestPayslip.id)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            {/* Earnings & Deductions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Earnings */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Earnings</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestPayslip.earnings.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">${item.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-semibold">Total</TableCell>
                      <TableCell className="text-right font-semibold">${latestPayslip.totalEarnings}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {/* Deductions */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Deductions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestPayslip.deductions.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">${item.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-semibold">Total</TableCell>
                      <TableCell className="text-right font-semibold">${latestPayslip.totalDeductions}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Payslip History */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Payslip History</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead className="text-right">Gross Pay</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((payslip) => (
                  <TableRow key={payslip.id}>
                    <TableCell>{payslip.period}</TableCell>
                    <TableCell>{payslip.issueDate}</TableCell>
                    <TableCell className="text-right">${payslip.grossPay}</TableCell>
                    <TableCell className="text-right">${payslip.deductions}</TableCell>
                    <TableCell className="text-right font-medium">${payslip.netPay}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payslip.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewPayslip(payslip.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadPayslip(payslip.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PayslipsPage;
