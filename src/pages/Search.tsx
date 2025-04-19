
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchViewToggle } from "@/components/search/SearchViewToggle";

const Search = () => {
  const [view, setView] = useState<"creators" | "services">("creators");

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white font-jakarta">
            {view === "creators" ? "Find Creators" : "Browse Services"}
          </h1>
          <SearchViewToggle view={view} onViewChange={setView} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <SearchFilters view={view} />
            </div>
          </div>
          
          <div className="flex-1">
            <SearchResults view={view} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
