
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUser } from "@/contexts/UserContext";

// Mock leave balances data
const leaveBalances = [
  { type: "Annual Leave", used: 5, total: 20, remaining: 15 },
  { type: "Sick Leave", used: 2, total: 10, remaining: 8 },
  { type: "Personal Leave", used: 1, total: 5, remaining: 4 },
  { type: "Unpaid Leave", used: 0, total: 0, remaining: 0 },
];

// Mock leave requests data
const leaveRequests = [
  {
    id: "1",
    type: "Annual Leave",
    startDate: "Apr 15, 2025",
    endDate: "Apr 18, 2025",
    days: 4,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "Mar 20, 2025",
  },
  {
    id: "2",
    type: "Sick Leave",
    startDate: "Mar 10, 2025",
    endDate: "Mar 11, 2025",
    days: 2,
    reason: "Doctor's appointment",
    status: "Approved",
    appliedOn: "Mar 9, 2025",
  },
  {
    id: "3",
    type: "Personal Leave",
    startDate: "May 5, 2025",
    endDate: "May 5, 2025",
    days: 1,
    reason: "Personal matters",
    status: "Pending",
    appliedOn: "Apr 2, 2025",
  },
];

const LeaveRequestPage = () => {
  const { currentUser } = useUser();
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleApplyLeave = () => {
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error("Please fill all required fields");
      return;
    }
    
    toast.success("Leave application submitted", {
      description: "Your leave request has been submitted for approval."
    });
    
    // Reset form
    setLeaveType("");
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription>
                  Fill out the form below to submit a leave request.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="leaveType" className="text-sm font-medium">Leave Type</label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                      <SelectItem value="Unpaid Leave">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => startDate ? date < startDate : false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="reason" className="text-sm font-medium">Reason</label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your leave request"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleApplyLeave}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaveBalances.map((balance, index) => (
            <Card key={index} className={balance.remaining === 0 ? "opacity-60" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{balance.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-bold">{balance.remaining}</span>
                    <span className="text-sm text-muted-foreground ml-1">days remaining</span>
                  </div>
                  <div className="text-xs text-right">
                    <div>{balance.used} used</div>
                    <div>{balance.total} total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Leave Requests Table */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Leave Requests</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      {request.startDate} to {request.endDate}
                    </TableCell>
                    <TableCell>{request.days}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === "Approved" ? "outline" : 
                          request.status === "Pending" ? "secondary" : "destructive"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.appliedOn}</TableCell>
                  </TableRow>
                ))}
                {leaveRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No leave requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequestPage;
