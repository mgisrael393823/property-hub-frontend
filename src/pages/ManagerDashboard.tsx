
import React from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTab from '@/components/manager-dashboard/ProjectsTab';
import CreatorsTab from '@/components/manager-dashboard/CreatorsTab';
import PaymentsTab from '@/components/manager-dashboard/PaymentsTab';

const ManagerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-6">Manager Dashboard</h1>
        
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-6 bg-white rounded-lg border border-gray-200">
            <TabsTrigger value="projects" className="data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
              Projects
            </TabsTrigger>
            <TabsTrigger value="creators" className="data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
              Creators
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary">
              Payments & Deliverables
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>

          <TabsContent value="creators">
            <CreatorsTab />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
