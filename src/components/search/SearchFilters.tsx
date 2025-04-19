
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const services = [
  "Photography",
  "Videography", 
  "Drone Footage",
  "Virtual Tours",
  "Social Media Content"
]

const propertyTypes = [
  "Multifamily",
  "Commercial",
  "Single Family",
  "Mixed Use"
]

const contentTypes = [
  "Interior",
  "Exterior",
  "Aerial",
  "3D Tour"
]

interface SearchFiltersProps {
  view: "creators" | "services";
}

export function SearchFilters({ view }: SearchFiltersProps) {
  const [date, setDate] = useState<Date>()
  const [priceRange, setPriceRange] = useState([0])

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl border border-border shadow-sm">
      {view === "creators" ? (
        <>
          <div>
            <Label htmlFor="zipcode" className="text-text-primary font-medium">Location</Label>
            <Input 
              id="zipcode" 
              placeholder="Enter ZIP code" 
              className="mt-1.5 bg-white border-border text-text-primary focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <Label className="text-text-primary font-medium">Services</Label>
            <div className="mt-1.5 space-y-2">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox id={service} />
                  <Label htmlFor={service} className="text-text-secondary">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-text-primary font-medium">Price Range</Label>
            <div className="mt-4 px-2">
              <Slider
                defaultValue={[500]}
                max={2000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
              <div className="mt-1 text-sm text-text-secondary">
                Up to ${priceRange[0]}
              </div>
            </div>
          </div>

          <div>
            <Label className="text-text-primary font-medium">Availability</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full mt-1.5 justify-between text-text-secondary border-border bg-white hover:bg-gray-50 rounded-md"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <CalendarDays className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-text-primary font-medium">Quality Filters</Label>
            <div className="space-y-3 mt-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="verified" className="text-text-secondary">
                  Verified Only
                </Label>
                <Switch id="verified" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="toprated" className="text-text-secondary">
                  4.5+ Rating
                </Label>
                <Switch id="toprated" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <Label className="text-text-primary font-medium">Property Type</Label>
            <div className="mt-1.5 space-y-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <Label htmlFor={type} className="text-text-secondary">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-text-primary font-medium">Content Type</Label>
            <div className="mt-1.5 space-y-2">
              {contentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <Label htmlFor={type} className="text-text-secondary">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-text-primary font-medium">Use Case</Label>
            <div className="mt-1.5 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="social" />
                <Label htmlFor="social" className="text-text-secondary">
                  Social Media
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="website" />
                <Label htmlFor="website" className="text-text-secondary">
                  Website
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="advertising" />
                <Label htmlFor="advertising" className="text-text-secondary">
                  Advertising
                </Label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
