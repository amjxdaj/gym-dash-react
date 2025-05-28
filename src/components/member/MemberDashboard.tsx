
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, TrendingUp, User, LogOut, Activity } from 'lucide-react';
import { toast } from 'sonner';

const MemberDashboard = () => {
  const { user, logout } = useAuth();

  // Mock member data
  const memberData = {
    name: 'Mike Member',
    memberId: 'GYM001234',
    package: 'Premium',
    amount: 99,
    startDate: '2024-01-15',
    expiryDate: '2024-12-15',
    feeStatus: 'Paid',
    nextPaymentDate: '2024-12-15',
    attendance: 78,
    totalVisits: 156,
    daysLeft: 168,
  };

  const recentAttendance = [
    { date: '2024-11-25', checkIn: '08:30 AM', checkOut: '10:15 AM', duration: '1h 45m' },
    { date: '2024-11-23', checkIn: '07:15 AM', checkOut: '09:00 AM', duration: '1h 45m' },
    { date: '2024-11-21', checkIn: '18:00 PM', checkOut: '19:30 PM', duration: '1h 30m' },
    { date: '2024-11-19', checkIn: '08:45 AM', checkOut: '10:20 AM', duration: '1h 35m' },
    { date: '2024-11-17', checkIn: '17:30 PM', checkOut: '19:15 PM', duration: '1h 45m' },
  ];

  const monthlyStats = [
    { month: 'Aug', visits: 18 },
    { month: 'Sep', visits: 22 },
    { month: 'Oct', visits: 20 },
    { month: 'Nov', visits: 16 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePayment = () => {
    toast.info('Redirecting to payment gateway...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GM</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">GymPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold">{memberData.name}</h1>
                    <p className="text-blue-100">Member ID: {memberData.memberId}</p>
                    <p className="text-blue-100">{memberData.package} Package</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{memberData.daysLeft}</p>
                  <p className="text-blue-100">Days Left</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-500 p-3 rounded-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{memberData.feeStatus}</p>
                  <p className="text-gray-600">Payment Status</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{memberData.attendance}%</p>
                  <p className="text-gray-600">Attendance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{memberData.totalVisits}</p>
                  <p className="text-gray-600">Total Visits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{memberData.expiryDate}</p>
                  <p className="text-gray-600">Expires On</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Membership Details */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Package</span>
                <span className="font-medium">{memberData.package}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Fee</span>
                <span className="font-medium">${memberData.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">{memberData.startDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Expiry Date</span>
                <span className="font-medium">{memberData.expiryDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status</span>
                <Badge className={getStatusColor(memberData.feeStatus)}>
                  {memberData.feeStatus}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Payment</span>
                <span className="font-medium">{memberData.nextPaymentDate}</span>
              </div>
              {memberData.feeStatus !== 'Paid' && (
                <Button onClick={handlePayment} className="w-full mt-4">
                  Pay Now
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Monthly Visits Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{stat.month}</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(stat.visits / 25) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium w-8">{stat.visits}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Attendance</CardTitle>
              <Link to="/body-tracker">
                <Button variant="outline">Track Progress</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Check In</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Check Out</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttendance.map((record, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{record.date}</td>
                      <td className="py-3 px-4 text-gray-600">{record.checkIn}</td>
                      <td className="py-3 px-4 text-gray-600">{record.checkOut}</td>
                      <td className="py-3 px-4 text-gray-600">{record.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border-dashed border-2 hover:border-blue-500 transition-colors cursor-pointer">
            <Activity className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Body Tracker</h3>
            <p className="text-gray-600 text-sm">Track your fitness progress and measurements</p>
          </Card>
          
          <Card className="p-6 text-center border-dashed border-2 hover:border-purple-500 transition-colors cursor-pointer">
            <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Book Session</h3>
            <p className="text-gray-600 text-sm">Schedule personal training sessions</p>
          </Card>
          
          <Card className="p-6 text-center border-dashed border-2 hover:border-green-500 transition-colors cursor-pointer">
            <CreditCard className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment History</h3>
            <p className="text-gray-600 text-sm">View your payment history and receipts</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
