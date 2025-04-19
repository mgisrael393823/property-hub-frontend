
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from "@/components/Navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const contentTypes = [
  { id: "photography", label: "Photography" },
  { id: "drone", label: "Drone" },
  { id: "videoTour", label: "Video Tour" },
  { id: "virtualStaging", label: "Virtual Staging" },
  { id: "reelsSocial", label: "Reels/Social Content" },
] as const

const budgetRanges = [
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000+", label: "$5,000+" },
] as const

const formSchema = z.object({
  title: z.string().min(2, "Project title must be at least 2 characters"),
  address: z.string().min(5, "Please enter a valid property address"),
  contentTypes: z.array(z.string()).min(1, "Select at least one content type"),
  description: z.string().min(10, "Please provide more details about the project"),
  budget: z.string({ required_error: "Please select a budget range" }),
  timeline: z.date({ required_error: "Please select a target date" }),
})

const NewProject = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentTypes: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Success!",
      description: "Your project has been posted.",
    })
    navigate("/manager-dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">Post a New Project</h1>
          <p className="mt-2 text-gray-600">Fill in the details below to create your project listing</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading text-lg font-semibold">Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Luxury Apartment Photography" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading text-lg font-semibold">Property Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the property's full address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel className="font-heading text-lg font-semibold">Content Needed</FormLabel>
                {contentTypes.map((type) => (
                  <FormField
                    key={type.id}
                    control={form.control}
                    name="contentTypes"
                    render={({ field }) => (
                      <FormItem
                        key={type.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, type.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== type.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {type.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading text-lg font-semibold">Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Include any brand guidelines, specific requirements, or objectives..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading text-lg font-semibold">Budget Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-heading text-lg font-semibold">Target Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel className="font-heading text-lg font-semibold">Attachments (Optional)</FormLabel>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button type="button" variant="outline">Upload Files</Button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Drag and drop or click to upload</p>
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Post Project
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default NewProject

