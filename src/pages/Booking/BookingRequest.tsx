
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Check, Clock, MapPin, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required'),
  propertyAddress: z.string().min(1, 'Property address is required'),
  preferredDate: z.date({
    required_error: 'Please select a date',
  }),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  notes: z.string().optional(),
});

const services = [
  { id: 'photos', label: 'Real Estate Photography' },
  { id: 'virtual-tour', label: 'Virtual Tour' },
  { id: 'drone', label: 'Drone Footage' },
  { id: 'floor-plan', label: 'Floor Plan' },
  { id: 'twilight', label: 'Twilight Shots' },
];

// Mock creator data (in a real app, this would come from an API)
const mockCreator = {
  name: "Sarah Johnson",
  location: "Los Angeles, CA",
  rating: 4.9,
  responseTime: "< 2h",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  services: ["Real Estate Photography", "Virtual Tours", "Drone Footage"],
  verified: true,
};

export default function BookingRequest() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: '',
      propertyAddress: '',
      services: [],
      notes: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form data:', data);
    toast({
      title: "Success!",
      description: "Your booking request has been sent.",
    });
    // In a real app, this would submit to an API
    setTimeout(() => navigate(`/creator/${creatorId}`), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(`/creator/${creatorId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View Creator Profile
          </Button>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockCreator.avatarUrl} alt={mockCreator.name} />
              <AvatarFallback>{mockCreator.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900">
                Book {mockCreator.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{mockCreator.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Beach House Photography" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the full property address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                              className="rounded-md pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Services Needed</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, service.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== service.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {service.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requirements or details about the project?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90">
                    Send Booking Request
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Creator Details</h3>
                  {mockCreator.verified && (
                    <Badge variant="secondary" className="bg-brand-secondary text-brand-primary">
                      <Check className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{mockCreator.rating}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{mockCreator.responseTime} response time</span>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Available Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockCreator.services.map((service, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
