
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

const ReportsPage = () => {
  // Mock data for reports
  const monthlyRevenue = [
    { month: 'Jan', revenue: 15000, expense: 8000, members: 120 },
    { month: 'Feb', revenue: 16200, expense: 7800, members: 135 },
    { month: 'Mar', revenue: 17800, expense: 8200, members: 148 },
    { month: 'Apr', revenue: 18200, expense: 8500, members: 156 },
    { month: 'May', revenue: 18750, expense: 8200, members: 162 },
    { month: 'Jun', revenue: 19200, expense: 8100, members: 168 },
    { month: 'Jul', revenue: 20100, expense: 8300, members: 175 },
    { month: 'Aug', revenue: 21500, expense: 8600, members: 182 },
    { month: 'Sep', revenue: 22200, expense: 8400, members: 189 },
    { month: 'Oct', revenue: 23100, expense: 8700, members: 195 },
    { month: 'Nov', revenue: 24000, expense: 8900, members: 201 },
  ];

  const membershipTypes = [
    { name: 'Basic', value: 45, amount: 2205, color: '#3B82F6' },
    { name: 'Standard', value: 78, amount: 5382, color: '#8B5CF6' },
    { name: 'Premium', value: 89, amount: 8811, color: '#10B981' },
  ];

  const attendanceTrends = [
    { day: 'Mon', attendance: 89, capacity: 100 },
    { day: 'Tue', attendance: 76, capacity: 100 },
    { day: 'Wed', attendance: 92, capacity: 100 },
    { day: 'Thu', attendance: 85, capacity: 100 },
    { day: 'Fri', attendance: 78, capacity: 100 },
    { day: 'Sat', attendance: 95, capacity: 100 },
    { day: 'Sun', attendance: 68, capacity: 100 },
  ];

  const ageDistribution = [
    { age: '18-25', count: 45, color: '#3B82F6' },
    { age: '26-35', count: 78, color: '#8B5CF6' },
    { age: '36-45', count: 56, color: '#10B981' },
    { age: '46-55', count: 23, color: '#F59E0B' },
    { age: '55+', count: 12, color: '#EF4444' },
  ];

  const handleExportCSV = () => {
    toast.success('CSV report downloaded successfully!');
  };

  const handleExportPDF = () => {
    toast.success('PDF report downloaded successfully!');
  };

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = monthlyRevenue.reduce((sum, month) => sum + month.expense, 0);
  const netProfit = totalRevenue - totalExpenses;
  const currentMembers = monthlyRevenue[monthlyRevenue.length - 1]?.members || 0;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive business insights and reports</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button onClick={handleExportPDF} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-500 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-red-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
                  <p className="text-gray-600">Total Expenses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">${netProfit.toLocaleString()}</p>
                  <p className="text-gray-600">Net Profit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{currentMembers}</p>
                  <p className="text-gray-600">Active Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue & Member Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'Revenue' : 'Expenses']} />
                    <Bar dataKey="revenue" fill="#3B82F6" name="revenue" />
                    <Bar dataKey="expense" fill="#EF4444" name="expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Member Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} members`, 'Members']} />
                    <Line type="monotone" dataKey="members" stroke="#8B5CF6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Membership Types & Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Membership Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {membershipTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {membershipTypes.map((type) => (
                  <div key={type.name} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }} />
                      <span>{type.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{type.value} members</div>
                      <div className="text-sm text-gray-600">${type.amount}/month</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#10B981" />
                    <Bar dataKey="capacity" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Age Distribution & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ageDistribution.map((age) => (
                  <div key={age.age} className="flex items-center justify-between">
                    <span className="text-gray-600">{age.age}</span>
                    <div className="flex items-center flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(age.count / 214) * 100}%`,
                            backgroundColor: age.color 
                          }}
                        />
                      </div>
                      <span className="ml-2 font-medium w-8">{age.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Revenue per Member</span>
                  <span className="font-bold text-lg">${(totalRevenue / currentMembers).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Retention Rate</span>
                  <span className="font-bold text-lg text-green-600">92%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Monthly Growth</span>
                  <span className="font-bold text-lg text-blue-600">8.5%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Capacity Utilization</span>
                  <span className="font-bold text-lg text-purple-600">84%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Margin</span>
                  <span className="font-bold text-lg text-green-600">
                    {((netProfit / totalRevenue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
