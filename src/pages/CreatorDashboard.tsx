
import React from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsTab from '@/components/creator-dashboard/BookingsTab';
import PortfolioTab from '@/components/creator-dashboard/PortfolioTab';
import AvailabilityTab from '@/components/creator-dashboard/AvailabilityTab';
import ApplicationsTab from '@/components/creator-dashboard/ApplicationsTab';
import EarningsTab from '@/components/creator-dashboard/EarningsTab';

const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-6">Creator Dashboard</h1>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-6 bg-white rounded-lg border border-gray-200">
            <TabsTrigger value="bookings">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="applications">
              Applications
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="availability">
              Availability
            </TabsTrigger>
            <TabsTrigger value="earnings">
              Earnings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsTab />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioTab />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityTab />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;
