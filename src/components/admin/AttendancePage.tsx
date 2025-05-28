
import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, QrCode, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Mock attendance data
  const todayAttendance = [
    {
      id: '1',
      name: 'John Smith',
      memberId: 'GYM001',
      checkIn: '08:30 AM',
      checkOut: '10:15 AM',
      duration: '1h 45m',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      memberId: 'GYM002',
      checkIn: '09:15 AM',
      checkOut: null,
      duration: null,
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Wilson',
      memberId: 'GYM003',
      checkIn: '10:00 AM',
      checkOut: '11:30 AM',
      duration: '1h 30m',
      status: 'completed',
    },
    {
      id: '4',
      name: 'Emily Davis',
      memberId: 'GYM004',
      checkIn: '11:45 AM',
      checkOut: null,
      duration: null,
      status: 'active',
    },
  ];

  const membersList = [
    { id: '1', name: 'John Smith', memberId: 'GYM001', attendance: 85 },
    { id: '2', name: 'Sarah Johnson', memberId: 'GYM002', attendance: 72 },
    { id: '3', name: 'Mike Wilson', memberId: 'GYM003', attendance: 45 },
    { id: '4', name: 'Emily Davis', memberId: 'GYM004', attendance: 92 },
    { id: '5', name: 'Chris Brown', memberId: 'GYM005', attendance: 68 },
  ];

  const filteredAttendance = todayAttendance.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = membersList.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManualCheckIn = (memberId: string, memberName: string) => {
    toast.success(`${memberName} checked in successfully!`);
  };

  const handleCheckOut = (memberId: string, memberName: string) => {
    toast.success(`${memberName} checked out successfully!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Track and manage member attendance</p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => setShowQRScanner(!showQRScanner)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <QrCode className="w-4 h-4 mr-2" />
            QR Check-in
          </Button>
        </div>

        {/* QR Scanner Simulation */}
        {showQRScanner && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">QR Code Scanner Active</h3>
                <p className="text-blue-700 mb-4">Members can scan their QR code to check in</p>
                <Button variant="outline" onClick={() => setShowQRScanner(false)}>
                  Stop Scanner
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance ({filteredAttendance.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAttendance.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{record.name}</h4>
                        <p className="text-sm text-gray-600">{record.memberId}</p>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Check In:</span>
                        <p className="font-medium">{record.checkIn}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Check Out:</span>
                        <p className="font-medium">{record.checkOut || 'Still inside'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-medium">{record.duration || 'Ongoing'}</p>
                      </div>
                    </div>
                    {record.status === 'active' && (
                      <Button
                        size="sm"
                        onClick={() => handleCheckOut(record.id, record.name)}
                        className="mt-3 w-full"
                      >
                        Check Out
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Members for Manual Check-in */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{member.memberId}</span>
                        <span className={`font-medium ${getAttendanceColor(member.attendance)}`}>
                          {member.attendance}% attendance
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleManualCheckIn(member.id, member.name)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Check In
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-gray-600">Today's Check-ins</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">18</p>
                <p className="text-gray-600">Completed Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">6</p>
                <p className="text-gray-600">Currently Inside</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">76%</p>
                <p className="text-gray-600">Average Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AttendancePage;
