
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const AvailabilityTab = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAcceptingBookings, setIsAcceptingBookings] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h3 className="font-medium text-lg">Booking Status</h3>
              <p className="text-sm text-gray-500">Control your availability for new bookings</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={isAcceptingBookings}
                onCheckedChange={setIsAcceptingBookings}
              />
              <span className="text-sm font-medium">
                {isAcceptingBookings ? "Currently Accepting" : "Not Accepting"}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-4">Available Hours</h4>
              <div className="space-y-2">
                {["Morning (9AM - 12PM)", "Afternoon (1PM - 5PM)", "Evening (6PM - 9PM)"].map((timeSlot) => (
                  <div key={timeSlot} className="flex items-center gap-2">
                    <Switch id={timeSlot} />
                    <label htmlFor={timeSlot} className="text-sm">{timeSlot}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              Save Availability
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityTab;
