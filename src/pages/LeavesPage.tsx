
import { useState } from "react";
import Layout from "../components/layout/Layout";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Mock data for leave balances
const leaveBalances = [
  { type: "Annual Leave", total: 20, used: 8, balance: 12 },
  { type: "Sick Leave", total: 12, used: 3, balance: 9 },
  { type: "Personal Leave", total: 5, used: 1, balance: 4 },
  { type: "Maternity/Paternity", total: 0, used: 0, balance: 0 }
];

// Mock data for leave applications
const pendingLeaves = [
  {
    id: 1,
    employee: "Michael Chen",
    type: "Sick Leave",
    duration: "1 day",
    from: "Apr 6, 2025",
    to: "Apr 6, 2025",
    status: "Pending",
    requestedOn: "Apr 2, 2025"
  },
  {
    id: 2,
    employee: "Emma Wilson",
    type: "Annual Leave",
    duration: "5 days",
    from: "Apr 10, 2025",
    to: "Apr 14, 2025",
    status: "Pending",
    requestedOn: "Mar 25, 2025"
  },
  {
    id: 3,
    employee: "Jessica Martinez",
    type: "Personal Leave",
    duration: "1 day",
    from: "Apr 8, 2025",
    to: "Apr 8, 2025",
    status: "Pending",
    requestedOn: "Apr 1, 2025"
  }
];

const approvedLeaves = [
  {
    id: 4,
    employee: "Sarah Johnson",
    type: "Annual Leave",
    duration: "3 days",
    from: "Apr 20, 2025",
    to: "Apr 22, 2025",
    status: "Approved",
    requestedOn: "Mar 15, 2025"
  },
  {
    id: 5,
    employee: "James Rodriguez",
    type: "Sick Leave",
    duration: "2 days",
    from: "Apr 4, 2025",
    to: "Apr 5, 2025",
    status: "Approved",
    requestedOn: "Apr 3, 2025"
  }
];

const rejectedLeaves = [
  {
    id: 6,
    employee: "Robert Kim",
    type: "Annual Leave",
    duration: "7 days",
    from: "Apr 15, 2025", 
    to: "Apr 21, 2025",
    status: "Rejected",
    requestedOn: "Mar 20, 2025",
    reason: "Short staffed during that period"
  }
];

const LeavesPage = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("pending");
  
  const handleApprove = (id: number) => {
    toast({
      title: "Leave Approved",
      description: `Leave application #${id} has been approved.`
    });
  };
  
  const handleReject = (id: number) => {
    toast({
      title: "Leave Rejected",
      description: `Leave application #${id} has been rejected.`
    });
  };
  
  const handleNewLeave = () => {
    toast({
      title: "New Leave Application",
      description: "Leave application form will be added soon."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="secondary">{status}</Badge>;
      case "Approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const renderLeaveTable = (leaveData: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveData.length > 0 ? (
          leaveData.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>
                      {leave.employee.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{leave.employee}</span>
                </div>
              </TableCell>
              <TableCell>{leave.type}</TableCell>
              <TableCell>{leave.from}</TableCell>
              <TableCell>{leave.to}</TableCell>
              <TableCell>{leave.duration}</TableCell>
              <TableCell>{getStatusBadge(leave.status)}</TableCell>
              <TableCell>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-8" onClick={() => handleApprove(leave.id)}>Approve</Button>
                    <Button size="sm" variant="outline" className="h-8" onClick={() => handleReject(leave.id)}>Reject</Button>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No actions
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
              No leave applications found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <Button onClick={handleNewLeave}>
            <Plus className="mr-2 h-4 w-4" />
            New Leave Application
          </Button>
        </div>
        
        {/* Leave Balances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveBalances.map((leave) => (
            <Card key={leave.type}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{leave.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{leave.balance}</span>
                    <span className="text-xs text-muted-foreground">Balance</span>
                  </div>
                  <div className="text-sm">
                    <div className="flex flex-col items-end">
                      <span>{leave.used}/{leave.total}</span>
                      <span className="text-xs text-muted-foreground">Used</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Leave Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Applications</CardTitle>
            <CardDescription>Manage employee leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" onValueChange={setCurrentTab} value={currentTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending ({pendingLeaves.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="mt-0">
                {renderLeaveTable(pendingLeaves)}
              </TabsContent>
              <TabsContent value="approved" className="mt-0">
                {renderLeaveTable(approvedLeaves)}
              </TabsContent>
              <TabsContent value="rejected" className="mt-0">
                {renderLeaveTable(rejectedLeaves)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LeavesPage;
