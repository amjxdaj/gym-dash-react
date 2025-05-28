
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarIcon, ArrowLeft, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const BodyTracker = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    weight: '',
    waist: '',
    arm: '',
    chest: '',
  });

  // Mock progress data
  const progressData = [
    { date: '2024-09-01', weight: 180, waist: 34, arm: 14, chest: 42 },
    { date: '2024-09-15', weight: 178, waist: 33.5, arm: 14.2, chest: 42.5 },
    { date: '2024-10-01', weight: 176, waist: 33, arm: 14.5, chest: 43 },
    { date: '2024-10-15', weight: 174, waist: 32.5, arm: 14.8, chest: 43.5 },
    { date: '2024-11-01', weight: 172, waist: 32, arm: 15, chest: 44 },
    { date: '2024-11-15', weight: 170, waist: 31.5, arm: 15.2, chest: 44.5 },
  ];

  const latestEntry = progressData[progressData.length - 1];
  const previousEntry = progressData[progressData.length - 2];

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    return {
      value: Math.abs(change),
      isIncrease: change > 0,
      percentage: ((change / previous) * 100).toFixed(1)
    };
  };

  const weightChange = calculateChange(latestEntry.weight, previousEntry.weight);
  const waistChange = calculateChange(latestEntry.waist, previousEntry.waist);
  const armChange = calculateChange(latestEntry.arm, previousEntry.arm);
  const chestChange = calculateChange(latestEntry.chest, previousEntry.chest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.weight || !formData.waist || !formData.arm || !formData.chest) {
      toast.error('Please fill in all measurements');
      return;
    }

    toast.success('Measurements recorded successfully!');
    setFormData({ weight: '', waist: '', arm: '', chest: '' });
  };

  const StatCard = ({ title, value, unit, change, isGoodIncrease }: {
    title: string;
    value: number;
    unit: string;
    change: { value: number; isIncrease: boolean; percentage: string };
    isGoodIncrease: boolean;
  }) => {
    const isGoodChange = isGoodIncrease ? change.isIncrease : !change.isIncrease;
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {value} <span className="text-sm font-normal text-gray-600">{unit}</span>
              </p>
              <div className="flex items-center mt-2">
                {change.isIncrease ? (
                  <TrendingUp className={`w-4 h-4 mr-1 ${isGoodChange ? 'text-green-600' : 'text-red-600'}`} />
                ) : (
                  <TrendingDown className={`w-4 h-4 mr-1 ${isGoodChange ? 'text-green-600' : 'text-red-600'}`} />
                )}
                <span className={`text-sm font-medium ${isGoodChange ? 'text-green-600' : 'text-red-600'}`}>
                  {change.value} ({change.percentage}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/member-dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">Body Tracker</h1>
              <p className="text-gray-600">Track your fitness progress over time</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Weight" 
            value={latestEntry.weight} 
            unit="lbs" 
            change={weightChange}
            isGoodIncrease={false}
          />
          <StatCard 
            title="Waist" 
            value={latestEntry.waist} 
            unit="inches" 
            change={waistChange}
            isGoodIncrease={false}
          />
          <StatCard 
            title="Arm" 
            value={latestEntry.arm} 
            unit="inches" 
            change={armChange}
            isGoodIncrease={true}
          />
          <StatCard 
            title="Chest" 
            value={latestEntry.chest} 
            unit="inches" 
            change={chestChange}
            isGoodIncrease={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add New Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Record New Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                </div>

                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <Label htmlFor="waist">Waist (inches)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    value={formData.waist}
                    onChange={(e) => setFormData(prev => ({ ...prev, waist: e.target.value }))}
                    placeholder="Enter waist measurement"
                  />
                </div>

                <div>
                  <Label htmlFor="arm">Arm (inches)</Label>
                  <Input
                    id="arm"
                    type="number"
                    step="0.1"
                    value={formData.arm}
                    onChange={(e) => setFormData(prev => ({ ...prev, arm: e.target.value }))}
                    placeholder="Enter arm measurement"
                  />
                </div>

                <div>
                  <Label htmlFor="chest">Chest (inches)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    value={formData.chest}
                    onChange={(e) => setFormData(prev => ({ ...prev, chest: e.target.value }))}
                    placeholder="Enter chest measurement"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Record Measurements
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Progress Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weight Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                      />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        labelFormatter={(value) => format(new Date(value), 'PPP')}
                        formatter={(value) => [`${value} lbs`, 'Weight']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        dot={{ fill: '#EF4444' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Body Measurements */}
            <Card>
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => format(new Date(value), 'PPP')}
                        formatter={(value, name) => [`${value}"`, name === 'waist' ? 'Waist' : name === 'arm' ? 'Arm' : 'Chest']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="waist" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        name="waist"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="arm" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="arm"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="chest" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="chest"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Measurement History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Weight (lbs)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Waist (in)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Arm (in)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Chest (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.slice().reverse().map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{format(new Date(entry.date), 'MMM dd, yyyy')}</td>
                      <td className="py-3 px-4">{entry.weight}</td>
                      <td className="py-3 px-4">{entry.waist}</td>
                      <td className="py-3 px-4">{entry.arm}</td>
                      <td className="py-3 px-4">{entry.chest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BodyTracker;
