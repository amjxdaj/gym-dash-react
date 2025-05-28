
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Calendar, CreditCard, Plus, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [showAddGym, setShowAddGym] = useState(false);

  // Mock data for gym owner
  const stats = [
    { title: 'Total Gyms', value: '3', icon: Building2, color: 'bg-blue-500' },
    { title: 'Active Subscriptions', value: '2', icon: CreditCard, color: 'bg-green-500' },
    { title: 'Expired Subscriptions', value: '1', icon: Calendar, color: 'bg-red-500' },
    { title: 'Total Members', value: '247', icon: Users, color: 'bg-purple-500' },
  ];

  const gyms = [
    {
      id: '1',
      name: 'FitZone Downtown',
      location: '123 Main St, Downtown',
      members: 89,
      subscription: 'Pro',
      status: 'Active',
      expiryDate: '2024-12-15',
    },
    {
      id: '2',
      name: 'PowerGym North',
      location: '456 Oak Ave, North Side',
      members: 156,
      subscription: 'Basic',
      status: 'Active',
      expiryDate: '2024-11-30',
    },
    {
      id: '3',
      name: 'Elite Fitness',
      location: '789 Pine St, West End',
      members: 2,
      subscription: 'Free Trial',
      status: 'Expired',
      expiryDate: '2024-10-01',
    },
  ];

  const handleRenewSubscription = (gymId: string) => {
    toast.success('Subscription renewed successfully!');
  };

  const handleUpgradePlan = (gymId: string) => {
    toast.info('Redirecting to upgrade page...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Add New Gym Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAddGym(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Gym
          </Button>
        </div>

        {/* Gyms List */}
        <Card>
          <CardHeader>
            <CardTitle>My Gyms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gyms.map((gym) => (
                <div
                  key={gym.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">
                          {gym.name}
                        </h3>
                        <Badge
                          variant={gym.status === 'Active' ? 'default' : 'destructive'}
                        >
                          {gym.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{gym.location}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Members:</span>
                          <span className="ml-1 font-medium">{gym.members}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Plan:</span>
                          <span className="ml-1 font-medium">{gym.subscription}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <span className="ml-1 font-medium">{gym.expiryDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span
                            className={`ml-1 font-medium ${
                              gym.status === 'Active' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {gym.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-2">
                      {gym.status === 'Expired' ? (
                        <Button
                          onClick={() => handleRenewSubscription(gym.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Renew Subscription
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => handleUpgradePlan(gym.id)}
                          >
                            Upgrade Plan
                          </Button>
                          <Button variant="outline">Manage Gym</Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center border-dashed border-2 hover:border-blue-500 transition-colors cursor-pointer">
            <Building2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Add New Location</h3>
            <p className="text-gray-600 text-sm">Expand your gym business with a new location</p>
          </Card>
          
          <Card className="p-6 text-center border-dashed border-2 hover:border-purple-500 transition-colors cursor-pointer">
            <CreditCard className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Billing Center</h3>
            <p className="text-gray-600 text-sm">View invoices and manage payments</p>
          </Card>
          
          <Card className="p-6 text-center border-dashed border-2 hover:border-green-500 transition-colors cursor-pointer">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Support Center</h3>
            <p className="text-gray-600 text-sm">Get help and support for your gyms</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
