
import React from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsTab from '@/components/creator-dashboard/BookingsTab';
import PortfolioTab from '@/components/creator-dashboard/PortfolioTab';
import AvailabilityTab from '@/components/creator-dashboard/AvailabilityTab';
import ApplicationsTab from '@/components/creator-dashboard/ApplicationsTab';
import EarningsTab from '@/components/creator-dashboard/EarningsTab';

const CreatorDashboard = () => {
  return (
    <DashboardShell title="Creator Dashboard">
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
    </DashboardShell>
  );
};

export default CreatorDashboard;
