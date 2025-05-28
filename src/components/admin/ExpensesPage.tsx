
import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Plus, DollarSign, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ExpensesPage = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    notes: '',
  });

  const categories = [
    'Equipment',
    'Maintenance',
    'Utilities',
    'Staff Salary',
    'Rent',
    'Insurance',
    'Marketing',
    'Supplies',
    'Other',
  ];

  // Mock expenses data
  const expenses = [
    {
      id: '1',
      date: '2024-11-25',
      category: 'Equipment',
      amount: 1200,
      description: 'New treadmill purchase',
      notes: 'ProForm HIIT Trainer',
    },
    {
      id: '2',
      date: '2024-11-24',
      category: 'Utilities',
      amount: 450,
      description: 'Monthly electricity bill',
      notes: 'November 2024',
    },
    {
      id: '3',
      date: '2024-11-23',
      category: 'Staff Salary',
      amount: 3200,
      description: 'Personal trainer salary',
      notes: 'John - November payment',
    },
    {
      id: '4',
      date: '2024-11-22',
      category: 'Maintenance',
      amount: 280,
      description: 'Air conditioning service',
      notes: 'Annual maintenance',
    },
    {
      id: '5',
      date: '2024-11-20',
      category: 'Supplies',
      amount: 150,
      description: 'Cleaning supplies and towels',
      notes: 'Monthly stock',
    },
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentMonth = new Date().getMonth();
    return expenseDate.getMonth() === currentMonth;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Expense added successfully!');
    setShowAddExpense(false);
    setFormData({ category: '', amount: '', description: '', notes: '' });
  };

  const handleDelete = (id: string) => {
    toast.success('Expense deleted successfully!');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Equipment': 'bg-blue-100 text-blue-800',
      'Maintenance': 'bg-orange-100 text-orange-800',
      'Utilities': 'bg-yellow-100 text-yellow-800',
      'Staff Salary': 'bg-green-100 text-green-800',
      'Rent': 'bg-purple-100 text-purple-800',
      'Insurance': 'bg-red-100 text-red-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Supplies': 'bg-gray-100 text-gray-800',
      'Other': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600 mt-1">Track and manage gym expenses</p>
          </div>
          <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
            <DialogTrigger asChild>
              <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Add Expense</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddExpense(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-red-500 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">${monthlyExpenses.toLocaleString()}</p>
                  <p className="text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
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
                  <p className="text-2xl font-bold text-gray-900">${(monthlyExpenses / 30).toFixed(0)}</p>
                  <p className="text-gray-600">Daily Average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expenses List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                              {expense.category}
                            </span>
                            <span className="ml-3 text-sm text-gray-600">{expense.date}</span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{expense.description}</h4>
                          {expense.notes && (
                            <p className="text-sm text-gray-600 mb-2">{expense.notes}</p>
                          )}
                          <p className="text-lg font-bold text-gray-900">${expense.amount.toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDelete(expense.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryTotals)
                    .sort(([,a], [,b]) => b - a)
                    .map(([category, total]) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                          {category}
                        </span>
                      </div>
                      <span className="font-medium">${total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ExpensesPage;
