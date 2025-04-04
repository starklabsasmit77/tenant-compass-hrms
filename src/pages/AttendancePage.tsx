
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
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for attendance stats
const attendanceStats = {
  present: 124,
  absent: 8,
  late: 10,
  total: 142,
  presentPercentage: 87,
  absentPercentage: 5.6,
  latePercentage: 7.4,
};

// Mock data for attendance records
const attendanceRecords = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "2025-04-04",
    clockIn: "08:55 AM",
    clockOut: "06:05 PM",
    status: "Present",
    workedHours: "9h 10m",
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "2025-04-04",
    clockIn: "09:15 AM", 
    clockOut: "06:00 PM",
    status: "Late",
    workedHours: "8h 45m",
  },
  {
    id: 3,
    name: "Emma Wilson",
    date: "2025-04-04",
    clockIn: "08:45 AM",
    clockOut: "05:50 PM",
    status: "Present",
    workedHours: "9h 05m",
  },
  {
    id: 4,
    name: "James Rodriguez", 
    date: "2025-04-04",
    clockIn: "--",
    clockOut: "--",
    status: "Absent",
    workedHours: "0h",
  },
  {
    id: 5,
    name: "Olivia Davis",
    date: "2025-04-04",
    clockIn: "08:50 AM",
    clockOut: "06:10 PM",
    status: "Present",
    workedHours: "9h 20m",
  }
];

const AttendancePage = () => {
  const [dateFilter, setDateFilter] = useState("2025-04-04");

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Attendance</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button>
              <Clock className="mr-2 h-4 w-4" />
              Record Attendance
            </Button>
          </div>
        </div>
        
        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Present</CardTitle>
              <CardDescription>Total employees present today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{attendanceStats.present}</div>
                <div className="text-sm text-muted-foreground">
                  {attendanceStats.presentPercentage}%
                </div>
              </div>
              <Progress 
                className="mt-2" 
                value={attendanceStats.presentPercentage} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Absent</CardTitle>
              <CardDescription>Total employees absent today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{attendanceStats.absent}</div>
                <div className="text-sm text-muted-foreground">
                  {attendanceStats.absentPercentage}%
                </div>
              </div>
              <Progress 
                className="mt-2" 
                value={attendanceStats.absentPercentage} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Late</CardTitle>
              <CardDescription>Total employees late today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{attendanceStats.late}</div>
                <div className="text-sm text-muted-foreground">
                  {attendanceStats.latePercentage}%
                </div>
              </div>
              <Progress 
                className="mt-2" 
                value={attendanceStats.latePercentage} 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Attendance Records */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-lg">Daily Attendance</CardTitle>
                <CardDescription>Employee attendance for the selected date</CardDescription>
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-04-04">April 4, 2025</SelectItem>
                  <SelectItem value="2025-04-03">April 3, 2025</SelectItem>
                  <SelectItem value="2025-04-02">April 2, 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.name}</TableCell>
                    <TableCell>{record.clockIn}</TableCell>
                    <TableCell>{record.clockOut}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          record.status === "Present" ? "outline" : 
                          record.status === "Late" ? "secondary" : "destructive"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.workedHours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AttendancePage;
