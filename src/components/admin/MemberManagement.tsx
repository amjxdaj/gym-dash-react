
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Phone, User } from 'lucide-react';
import { toast } from 'sonner';

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPackage, setFilterPackage] = useState('all');

  // Mock data
  const members = [
    {
      id: '1',
      name: 'John Smith',
      phone: '+1-555-0123',
      package: 'Premium',
      amount: 99,
      startDate: '2024-01-15',
      expiryDate: '2024-12-15',
      feeStatus: 'Paid',
      attendance: 85,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1-555-0124',
      package: 'Basic',
      amount: 49,
      startDate: '2024-02-01',
      expiryDate: '2024-11-01',
      feeStatus: 'Pending',
      attendance: 72,
      status: 'Active',
    },
    {
      id: '3',
      name: 'Mike Wilson',
      phone: '+1-555-0125',
      package: 'Premium',
      amount: 99,
      startDate: '2023-12-01',
      expiryDate: '2024-11-01',
      feeStatus: 'Overdue',
      attendance: 45,
      status: 'Expired',
    },
    {
      id: '4',
      name: 'Emily Davis',
      phone: '+1-555-0126',
      package: 'Standard',
      amount: 69,
      startDate: '2024-03-15',
      expiryDate: '2025-02-15',
      feeStatus: 'Paid',
      attendance: 92,
      status: 'Active',
    },
    {
      id: '5',
      name: 'Chris Brown',
      phone: '+1-555-0127',
      package: 'Basic',
      amount: 49,
      startDate: '2024-01-01',
      expiryDate: '2024-12-01',
      feeStatus: 'Overdue',
      attendance: 38,
      status: 'Active',
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || member.status.toLowerCase() === filterStatus;
    const matchesPackage = filterPackage === 'all' || member.package.toLowerCase() === filterPackage;
    
    return matchesSearch && matchesStatus && matchesPackage;
  });

  const handleMarkAsPaid = (memberId: string, memberName: string) => {
    toast.success(`${memberName}'s payment marked as paid!`);
  };

  const handleSendWhatsApp = (phone: string, memberName: string) => {
    const message = encodeURIComponent(`Hi ${memberName}, this is a reminder about your gym membership fee. Please contact us for more details.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFeeStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
            <p className="text-gray-600 mt-1">Manage your gym members and their memberships</p>
          </div>
          <Link to="/members/add">
            <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPackage} onValueChange={setFilterPackage}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Packages</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterPackage('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Members ({filteredMembers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Member</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Package</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Expiry Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Fee Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Attendance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{member.package}</p>
                          <p className="text-sm text-gray-600">${member.amount}/month</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900">{member.expiryDate}</p>
                      </td>
                      <td className="py-4 px-4">
                        {getFeeStatusBadge(member.feeStatus)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${getAttendanceColor(member.attendance)}`}>
                          {member.attendance}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(member.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Link to={`/members/edit/${member.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          {member.feeStatus !== 'Paid' && (
                            <Button
                              size="sm"
                              onClick={() => handleMarkAsPaid(member.id, member.name)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark Paid
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendWhatsApp(member.phone, member.name)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCall(member.phone)}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default MemberManagement;
