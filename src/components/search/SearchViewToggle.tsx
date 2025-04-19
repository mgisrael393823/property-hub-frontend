
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Users, Grid2X2 } from "lucide-react";

interface SearchViewToggleProps {
  view: "creators" | "services";
  onViewChange: (view: "creators" | "services") => void;
}

export function SearchViewToggle({ view, onViewChange }: SearchViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(value) => value && onViewChange(value as "creators" | "services")}
      className="border rounded-lg bg-white/5 p-1 border-white/10"
    >
      <ToggleGroupItem 
        value="creators" 
        className="flex items-center gap-2 text-gray-200 data-[state=on]:bg-brand-purple data-[state=on]:text-white hover:text-white"
      >
        <Users className="h-4 w-4" />
        Find Creators
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="services" 
        className="flex items-center gap-2 text-gray-200 data-[state=on]:bg-brand-purple data-[state=on]:text-white hover:text-white"
      >
        <Grid2X2 className="h-4 w-4" />
        Find Services
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
