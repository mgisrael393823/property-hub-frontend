
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { useMobile } from "@/hooks/use-mobile"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, PencilRuler, DollarSign, Clock, ShieldCheck } from "lucide-react"

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
  const [priceRange, setPriceRange] = useState([500])
  const isMobile = useMobile('lg')

  const getSectionClass = () => {
    return isMobile 
      ? "mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
      : "mb-6 last:mb-0";
  };

  return (
    <div className={isMobile 
      ? "space-y-0 p-0 bg-transparent border-0 shadow-none" 
      : "space-y-6 p-6 bg-white rounded-2xl border border-border shadow-sm"
    }>
      {view === "creators" ? (
        <>
          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <MapPin className="h-4 w-4" />
                <h3 className="font-medium">Location</h3>
              </div>
            )}
            <Label htmlFor="zipcode" className={isMobile ? "text-sm text-text-primary" : "text-text-primary font-medium"}>
              {!isMobile && "Location"}
            </Label>
            <Input 
              id="zipcode" 
              placeholder="Enter ZIP code" 
              className="mt-1.5 bg-white border-border text-text-primary focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <PencilRuler className="h-4 w-4" />
                <h3 className="font-medium">Services</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Services</Label>}
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox id={`service-${service}`} />
                  <Label htmlFor={`service-${service}`} className="text-text-secondary text-sm">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <DollarSign className="h-4 w-4" />
                <h3 className="font-medium">Price Range</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Price Range</Label>}
            <div className="mt-3 px-2">
              <Slider
                defaultValue={[500]}
                max={2000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
              <div className="mt-2 flex items-center justify-between text-sm text-text-secondary">
                <span>$0</span>
                <span className="font-medium">${priceRange[0]}</span>
                <span>$2000+</span>
              </div>
            </div>
          </div>

          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <Clock className="h-4 w-4" />
                <h3 className="font-medium">Availability</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Availability</Label>}
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

          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="font-medium">Quality Filters</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Quality Filters</Label>}
            <div className="space-y-3 mt-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="verified" className="text-text-secondary text-sm">
                  Verified Only
                </Label>
                <Switch id="verified" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="toprated" className="text-text-secondary text-sm">
                  4.5+ Rating
                </Label>
                <Switch id="toprated" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <MapPin className="h-4 w-4" />
                <h3 className="font-medium">Property Type</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Property Type</Label>}
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`property-${type}`} />
                  <Label htmlFor={`property-${type}`} className="text-text-secondary text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <PencilRuler className="h-4 w-4" />
                <h3 className="font-medium">Content Type</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Content Type</Label>}
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              {contentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`content-${type}`} />
                  <Label htmlFor={`content-${type}`} className="text-text-secondary text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className={getSectionClass()}>
            {isMobile && (
              <div className="flex items-center gap-2 mb-2 text-brand-primary">
                <ShieldCheck className="h-4 w-4" />
                <h3 className="font-medium">Use Case</h3>
              </div>
            )}
            {!isMobile && <Label className="text-text-primary font-medium">Use Case</Label>}
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="social" />
                <Label htmlFor="social" className="text-text-secondary text-sm">
                  Social Media
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="website" />
                <Label htmlFor="website" className="text-text-secondary text-sm">
                  Website
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="advertising" />
                <Label htmlFor="advertising" className="text-text-secondary text-sm">
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
