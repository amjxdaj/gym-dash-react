
import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, QrCode, UserCheck, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';

const AttendancePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock attendance data
  const todayAttendance = [
    { id: 1, name: 'John Smith', memberId: 'GYM001', checkIn: '08:30 AM', checkOut: '10:15 AM', status: 'completed' },
    { id: 2, name: 'Sarah Johnson', memberId: 'GYM002', checkIn: '07:15 AM', checkOut: null, status: 'active' },
    { id: 3, name: 'Mike Wilson', memberId: 'GYM003', checkIn: '18:00 PM', checkOut: '19:30 PM', status: 'completed' },
    { id: 4, name: 'Emily Davis', memberId: 'GYM004', checkIn: '08:45 AM', checkOut: '10:20 AM', status: 'completed' },
    { id: 5, name: 'Chris Brown', memberId: 'GYM005', checkIn: '17:30 PM', checkOut: null, status: 'active' },
  ];

  const allMembers = [
    { id: 1, name: 'John Smith', memberId: 'GYM001' },
    { id: 2, name: 'Sarah Johnson', memberId: 'GYM002' },
    { id: 3, name: 'Mike Wilson', memberId: 'GYM003' },
    { id: 4, name: 'Emily Davis', memberId: 'GYM004' },
    { id: 5, name: 'Chris Brown', memberId: 'GYM005' },
    { id: 6, name: 'Lisa White', memberId: 'GYM006' },
    { id: 7, name: 'David Miller', memberId: 'GYM007' },
  ];

  const filteredAttendance = todayAttendance.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = allMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.memberId.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(member => 
    !todayAttendance.find(attendance => attendance.id === member.id)
  );

  const handleManualCheckIn = (memberId: number, memberName: string) => {
    toast.success(`${memberName} checked in successfully!`);
  };

  const handleCheckOut = (memberId: number, memberName: string) => {
    toast.success(`${memberName} checked out successfully!`);
  };

  const handleQRCheckIn = () => {
    toast.info('QR Code scanner would open here in a real implementation');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { title: 'Today\'s Check-ins', value: todayAttendance.length, icon: UserCheck, color: 'bg-blue-500' },
    { title: 'Currently Active', value: todayAttendance.filter(a => a.status === 'active').length, icon: Clock, color: 'bg-green-500' },
    { title: 'Completed Sessions', value: todayAttendance.filter(a => a.status === 'completed').length, icon: Calendar, color: 'bg-purple-500' },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Track member check-ins and check-outs</p>
          </div>
          <Button onClick={handleQRCheckIn} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <QrCode className="w-4 h-4 mr-2" />
            QR Check-in
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Date and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-40"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or member ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance ({filteredAttendance.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{record.name}</div>
                      <div className="text-sm text-gray-600">ID: {record.memberId}</div>
                      <div className="text-sm text-gray-600">
                        In: {record.checkIn} {record.checkOut && `• Out: ${record.checkOut}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(record.status)}>
                        {record.status === 'active' ? 'Active' : 'Completed'}
                      </Badge>
                      {record.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCheckOut(record.id, record.name)}
                        >
                          Check Out
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {filteredAttendance.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No attendance records found for today.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Check-in */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredMembers.slice(0, 10).map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">ID: {member.memberId}</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleManualCheckIn(member.id, member.name)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Check In
                    </Button>
                  </div>
                ))}
                
                {filteredMembers.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    All active members have already checked in today.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Check-in', member: 'John Smith', time: '5 minutes ago', type: 'checkin' },
                { action: 'Check-out', member: 'Sarah Johnson', time: '12 minutes ago', type: 'checkout' },
                { action: 'Check-in', member: 'Mike Wilson', time: '1 hour ago', type: 'checkin' },
                { action: 'Check-out', member: 'Emily Davis', time: '2 hours ago', type: 'checkout' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      activity.type === 'checkin' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <span className="font-medium">{activity.member}</span>
                      <span className="text-gray-600 ml-2">{activity.action}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AttendancePage;
