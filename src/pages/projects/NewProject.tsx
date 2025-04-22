import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, FileUp, Upload } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { projectSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const contentTypes = [
  { id: "photography", label: "Photography" },
  { id: "drone", label: "Drone" },
  { id: "videoTour", label: "Video Tour" },
  { id: "virtualStaging", label: "Virtual Staging" },
  { id: "reelsSocial", label: "Reels/Social Content" },
] as const;

const budgetRanges = [
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000+", label: "$5,000+" },
] as const;

const NewProject = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Initialize form with validation schema
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      address: "",
      contentTypes: [],
      description: "",
    },
    mode: "onChange", // Validate on change
  });

  // Keep track of form errors for UI feedback
  const formErrors = form.formState.errors;
  const hasErrors = Object.keys(formErrors).length > 0;

  // Simulate file upload
  const handleFileUpload = () => {
    // Mock file upload
    const newFile = `file-${Date.now()}.jpg`;
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  // Form submission handler
  async function onSubmit(values: z.infer<typeof projectSchema>) {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log("Form values:", values);
      console.log("Attachments:", uploadedFiles);
      
      // Add artificial delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Success!",
        description: "Your project has been posted.",
      });
      
      // Navigate after success
      setTimeout(() => navigate("/manager-dashboard"), 500);
    } catch (error) {
      // Show error message
      toast({
        title: "Error",
        description: "There was a problem posting your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    <FormDescription>
                      A clear, descriptive title will attract the right creators
                    </FormDescription>
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
                    <FormDescription>
                      The complete address where the project will take place
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="contentTypes"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-heading text-lg font-semibold">Content Needed</FormLabel>
                      <FormDescription>
                        Select all the content types you need for this project
                      </FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
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
                                      const currentValue = [...(field.value || [])];
                                      if (checked) {
                                        // Add to array if not present
                                        if (!currentValue.includes(type.id)) {
                                          field.onChange([...currentValue, type.id]);
                                        }
                                      } else {
                                        // Remove from array if present
                                        field.onChange(
                                          currentValue.filter((value) => value !== type.id)
                                        );
                                      }
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
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    <FormDescription>
                      Provide details about your project needs, goals, and any specific requirements
                    </FormDescription>
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
                    <FormDescription>
                      Choose a budget range that matches your expectations
                    </FormDescription>
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
                    <FormDescription>
                      When would you like this project completed?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel className="font-heading text-lg font-semibold">Attachments (Optional)</FormLabel>
                <FormDescription>
                  Upload reference images, brand guidelines, or other helpful documents
                </FormDescription>
                <div 
                  onClick={handleFileUpload}
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button type="button" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      handleFileUpload();
                    }}>
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload Files
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Drag and drop or click to upload</p>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <span className="text-sm text-gray-600">{file}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 h-8 px-2"
                            onClick={() => {
                              setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {hasErrors && (
                <Alert variant="destructive">
                  <AlertTitle>Form Incomplete</AlertTitle>
                  <AlertDescription>
                    Please fix the highlighted errors before submitting.
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSubmitting || hasErrors}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Posting Project...
                  </>
                ) : (
                  "Post Project"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;