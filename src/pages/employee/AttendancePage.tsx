
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock attendance data
const attendanceData = {
  present: 18,
  absent: 2,
  late: 3,
  leavesTaken: 1,
  totalWorkingDays: 21,
  attendancePercentage: 86
};

// Generate mock attendance records for the current month
const generateAttendanceRecords = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const statuses = ["present", "absent", "late", "leave"];
  const weights = [0.8, 0.05, 0.1, 0.05]; // Probability weights
  
  const records: Record<string, { date: Date; status: string; checkIn?: string; checkOut?: string; workHours?: number }> = {};
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Skip future dates
    if (date > now) continue;
    
    // Select random status based on weights
    const random = Math.random();
    let statusIndex = 0;
    let sum = weights[0];
    
    while (random > sum && statusIndex < weights.length - 1) {
      statusIndex++;
      sum += weights[statusIndex];
    }
    
    const status = statuses[statusIndex];
    
    const record: { date: Date; status: string; checkIn?: string; checkOut?: string; workHours?: number } = {
      date,
      status
    };
    
    // Add check-in/out times for present and late
    if (status === "present" || status === "late") {
      const checkInHour = status === "present" ? 9 : 9 + Math.floor(Math.random() * 2) + 1;
      const checkInMinute = Math.floor(Math.random() * 60);
      const workHours = 8 - (status === "late" ? Math.floor(Math.random() * 2) : 0);
      
      record.checkIn = `${checkInHour.toString().padStart(2, '0')}:${checkInMinute.toString().padStart(2, '0')}`;
      
      const checkOutHour = checkInHour + workHours;
      record.checkOut = `${checkOutHour.toString().padStart(2, '0')}:${checkInMinute.toString().padStart(2, '0')}`;
      record.workHours = workHours;
    }
    
    records[format(date, 'yyyy-MM-dd')] = record;
  }
  
  return records;
};

const attendanceRecords = generateAttendanceRecords();

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState<string | null>(null);
  
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedAttendance = selectedDateStr ? attendanceRecords[selectedDateStr] : undefined;
  
  const handlePunchIn = () => {
    const now = new Date();
    const timeString = format(now, 'HH:mm');
    setPunchInTime(timeString);
    setIsPunchedIn(true);
    toast.success("Punched in successfully", {
      description: `Time: ${timeString}`
    });
  };
  
  const handlePunchOut = () => {
    const now = new Date();
    const timeString = format(now, 'HH:mm');
    setIsPunchedIn(false);
    toast.success("Punched out successfully", {
      description: `Time: ${timeString}`
    });
  };

  // Function to determine the badge color based on attendance status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Late</Badge>;
      case 'leave':
        return <Badge variant="secondary">Leave</Badge>;
      default:
        return null;
    }
  };

  // Function to highlight dates on the calendar based on attendance status
  const dayClassName = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = attendanceRecords[dateStr];
    if (!record) return "";
    
    switch(record.status) {
      case 'present':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'absent':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'late':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case 'leave':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">My Attendance</h1>
        
        {/* Today's Punch In/Out Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <p className="font-semibold text-lg">
                    {isPunchedIn ? 'Working' : 'Not Clocked In'}
                  </p>
                  {punchInTime && isPunchedIn && (
                    <p className="text-xs text-muted-foreground">
                      Punched in at {punchInTime}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="ml-auto">
                {isPunchedIn ? (
                  <Button onClick={handlePunchOut} variant="destructive">
                    Punch Out
                  </Button>
                ) : (
                  <Button onClick={handlePunchIn}>
                    Punch In
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Attendance Stats & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attendance Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Present</span>
                    <span className="font-medium">{attendanceData.present} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Absent</span>
                    <span className="font-medium">{attendanceData.absent} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Late</span>
                    <span className="font-medium">{attendanceData.late} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Leaves Taken</span>
                    <span className="font-medium">{attendanceData.leavesTaken} days</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Attendance Rate</span>
                      <span className="font-semibold text-lg">{attendanceData.attendancePercentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Selected Day Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No Date Selected'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedAttendance ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <div>{getStatusBadge(selectedAttendance.status)}</div>
                    </div>
                    {selectedAttendance.checkIn && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Check In</span>
                        <span className="font-medium">{selectedAttendance.checkIn}</span>
                      </div>
                    )}
                    {selectedAttendance.checkOut && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Check Out</span>
                        <span className="font-medium">{selectedAttendance.checkOut}</span>
                      </div>
                    )}
                    {selectedAttendance.workHours && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Work Hours</span>
                        <span className="font-medium">{selectedAttendance.workHours} hours</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    No attendance record for this date
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Attendance Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="mx-auto"
                    modifiers={{
                      customStyles: Object.keys(attendanceRecords).map(dateStr => new Date(dateStr))
                    }}
                    modifiersClassNames={{
                      customStyles: (date) => dayClassName(date)
                    }}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs">Late</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Leave</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendancePage;
