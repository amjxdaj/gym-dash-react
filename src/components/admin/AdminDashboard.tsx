
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Calendar, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  // Mock data
  const stats = [
    { 
      title: 'Active Members', 
      value: '156', 
      change: '+12%', 
      changeType: 'increase',
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Fees Pending', 
      value: '$2,340', 
      change: '-8%', 
      changeType: 'decrease',
      icon: CreditCard, 
      color: 'bg-orange-500' 
    },
    { 
      title: 'Expired Memberships', 
      value: '23', 
      change: '+5%', 
      changeType: 'increase',
      icon: Calendar, 
      color: 'bg-red-500' 
    },
    { 
      title: 'Monthly Income', 
      value: '$18,750', 
      change: '+15%', 
      changeType: 'increase',
      icon: DollarSign, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Monthly Expense', 
      value: '$8,200', 
      change: '+3%', 
      changeType: 'increase',
      icon: TrendingDown, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Net Profit', 
      value: '$10,550', 
      change: '+25%', 
      changeType: 'increase',
      icon: TrendingUp, 
      color: 'bg-emerald-500' 
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 15000, expense: 8000 },
    { month: 'Feb', revenue: 16200, expense: 7800 },
    { month: 'Mar', revenue: 17800, expense: 8200 },
    { month: 'Apr', revenue: 18200, expense: 8500 },
    { month: 'May', revenue: 18750, expense: 8200 },
    { month: 'Jun', revenue: 19200, expense: 8100 },
  ];

  const membershipData = [
    { name: 'Active', value: 156, color: '#3B82F6' },
    { name: 'Expired', value: 23, color: '#EF4444' },
    { name: 'Pending', value: 12, color: '#F59E0B' },
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 89 },
    { day: 'Tue', attendance: 76 },
    { day: 'Wed', attendance: 92 },
    { day: 'Thu', attendance: 85 },
    { day: 'Fri', attendance: 78 },
    { day: 'Sat', attendance: 95 },
    { day: 'Sun', attendance: 68 },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your gym today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue vs Expense */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'Revenue' : 'Expense']}
                    />
                    <Bar dataKey="revenue" fill="#3B82F6" name="revenue" />
                    <Bar dataKey="expense" fill="#EF4444" name="expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Membership Status */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {membershipData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} members`, 'Attendance']} />
                  <Bar dataKey="attendance" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New member registration', member: 'John Smith', time: '5 minutes ago', type: 'success' },
                  { action: 'Payment received', member: 'Sarah Johnson', time: '12 minutes ago', type: 'success' },
                  { action: 'Membership expired', member: 'Mike Wilson', time: '1 hour ago', type: 'warning' },
                  { action: 'Check-in', member: 'Emily Davis', time: '2 hours ago', type: 'info' },
                  { action: 'Payment overdue', member: 'Chris Brown', time: '3 hours ago', type: 'error' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.member}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
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

export default AdminDashboard;
