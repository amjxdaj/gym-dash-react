
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Phone, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock member data
  const members = [
    {
      id: 1,
      name: 'John Smith',
      phone: '+1234567890',
      package: 'Premium',
      amount: 99,
      startDate: '2024-01-15',
      expiryDate: '2024-12-15',
      feeStatus: 'Paid',
      attendance: 85,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      phone: '+1234567891',
      package: 'Basic',
      amount: 49,
      startDate: '2024-02-01',
      expiryDate: '2024-11-01',
      feeStatus: 'Pending',
      attendance: 72,
    },
    {
      id: 3,
      name: 'Mike Wilson',
      phone: '+1234567892',
      package: 'Standard',
      amount: 69,
      startDate: '2024-01-01',
      expiryDate: '2024-10-01',
      feeStatus: 'Overdue',
      attendance: 45,
    },
    {
      id: 4,
      name: 'Emily Davis',
      phone: '+1234567893',
      package: 'Premium',
      amount: 99,
      startDate: '2024-03-01',
      expiryDate: '2025-01-01',
      feeStatus: 'Paid',
      attendance: 92,
    },
    {
      id: 5,
      name: 'Chris Brown',
      phone: '+1234567894',
      package: 'Basic',
      amount: 49,
      startDate: '2024-02-15',
      expiryDate: '2024-11-15',
      feeStatus: 'Pending',
      attendance: 68,
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || member.feeStatus.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 80) return 'text-green-600';
    if (attendance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleMarkAsPaid = (memberId: number, memberName: string) => {
    toast.success(`${memberName} marked as paid successfully!`);
  };

  const handleWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Hi ${name}, this is a reminder about your gym membership payment.`);
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
            <p className="text-gray-600 mt-1">Manage your gym members and their subscriptions</p>
          </div>
          <Link to="/members/add">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'paid' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('paid')}
                  size="sm"
                >
                  Paid
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={filterStatus === 'overdue' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('overdue')}
                  size="sm"
                >
                  Overdue
                </Button>
              </div>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Package</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Expiry Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Fee Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Attendance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.phone}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">{member.package}</div>
                          <div className="text-sm text-gray-600">${member.amount}/month</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div>{member.expiryDate}</div>
                          <div className="text-gray-600">Started: {member.startDate}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(member.feeStatus)}>
                          {member.feeStatus}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${getAttendanceColor(member.attendance)}`}>
                          {member.attendance}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Link to={`/members/edit/${member.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          
                          {member.feeStatus !== 'Paid' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsPaid(member.id, member.name)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWhatsApp(member.phone, member.name)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCall(member.phone)}
                            className="text-blue-600 hover:text-blue-700"
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

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No members found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default MemberManagement;
