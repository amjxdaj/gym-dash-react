
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const ReportsPage = () => {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 15000, expense: 8000, members: 120 },
    { month: 'Feb', revenue: 16200, expense: 7800, members: 135 },
    { month: 'Mar', revenue: 17800, expense: 8200, members: 148 },
    { month: 'Apr', revenue: 18200, expense: 8500, members: 152 },
    { month: 'May', revenue: 18750, expense: 8200, members: 156 },
    { month: 'Jun', revenue: 19200, expense: 8100, members: 162 },
  ];

  const memberGrowth = [
    { month: 'Jan', newMembers: 15, cancelledMembers: 8 },
    { month: 'Feb', newMembers: 22, cancelledMembers: 7 },
    { month: 'Mar', newMembers: 18, cancelledMembers: 5 },
    { month: 'Apr', newMembers: 12, cancelledMembers: 8 },
    { month: 'May', newMembers: 16, cancelledMembers: 12 },
    { month: 'Jun', newMembers: 20, cancelledMembers: 14 },
  ];

  const membershipStatus = [
    { name: 'Active', value: 156, color: '#3B82F6' },
    { name: 'Expired', value: 23, color: '#EF4444' },
    { name: 'Pending', value: 12, color: '#F59E0B' },
    { name: 'Cancelled', value: 8, color: '#6B7280' },
  ];

  const packageDistribution = [
    { name: 'Basic', value: 45, color: '#10B981' },
    { name: 'Standard', value: 67, color: '#8B5CF6' },
    { name: 'Premium', value: 44, color: '#F59E0B' },
  ];

  const attendanceTrends = [
    { day: 'Mon', attendance: 89, capacity: 120 },
    { day: 'Tue', attendance: 76, capacity: 120 },
    { day: 'Wed', attendance: 92, capacity: 120 },
    { day: 'Thu', attendance: 85, capacity: 120 },
    { day: 'Fri', attendance: 78, capacity: 120 },
    { day: 'Sat', attendance: 95, capacity: 120 },
    { day: 'Sun', attendance: 68, capacity: 120 },
  ];

  const handleExport = (type: string) => {
    toast.success(`${type} report exported successfully!`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into your gym performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => handleExport('Revenue')}
            className="flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Revenue CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('Members')}
            className="flex items-center justify-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Members PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('Attendance')}
            className="flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Attendance CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('Full')}
            className="flex items-center justify-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Full Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">$19,200</p>
                <p className="text-gray-600">Monthly Revenue</p>
                <p className="text-sm text-green-600 mt-1">+8% from last month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">162</p>
                <p className="text-gray-600">Active Members</p>
                <p className="text-sm text-blue-600 mt-1">+6 new this month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">84%</p>
                <p className="text-gray-600">Retention Rate</p>
                <p className="text-sm text-purple-600 mt-1">+2% improvement</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">$11,100</p>
                <p className="text-gray-600">Net Profit</p>
                <p className="text-sm text-orange-600 mt-1">+12% increase</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue vs Expense */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expense Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'Revenue' : 'Expense']} />
                    <Bar dataKey="revenue" fill="#3B82F6" name="revenue" />
                    <Bar dataKey="expense" fill="#EF4444" name="expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Member Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Member Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={memberGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="newMembers" stroke="#10B981" strokeWidth={2} name="New Members" />
                    <Line type="monotone" dataKey="cancelledMembers" stroke="#EF4444" strokeWidth={2} name="Cancelled" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Membership Status */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipStatus}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {membershipStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Package Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Package Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={packageDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {packageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {packageDistribution.map((pkg, index) => (
                  <div key={pkg.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: pkg.color }} />
                      <span className="font-medium">{pkg.name} Package</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{pkg.value} members</p>
                      <p className="text-sm text-gray-600">{((pkg.value / 156) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peak Hours Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '6:00 - 8:00 AM', usage: 85, members: 34 },
                  { time: '8:00 - 10:00 AM', usage: 92, members: 37 },
                  { time: '5:00 - 7:00 PM', usage: 95, members: 38 },
                  { time: '7:00 - 9:00 PM', usage: 88, members: 35 },
                ].map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{slot.time}</span>
                    <div className="text-right">
                      <p className="font-bold">{slot.usage}% capacity</p>
                      <p className="text-sm text-gray-600">{slot.members} avg members</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
