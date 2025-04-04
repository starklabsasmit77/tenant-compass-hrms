
import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Download, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { attendanceService, AttendanceRecord } from "@/services/attendance.service";

// Mock attendance data
const mockAttendance = Array.from({ length: 20 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  
  // Generate random attendance status
  const statuses = ['present', 'present', 'present', 'present', 'half-day', 'leave', 'weekend'] as const;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: `att-${i}`,
    employeeId: '1',
    date: format(date, 'yyyy-MM-dd'),
    checkIn: status === 'present' || status === 'half-day' 
      ? `${String(8 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` 
      : null,
    checkOut: status === 'present'
      ? `${String(17 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      : status === 'half-day'
        ? `${String(13 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
        : null,
    status,
    workHours: status === 'present' ? 8 + Math.random() * 2 : status === 'half-day' ? 4 + Math.random() : 0,
    overtimeHours: Math.random() > 0.7 ? Math.random() * 2 : 0,
    notes: ''
  } as AttendanceRecord;
});

const EmployeeAttendancePage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [isClockingOut, setIsClockingOut] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [month, setMonth] = useState<Date>(new Date());
  const [isPunchingIn, setIsPunchingIn] = useState(false);
  const [isPunchingOut, setIsPunchingOut] = useState(false);
  
  // Find today's attendance record
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayRecord = attendance.find(record => record.date === today);
  
  // Calculate attendance summary
  const totalPresent = attendance.filter(record => record.status === 'present').length;
  const totalHalfDay = attendance.filter(record => record.status === 'half-day').length;
  const totalLeave = attendance.filter(record => record.status === 'leave').length;
  const totalWorkHours = attendance.reduce((sum, record) => sum + record.workHours, 0);
  
  // For the calendar view - mark days with attendance status
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  });
  
  const attendanceDays = daysInMonth.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const record = attendance.find(rec => rec.date === dateStr);
    return {
      date: day,
      status: record?.status || 'weekend'
    };
  });
  
  const handleClockIn = async () => {
    setIsPunchingIn(true);
    try {
      // In a real app, this would be an API call with geolocation
      setTimeout(() => {
        const newRecord: AttendanceRecord = {
          id: `att-new-${Date.now()}`,
          employeeId: '1',
          date: format(new Date(), 'yyyy-MM-dd'),
          checkIn: format(new Date(), 'HH:mm'),
          checkOut: '',
          status: 'present',
          workHours: 0,
          overtimeHours: 0,
          notes: ''
        };
        
        setAttendance(prev => [newRecord, ...prev.filter(r => r.date !== today)]);
        toast.success("Successfully clocked in!");
        setIsPunchingIn(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to clock in. Please try again.");
      setIsPunchingIn(false);
    }
  };
  
  const handleClockOut = async () => {
    setIsPunchingOut(true);
    try {
      // In a real app, this would be an API call with geolocation
      setTimeout(() => {
        setAttendance(prev => {
          const updated = [...prev];
          const todayIndex = updated.findIndex(r => r.date === today);
          if (todayIndex >= 0) {
            const clockIn = updated[todayIndex].checkIn || '09:00';
            const clockInTime = new Date();
            const [inHours, inMinutes] = clockIn.split(':').map(Number);
            clockInTime.setHours(inHours, inMinutes);
            
            const now = new Date();
            const diffMs = now.getTime() - clockInTime.getTime();
            const diffHrs = diffMs / (1000 * 60 * 60);
            
            updated[todayIndex] = {
              ...updated[todayIndex],
              checkOut: format(now, 'HH:mm'),
              workHours: parseFloat(diffHrs.toFixed(2)),
              status: diffHrs >= 7.5 ? 'present' : 'half-day'
            };
          }
          return updated;
        });
        
        toast.success("Successfully clocked out!");
        setIsPunchingOut(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to clock out. Please try again.");
      setIsPunchingOut(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">My Attendance</h1>
          <Button variant="outline" size="sm" onClick={() => toast.success("Attendance report downloaded")}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Present</span>
                  <span className="font-medium">{totalPresent} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Half Day</span>
                  <span className="font-medium">{totalHalfDay} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Leave</span>
                  <span className="font-medium">{totalLeave} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Work Hours</span>
                  <span className="font-medium">{totalWorkHours.toFixed(1)} hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Clock In/Out */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-4xl font-bold">
                  {format(new Date(), 'HH:mm')}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(), 'EEEE, MMMM d, yyyy')}
                </div>
                
                <div className="flex gap-4 mt-4">
                  <Button 
                    onClick={handleClockIn} 
                    disabled={!!todayRecord?.checkIn || isPunchingIn}
                    className="flex-1"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {isPunchingIn ? "Clocking In..." : "Clock In"}
                  </Button>
                  <Button 
                    onClick={handleClockOut} 
                    disabled={!todayRecord?.checkIn || !!todayRecord?.checkOut || isPunchingOut}
                    variant="outline"
                    className="flex-1"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {isPunchingOut ? "Clocking Out..." : "Clock Out"}
                  </Button>
                </div>
                
                {todayRecord && (
                  <div className="w-full text-sm space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clock In</span>
                      <span className="font-medium">{todayRecord.checkIn || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clock Out</span>
                      <span className="font-medium">{todayRecord.checkOut || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant={
                        todayRecord.status === 'present' ? 'default' : 
                        todayRecord.status === 'half-day' ? 'warning' : 'destructive'
                      }>
                        {todayRecord.status}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Calendar View */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly View</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={month}
                className="pointer-events-auto"
                modifiers={{
                  selected: attendanceDays
                    .filter(day => day.status !== 'weekend')
                    .map(day => day.date)
                }}
                modifiersClassNames={{
                  selected: ""
                }}
                styles={{
                  day: {
                    '&[data-selected]': {
                      backgroundColor: 'transparent',
                      color: 'inherit',
                      fontWeight: 'bold'
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Present</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Half-day</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Absent</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Leave</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="space-y-4">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendance.slice(0, 10).map((record) => (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {format(new Date(record.date), 'MMM dd, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.checkIn || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.checkOut || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.workHours.toFixed(1)}h
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={
                              record.status === 'present' ? 'default' : 
                              record.status === 'half-day' ? 'warning' : 
                              record.status === 'leave' ? 'secondary' : 
                              'outline'
                            }>
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="calendar">
                <p className="text-sm text-muted-foreground pb-4">
                  <Info className="inline mr-1 h-4 w-4" />
                  Click on a date to view detailed attendance for that day
                </p>
                
                {/* Calendar view component would go here */}
                <div className="text-center p-10 border rounded-md">
                  <p className="text-muted-foreground">Calendar view coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployeeAttendancePage;
