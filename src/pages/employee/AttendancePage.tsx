
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, isSameMonth, parseISO, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, MapPin, Clock, CalendarDays, CalendarClock, CalendarX } from 'lucide-react';
import { cn } from '@/lib/utils';
import Layout from '@/components/layout/Layout';

// Mock attendance data
const mockAttendanceData = [
  { date: '2025-04-01', status: 'present', checkIn: '09:05:22', checkOut: '18:10:15', workHours: 9.08, location: '123 Main St, City' },
  { date: '2025-04-02', status: 'present', checkIn: '08:58:07', checkOut: '17:55:42', workHours: 8.96, location: '123 Main St, City' },
  { date: '2025-04-03', status: 'present', checkIn: '09:10:33', checkOut: '18:05:21', workHours: 8.91, location: '123 Main St, City' },
  { date: '2025-04-04', status: 'present', checkIn: '08:55:19', checkOut: '17:50:44', workHours: 8.92, location: 'Remote' },
  { date: '2025-04-05', status: 'weekend', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-06', status: 'weekend', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-07', status: 'present', checkIn: '09:02:11', checkOut: '18:00:07', workHours: 8.97, location: '123 Main St, City' },
  { date: '2025-04-08', status: 'present', checkIn: '08:59:45', checkOut: '18:05:39', workHours: 9.10, location: '123 Main St, City' },
  { date: '2025-04-09', status: 'leave', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-10', status: 'leave', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-11', status: 'absent', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-12', status: 'weekend', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-13', status: 'weekend', checkIn: '', checkOut: '', workHours: 0, location: '' },
  { date: '2025-04-14', status: 'present', checkIn: '09:00:05', checkOut: '18:02:33', workHours: 9.04, location: '123 Main St, City' },
  { date: '2025-04-15', status: 'present', checkIn: '09:00:05', checkOut: '18:02:33', workHours: 9.04, location: '123 Main St, City' },
];

// Mock summary data
const mockSummary = {
  totalWorkDays: 22,
  present: 17,
  absent: 1,
  leave: 2,
  weekend: 8,
  holiday: 2,
  totalWorkHours: 153.67,
  avgWorkHours: 9.04,
};

const AttendancePage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handlePrevMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  // Filter attendance data for the selected month
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  // Get attendance for selected date
  const selectedAttendance = selectedDate ? 
    mockAttendanceData.find(record => isSameDay(parseISO(record.date), selectedDate)) : null;

  // Get attendance status class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'leave':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'holiday':
      case 'weekend':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return '';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Attendance</h1>
            <div className="flex space-x-2">
              <Button variant="outline">Clock In</Button>
              <Button variant="outline">Clock Out</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Present Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-green-600 mr-2" />
                  <div className="text-2xl font-bold">{mockSummary.present}/{mockSummary.totalWorkDays}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Work Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <div className="text-2xl font-bold">{mockSummary.totalWorkHours} hrs</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CalendarX className="h-5 w-5 text-red-600 mr-2" />
                  <div className="text-2xl font-bold">{mockSummary.absent}</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Attendance Calendar</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-sm font-medium">
                        {format(date, 'MMMM yyyy')}
                      </div>
                      <Button variant="outline" size="icon" onClick={handleNextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={setSelectedDate}
                    month={date}
                    className="rounded-md border"
                    modifiers={{ 
                      selected: [selectedDate || new Date()]
                    }}
                    modifiersClassNames={{
                      selected: 'bg-primary text-primary-foreground font-bold'
                    }}
                    styles={{
                      day: {
                        width: '40px',
                        height: '40px'
                      }
                    }}
                    // Using the DayContent render prop to customize the day cell
                    dayClassName={(day) => {
                      // Check if there's attendance data for this day
                      const attendance = mockAttendanceData.find(
                        record => isSameDay(parseISO(record.date), day)
                      );
                      
                      if (!attendance || !isSameMonth(day, date)) return "";
                      
                      return getStatusClass(attendance.status);
                    }}
                  />
                </CardContent>
              </Card>
              
              {selectedAttendance && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Details for {format(selectedDate!, 'MMMM d, yyyy')}</CardTitle>
                    <CardDescription>
                      <Badge className={cn(getStatusClass(selectedAttendance.status), 'capitalize')}>
                        {selectedAttendance.status}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedAttendance.status === 'present' ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <div className="text-sm text-muted-foreground">Check In</div>
                              <div className="font-medium">{selectedAttendance.checkIn}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <div className="text-sm text-muted-foreground">Check Out</div>
                              <div className="font-medium">{selectedAttendance.checkOut}</div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <CalendarClock className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <div className="text-sm text-muted-foreground">Work Hours</div>
                              <div className="font-medium">{selectedAttendance.workHours} hours</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <div className="text-sm text-muted-foreground">Location</div>
                              <div className="font-medium">{selectedAttendance.location}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        {selectedAttendance.status === 'weekend' && "Weekend day - No attendance required"}
                        {selectedAttendance.status === 'leave' && "On leave"}
                        {selectedAttendance.status === 'absent' && "Marked as absent"}
                        {selectedAttendance.status === 'holiday' && "Public holiday"}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>Your attendance records for {format(date, 'MMMM yyyy')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-muted/50 p-2 text-sm font-medium">
                      <div>Date</div>
                      <div>Status</div>
                      <div>Check In</div>
                      <div>Check Out</div>
                      <div>Work Hours</div>
                    </div>
                    <div className="divide-y">
                      {mockAttendanceData.map((record, index) => (
                        <div key={index} className="grid grid-cols-5 p-2 text-sm">
                          <div>{format(parseISO(record.date), 'MMM d, yyyy')}</div>
                          <div>
                            <Badge className={cn(getStatusClass(record.status), 'capitalize')}>
                              {record.status}
                            </Badge>
                          </div>
                          <div>{record.checkIn || '-'}</div>
                          <div>{record.checkOut || '-'}</div>
                          <div>{record.workHours > 0 ? `${record.workHours} hrs` : '-'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AttendancePage;
