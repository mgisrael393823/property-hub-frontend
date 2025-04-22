
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchViewToggle } from "@/components/search/SearchViewToggle";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Search = () => {
  const [view, setView] = useState<"creators" | "services">("creators");
  const isMobile = useMobile('lg');
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-heading">
            {view === "creators" ? "Find Creators" : "Browse Services"}
          </h1>
          <div className="flex items-center gap-2">
            {isMobile && (
              <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-2">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="px-4 max-h-[85vh]">
                  <DrawerHeader className="px-0">
                    <DrawerTitle>Search Filters</DrawerTitle>
                  </DrawerHeader>
                  <div className="overflow-y-auto pb-4">
                    <SearchFilters view={view} />
                  </div>
                  <DrawerFooter className="px-0">
                    <DrawerClose asChild>
                      <Button className="w-full">Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
            <SearchViewToggle view={view} onViewChange={setView} />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {!isMobile && (
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-8">
                <SearchFilters view={view} />
              </div>
            </div>
          )}
          
          <div className="flex-1">
            <SearchResults view={view} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
