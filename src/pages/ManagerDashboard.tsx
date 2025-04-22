
import React from 'react';
import Navigation from '@/components/layout/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTab from '@/components/manager-dashboard/ProjectsTab';
import CreatorsTab from '@/components/manager-dashboard/CreatorsTab';
import PaymentsTab from '@/components/manager-dashboard/PaymentsTab';
import { useMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

const ManagerDashboard = () => {
  const isMobile = useMobile('md');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4 sm:mb-6">Manager Dashboard</h1>
        
        <Tabs defaultValue="projects" className="w-full">
          {isMobile ? (
            <ScrollArea className="w-full mb-4 pb-2">
              <TabsList className="bg-white rounded-lg border border-gray-200 inline-flex w-auto px-1 h-10">
                <TabsTrigger value="projects" className="data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary whitespace-nowrap">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="creators" className="data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary whitespace-nowrap">
                  Creators
                </TabsTrigger>
                <TabsTrigger value="payments" className="data-[state=active]:text-brand-primary data-[state=active]:border-b-2 data-[state=active]:border-brand-primary whitespace-nowrap">
                  Payments & Deliverables
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          ) : (
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
          )}

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
