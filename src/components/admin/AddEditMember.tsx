
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const AddEditMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    package: '',
    startDate: new Date(),
    bloodGroup: '',
    healthNotes: '',
  });

  const [expiryDate, setExpiryDate] = useState<Date>();

  const packages = [
    { name: 'Basic', amount: 49, duration: 30 },
    { name: 'Standard', amount: 69, duration: 60 },
    { name: 'Premium', amount: 99, duration: 90 },
    { name: 'Annual', amount: 799, duration: 365 },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    if (isEditing) {
      // Mock data for editing
      setFormData({
        fullName: 'John Smith',
        age: '28',
        gender: 'male',
        phone: '+1-555-0123',
        address: '123 Main St, Anytown, USA',
        package: 'Premium',
        startDate: new Date('2024-01-15'),
        bloodGroup: 'O+',
        healthNotes: 'No known allergies. Previous knee injury.',
      });
    }
  }, [isEditing]);

  useEffect(() => {
    if (formData.package && formData.startDate) {
      const selectedPackage = packages.find(pkg => pkg.name === formData.package);
      if (selectedPackage) {
        const expiry = new Date(formData.startDate);
        expiry.setDate(expiry.getDate() + selectedPackage.duration);
        setExpiryDate(expiry);
      }
    }
  }, [formData.package, formData.startDate]);

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.package) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success(isEditing ? 'Member updated successfully!' : 'Member added successfully!');
    navigate('/members');
  };

  const selectedPackage = packages.find(pkg => pkg.name === formData.package);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Member' : 'Add New Member'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Update member information' : 'Add a new member to your gym'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1-555-0123"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Membership Details */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="package">Package *</Label>
                  <Select value={formData.package} onValueChange={(value) => handleInputChange('package', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.name} value={pkg.name}>
                          {pkg.name} - ${pkg.amount} ({pkg.duration} days)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPackage && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Package Details</h4>
                    <div className="text-sm text-blue-800">
                      <p>Amount: ${selectedPackage.amount}</p>
                      <p>Duration: {selectedPackage.duration} days</p>
                    </div>
                  </div>
                )}

                <div>
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && handleInputChange('startDate', date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Expiry Date</Label>
                  <Input
                    value={expiryDate ? format(expiryDate, "PPP") : ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="healthNotes">Health Notes</Label>
                <Textarea
                  id="healthNotes"
                  value={formData.healthNotes}
                  onChange={(e) => handleInputChange('healthNotes', e.target.value)}
                  placeholder="Any health conditions, allergies, or notes..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/members')}
              className="sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 sm:w-auto"
            >
              {isEditing ? 'Update Member' : 'Add Member'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddEditMember;
