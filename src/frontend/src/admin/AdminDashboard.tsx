import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import ContentBlocksSection from './sections/ContentBlocksSection';
import StaffSection from './sections/StaffSection';
import NoticesSection from './sections/NoticesSection';
import GallerySection from './sections/GallerySection';
import InquiriesSection from './sections/InquiriesSection';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your school website content</p>
        </div>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <ContentBlocksSection />
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <StaffSection />
        </TabsContent>

        <TabsContent value="notices" className="space-y-4">
          <NoticesSection />
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <GallerySection />
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <InquiriesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
