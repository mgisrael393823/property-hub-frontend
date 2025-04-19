
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { useState } from "react"

const services = [
  "Photography",
  "Videography",
  "Drone Footage",
  "Virtual Tours",
  "Social Media Content"
]

export function SearchFilters() {
  const [date, setDate] = useState<Date>()
  const [priceRange, setPriceRange] = useState([0])

  return (
    <div className="space-y-6 p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10">
      <div>
        <Label htmlFor="zipcode">Location</Label>
        <Input 
          id="zipcode" 
          placeholder="Enter ZIP code" 
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>Services</Label>
        <div className="mt-1.5 space-y-2">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox id={service} />
              <Label htmlFor={service} className="text-sm text-gray-200">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Price Range</Label>
        <div className="mt-4 px-2">
          <Slider
            defaultValue={[500]}
            max={2000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
          />
          <div className="mt-1 text-sm text-gray-300">
            Up to ${priceRange[0]}
          </div>
        </div>
      </div>

      <div>
        <Label>Availability</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full mt-1.5 justify-between">
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
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
