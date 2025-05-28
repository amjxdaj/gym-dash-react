
import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Image as ImageIcon, Palette } from 'lucide-react';
import { toast } from 'sonner';

const PosterGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const templates = [
    {
      id: '1',
      name: 'Holiday Special',
      description: 'Perfect for seasonal promotions',
      preview: 'bg-gradient-to-br from-red-500 to-green-600',
      defaultMessage: '🎄 Holiday Special Offer! 50% OFF New Memberships - Limited Time Only!'
    },
    {
      id: '2',
      name: 'New Year Fitness',
      description: 'Motivational New Year design',
      preview: 'bg-gradient-to-br from-blue-600 to-purple-600',
      defaultMessage: '💪 New Year, New You! Join Now and Transform Your Life - 30% OFF!'
    },
    {
      id: '3',
      name: 'Summer Body',
      description: 'Summer fitness motivation',
      preview: 'bg-gradient-to-br from-orange-400 to-yellow-500',
      defaultMessage: '☀️ Get Your Summer Body Ready! Special Summer Package - Act Fast!'
    },
    {
      id: '4',
      name: 'Grand Opening',
      description: 'Perfect for gym launches',
      preview: 'bg-gradient-to-br from-purple-600 to-pink-600',
      defaultMessage: '🎉 Grand Opening! First 100 Members Get FREE Training Sessions!'
    },
    {
      id: '5',
      name: 'Fitness Challenge',
      description: 'Challenge and competition theme',
      preview: 'bg-gradient-to-br from-gray-800 to-gray-600',
      defaultMessage: '🏆 30-Day Fitness Challenge! Win Cash Prizes - Register Now!'
    },
    {
      id: '6',
      name: 'Member Appreciation',
      description: 'Thank your loyal members',
      preview: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      defaultMessage: '❤️ Thank You Members! Special Appreciation Week - Exclusive Benefits!'
    },
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setCustomMessage(template.defaultMessage);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      toast.success('Logo uploaded successfully!');
    }
  };

  const handleDownload = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template first');
      return;
    }
    if (!customMessage) {
      toast.error('Please add a message');
      return;
    }
    toast.success('Poster downloaded successfully!');
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Poster Generator</h1>
          <p className="text-gray-600 mt-1">Create stunning promotional posters for your gym</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className={`w-full h-32 rounded-lg mb-3 ${template.preview} flex items-center justify-center`}>
                        <div className="text-white text-center">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">Preview</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customization */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Customize Your Poster</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <Label htmlFor="logo">Gym Logo</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="h-24 object-contain" />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> your gym logo
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                          </div>
                        )}
                        <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Custom Message */}
                <div>
                  <Label htmlFor="message">Poster Message</Label>
                  <Textarea
                    id="message"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Enter your promotional message..."
                    rows={4}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Tip: Use emojis and exciting language to make your poster more engaging!
                  </p>
                </div>

                {/* Color Customization */}
                <div>
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-6 gap-2 mt-2">
                    {[
                      'bg-red-500',
                      'bg-blue-500',
                      'bg-green-500',
                      'bg-purple-500',
                      'bg-orange-500',
                      'bg-pink-500',
                    ].map((color, index) => (
                      <div
                        key={index}
                        className={`w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-400 ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTemplateData ? (
                  <div className={`w-full aspect-square rounded-lg ${selectedTemplateData.preview} p-6 text-white flex flex-col justify-between`}>
                    {/* Logo */}
                    <div className="text-center">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="h-16 mx-auto mb-4 bg-white/20 rounded-lg p-2" />
                      ) : (
                        <div className="h-16 w-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      <h2 className="text-lg font-bold">Your Gym Name</h2>
                    </div>

                    {/* Message */}
                    <div className="text-center">
                      <p className="text-sm leading-relaxed">
                        {customMessage || 'Your promotional message will appear here...'}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs opacity-90">
                      <p>Visit us today!</p>
                      <p>www.yourgym.com | (555) 123-4567</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Palette className="w-12 h-12 mx-auto mb-4" />
                      <p>Select a template to preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button 
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!selectedTemplate || !customMessage}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Poster
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Save Draft
                    </Button>
                    <Button variant="outline" size="sm">
                      Share Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 text-sm">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800">
                <ul className="space-y-2">
                  <li>• Use clear, bold text for maximum impact</li>
                  <li>• Include your contact information</li>
                  <li>• Add urgency with "Limited Time" offers</li>
                  <li>• Use high-contrast colors for readability</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PosterGenerator;
