
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
      className="border rounded-full bg-white p-1 border-border"
    >
      <ToggleGroupItem 
        value="creators" 
        className="flex items-center gap-2 text-text-secondary rounded-full data-[state=on]:bg-brand-primary data-[state=on]:text-white hover:text-text-primary"
      >
        <Users className="h-4 w-4" />
        Find Creators
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="services" 
        className="flex items-center gap-2 text-text-secondary rounded-full data-[state=on]:bg-brand-primary data-[state=on]:text-white hover:text-text-primary"
      >
        <Grid2X2 className="h-4 w-4" />
        Find Services
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
