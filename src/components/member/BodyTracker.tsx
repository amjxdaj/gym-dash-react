
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, TrendingUp, Calendar, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const BodyTracker = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    waist: '',
    arm: '',
    chest: '',
  });

  // Mock historical data
  const progressData = [
    { date: '2024-01-15', weight: 75, waist: 32, arm: 14, chest: 40 },
    { date: '2024-02-15', weight: 73, waist: 31, arm: 14.5, chest: 41 },
    { date: '2024-03-15', weight: 72, waist: 30, arm: 15, chest: 42 },
    { date: '2024-04-15', weight: 71, waist: 29, arm: 15.5, chest: 42.5 },
    { date: '2024-05-15', weight: 70, waist: 28, arm: 16, chest: 43 },
    { date: '2024-06-15', weight: 69, waist: 27, arm: 16.5, chest: 43.5 },
  ];

  const recentEntries = [
    { date: '2024-11-25', weight: 69.5, waist: 27, arm: 16.8, chest: 44 },
    { date: '2024-11-18', weight: 70, waist: 27.5, arm: 16.5, chest: 43.5 },
    { date: '2024-11-11', weight: 70.2, waist: 28, arm: 16.3, chest: 43 },
    { date: '2024-11-04', weight: 70.5, waist: 28, arm: 16, chest: 42.8 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.weight || !formData.waist || !formData.arm || !formData.chest) {
      toast.error('Please fill in all measurements');
      return;
    }
    toast.success('Measurements saved successfully!');
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      waist: '',
      arm: '',
      chest: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link to="/member-dashboard" className="mr-4">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Body Progress Tracker</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Welcome, {user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add New Entry Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Add New Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 70.5"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="waist">Waist (inches)</Label>
                    <Input
                      id="waist"
                      name="waist"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 32.0"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="arm">Arm (inches)</Label>
                    <Input
                      id="arm"
                      name="arm"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 15.5"
                      value={formData.arm}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="chest">Chest (inches)</Label>
                    <Input
                      id="chest"
                      name="chest"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 42.0"
                      value={formData.chest}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEntries.map((entry, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {entry.date}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>Weight: {entry.weight}kg</div>
                        <div>Waist: {entry.waist}"</div>
                        <div>Arm: {entry.arm}"</div>
                        <div>Chest: {entry.chest}"</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weight Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Weight Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Body Measurements */}
            <Card>
              <CardHeader>
                <CardTitle>Body Measurements Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="waist" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        name="Waist"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="arm" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Arm"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="chest" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="Chest"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">-6kg</div>
                  <div className="text-sm text-gray-600">Weight Lost</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">-5"</div>
                  <div className="text-sm text-gray-600">Waist Reduced</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">+2.5"</div>
                  <div className="text-sm text-gray-600">Arm Growth</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">+3.5"</div>
                  <div className="text-sm text-gray-600">Chest Growth</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyTracker;
