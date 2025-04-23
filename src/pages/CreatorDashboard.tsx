import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsTab from '@/components/creator-dashboard/BookingsTab';
import PortfolioTab from '@/components/creator-dashboard/PortfolioTab';
import AvailabilityTab from '@/components/creator-dashboard/AvailabilityTab';
import ApplicationsTab from '@/components/creator-dashboard/ApplicationsTab';
import EarningsTab from '@/components/creator-dashboard/EarningsTab';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const tabItems = [
  { id: 'bookings', label: 'Bookings' },
  { id: 'applications', label: 'Applications' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'availability', label: 'Availability' },
  { id: 'earnings', label: 'Earnings' },
];

const CreatorDashboard = () => {
  // State for active tab and visible tabs
  const [activeTab, setActiveTab] = useState('bookings');
  const isMobile = useIsMobile();
  
  // Calculate how many tabs can be shown based on screen size
  const [visibleTabCount, setVisibleTabCount] = useState(5);
  
  useEffect(() => {
    const updateVisibleTabCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleTabCount(2);
      } else if (width < 768) {
        setVisibleTabCount(3);
      } else if (width < 1024) {
        setVisibleTabCount(4);
      } else {
        setVisibleTabCount(5);
      }
    };
    
    updateVisibleTabCount();
    window.addEventListener('resize', updateVisibleTabCount);
    
    return () => window.removeEventListener('resize', updateVisibleTabCount);
  }, []);

  const [visibleTabsRange, setVisibleTabsRange] = useState({ 
    start: 0, 
    end: Math.min(visibleTabCount, tabItems.length) 
  });
  
  // Update visible range when visible tab count changes
  useEffect(() => {
    setVisibleTabsRange({
      start: 0,
      end: Math.min(visibleTabCount, tabItems.length)
    });
  }, [visibleTabCount]);

  // Scroll tabs left
  const scrollTabsLeft = () => {
    if (visibleTabsRange.start > 0) {
      setVisibleTabsRange({
        start: visibleTabsRange.start - 1,
        end: visibleTabsRange.end - 1,
      });
    }
  };

  // Scroll tabs right
  const scrollTabsRight = () => {
    if (visibleTabsRange.end < tabItems.length) {
      setVisibleTabsRange({
        start: visibleTabsRange.start + 1,
        end: visibleTabsRange.end + 1,
      });
    }
  };

  // Handle tab change - ensure active tab is visible
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Find the index of the new active tab
    const tabIndex = tabItems.findIndex(tab => tab.id === value);
    
    // If the active tab is outside the visible range, scroll to show it
    if (tabIndex < visibleTabsRange.start) {
      setVisibleTabsRange({
        start: tabIndex,
        end: tabIndex + visibleTabCount,
      });
    } else if (tabIndex >= visibleTabsRange.end) {
      setVisibleTabsRange({
        start: Math.max(0, tabIndex - visibleTabCount + 1),
        end: tabIndex + 1,
      });
    }
  };

  // Get visible tabs based on current range
  const visibleTabs = tabItems.slice(
    visibleTabsRange.start, 
    Math.min(visibleTabsRange.end, tabItems.length)
  );

  // Determine if we need scroll buttons
  const needsLeftScroll = visibleTabsRange.start > 0;
  const needsRightScroll = visibleTabsRange.end < tabItems.length;

  return (
    <DashboardShell 
      title="Creator Dashboard"
      subtitle="Manage your bookings, applications, and content portfolio"
    >
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex items-center mb-6">
          {/* Left scroll button */}
          {needsLeftScroll && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={scrollTabsLeft}
              className="h-9 w-9 rounded-full flex-shrink-0 mr-1"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          {/* Tabs list */}
          <TabsList className={cn(
            "bg-white rounded-lg border border-gray-200 h-auto flex-1",
            isMobile ? "justify-start overflow-x-auto" : "justify-center"
          )}>
            {visibleTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={cn(
                  "flex-none px-3 py-1.5 whitespace-nowrap transition-all",
                  isMobile ? "text-sm" : "text-base"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Right scroll button */}
          {needsRightScroll && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={scrollTabsRight}
              className="h-9 w-9 rounded-full flex-shrink-0 ml-1"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
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
        </div>
      </Tabs>
    </DashboardShell>
  );
};

export default CreatorDashboard;