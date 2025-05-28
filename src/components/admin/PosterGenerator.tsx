
import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, Image, Palette, Type } from 'lucide-react';
import { toast } from 'sonner';

const PosterGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [posterData, setPosterData] = useState({
    title: '',
    subtitle: '',
    offer: '',
    validUntil: '',
    contact: '',
  });

  const templates = [
    {
      id: 'eid-special',
      name: 'Eid Special Offer',
      preview: 'bg-gradient-to-br from-green-500 to-emerald-600',
      description: 'Perfect for Eid celebrations with Islamic patterns'
    },
    {
      id: 'new-year',
      name: 'New Year Fitness Goals',
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
      description: 'Motivational design for New Year resolutions'
    },
    {
      id: 'summer-beach',
      name: 'Summer Beach Body',
      preview: 'bg-gradient-to-br from-orange-400 to-pink-500',
      description: 'Vibrant summer theme for beach body goals'
    },
    {
      id: 'winter-strength',
      name: 'Winter Strength Training',
      preview: 'bg-gradient-to-br from-gray-600 to-blue-800',
      description: 'Dark, powerful theme for strength training'
    },
    {
      id: 'valentine-couple',
      name: 'Valentine\'s Couple Workout',
      preview: 'bg-gradient-to-br from-red-400 to-pink-600',
      description: 'Romantic theme for couple fitness programs'
    },
    {
      id: 'black-friday',
      name: 'Black Friday Sale',
      preview: 'bg-gradient-to-br from-black to-gray-800',
      description: 'Bold black theme for special sales'
    },
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedLogo(file);
      toast.success('Logo uploaded successfully!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPosterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreviewPoster = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template first');
      return;
    }
    toast.info('Poster preview updated!');
  };

  const handleDownloadPoster = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template and customize your poster');
      return;
    }
    toast.success('Poster downloaded as PNG!');
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Poster Generator</h1>
            <p className="text-gray-600 mt-1">Create stunning promotional posters for your gym</p>
          </div>
          <Button onClick={handleDownloadPoster} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Choose Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className={`${template.preview} h-24 rounded-t-lg flex items-center justify-center`}>
                        <Image className="w-8 h-8 text-white opacity-80" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm">{template.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Logo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Gym Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload" className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                      Click to upload logo
                    </Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-600">PNG, JPG up to 5MB</p>
                    {uploadedLogo && (
                      <p className="text-sm text-green-600 font-medium">
                        ✓ {uploadedLogo.name} uploaded
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Poster Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Poster Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Main Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={posterData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Eid Special Offer!"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    value={posterData.subtitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Join Now and Save Big"
                  />
                </div>

                <div>
                  <Label htmlFor="offer">Offer Details</Label>
                  <Textarea
                    id="offer"
                    name="offer"
                    value={posterData.offer}
                    onChange={handleInputChange}
                    placeholder="e.g., 50% Off First Month + Free Personal Training Session"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    name="validUntil"
                    type="date"
                    value={posterData.validUntil}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Information</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={posterData.contact}
                    onChange={handleInputChange}
                    placeholder="e.g., Call: +1234567890 | Visit: www.gym.com"
                  />
                </div>

                <Button onClick={handlePreviewPoster} className="w-full mt-4">
                  Update Preview
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Poster Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] border-2 border-gray-200 rounded-lg overflow-hidden">
                  {selectedTemplate ? (
                    <div className={`w-full h-full ${selectedTemplateData?.preview} relative flex flex-col justify-between p-6 text-white`}>
                      {/* Header with Logo */}
                      <div className="text-center">
                        {uploadedLogo ? (
                          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-sm font-bold">LOGO</span>
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Image className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Main Content */}
                      <div className="text-center flex-1 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold mb-2">
                          {posterData.title || 'Your Amazing Offer!'}
                        </h1>
                        <h2 className="text-lg mb-4 opacity-90">
                          {posterData.subtitle || 'Don\'t miss out on this deal'}
                        </h2>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                          <p className="text-sm leading-relaxed">
                            {posterData.offer || '50% Off First Month + Free Personal Training Session'}
                          </p>
                        </div>
                        {posterData.validUntil && (
                          <p className="text-sm opacity-75">
                            Valid until: {new Date(posterData.validUntil).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="text-center">
                        <p className="text-sm opacity-90">
                          {posterData.contact || 'Contact us for more details'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center text-gray-500">
                        <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Select a template to preview your poster</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setPosterData({
                        title: 'Eid Mubarak Special!',
                        subtitle: 'Celebrate with Fitness',
                        offer: '40% OFF all memberships + Free nutrition consultation',
                        validUntil: '2024-12-31',
                        contact: 'Call: +1234567890 | Visit: www.fitnessgym.com'
                      });
                      setSelectedTemplate('eid-special');
                    }}
                  >
                    Eid Special Template
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setPosterData({
                        title: 'New Year, New You!',
                        subtitle: 'Start Your Fitness Journey',
                        offer: 'Join now and get 3 months for the price of 2',
                        validUntil: '2024-12-31',
                        contact: 'Call: +1234567890 | Visit: www.fitnessgym.com'
                      });
                      setSelectedTemplate('new-year');
                    }}
                  >
                    New Year Template
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setPosterData({
                        title: 'Summer Body Ready?',
                        subtitle: 'Get Beach Ready',
                        offer: 'Summer Special: Personal trainer + nutrition plan included',
                        validUntil: '2024-12-31',
                        contact: 'Call: +1234567890 | Visit: www.fitnessgym.com'
                      });
                      setSelectedTemplate('summer-beach');
                    }}
                  >
                    Summer Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PosterGenerator;
