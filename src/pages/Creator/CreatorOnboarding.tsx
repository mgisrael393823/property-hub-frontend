
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OnboardingLayout from "@/components/OnboardingLayout";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileImage, Calendar, List, Tag, IdCard } from "lucide-react";

// Creator onboarding steps
const creatorSteps = [
  "Basic Info",
  "Portfolio",
  "Services & Pricing",
  "Equipment",
  "Availability",
  "Verification"
];

// Define step forms with Zod
const basicInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(10, "Please provide a short bio")
});

const portfolioSchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required")
});

const servicesSchema = z.object({
  services: z.array(
    z.object({
      name: z.string().min(2, "Service name is required"),
      description: z.string(),
      price: z.number().min(1, "Price is required")
    })
  ).min(1, "At least one service is required")
});

const equipmentSchema = z.object({
  equipment: z.array(
    z.object({
      name: z.string().min(2, "Equipment name is required"),
      owned: z.boolean().default(true)
    })
  )
});

const availabilitySchema = z.object({
  availableDays: z.array(z.string())
});

const verificationSchema = z.object({
  idDocument: z.string().min(1, "ID document is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

const CreatorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Forms for each step
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      bio: ""
    }
  });

  const portfolioForm = useForm<z.infer<typeof portfolioSchema>>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      images: []
    }
  });

  const servicesForm = useForm<z.infer<typeof servicesSchema>>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      services: [{ name: "", description: "", price: 0 }]
    }
  });

  const equipmentForm = useForm<z.infer<typeof equipmentSchema>>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipment: [{ name: "Camera", owned: true }]
    }
  });

  const availabilityForm = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      availableDays: []
    }
  });

  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      idDocument: "",
      termsAccepted: false
    }
  });

  // Get current form and validation status
  const getCurrentForm = () => {
    const forms = [
      basicInfoForm,
      portfolioForm,
      servicesForm,
      equipmentForm, 
      availabilityForm,
      verificationForm
    ];
    return forms[currentStep];
  };

  const currentForm = getCurrentForm();
  const isFormValid = currentForm.formState.isValid;

  // Render different step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep form={basicInfoForm} />;
      case 1:
        return <PortfolioStep form={portfolioForm} />;
      case 2:
        return <ServicesStep form={servicesForm} />;
      case 3:
        return <EquipmentStep form={equipmentForm} />;
      case 4:
        return <AvailabilityStep form={availabilityForm} />;
      case 5:
        return <VerificationStep form={verificationForm} />;
      default:
        return null;
    }
  };

  const handleSubmitAll = () => {
    // In a real app, we would combine all form data and submit
    console.log("All forms submitted");
  };

  return (
    <OnboardingLayout
      type="creator"
      steps={creatorSteps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      isLastStep={currentStep === creatorSteps.length - 1}
      isFormValid={isFormValid}
      onSubmit={handleSubmitAll}
    >
      {renderStepContent()}
    </OnboardingLayout>
  );
};

// Step 1: Basic Info
const BasicInfoStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Basic Information</h2>
        <p className="text-text-secondary font-inter mt-1">Tell us about yourself and how clients can reach you.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4" role="form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your experience as a real estate content creator..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

// Step 2: Portfolio
const PortfolioStep = ({ form }: { form: any }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = () => {
    // Simulate adding a new image
    const newImage = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}`;
    const updatedImages = [...uploadedImages, newImage];
    setUploadedImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Portfolio</h2>
        <p className="text-text-secondary font-inter mt-1">Upload samples of your best real estate content work.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileImage className="mr-2 h-5 w-5" />
              Upload Photos
            </CardTitle>
            <CardDescription>
              Add at least 10 photos showcasing your photography style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploadedImages.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    Image {index + 1}
                  </div>
                </div>
              ))}
              <div 
                onClick={handleImageUpload}
                className="aspect-square bg-gray-50 rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <FileImage className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Image</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-gray-500">
              {uploadedImages.length} of 10 images uploaded
            </div>
            <button 
              onClick={handleImageUpload}
              className="text-sm text-brand-purple hover:underline"
            >
              Upload More
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Step 3: Services & Pricing
const ServicesStep = ({ form }: { form: any }) => {
  const { control, watch } = form;
  const services = watch("services");

  const addService = () => {
    form.setValue("services", [
      ...services,
      { name: "", description: "", price: 0 }
    ]);
  };

  const removeService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    form.setValue("services", updatedServices);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Services & Pricing</h2>
        <p className="text-text-secondary font-inter mt-1">Define the services you offer and their pricing.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Tag className="mr-2 h-5 w-5" />
            Your Services
          </CardTitle>
          <CardDescription>
            Add all the services you provide to property managers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {services.map((service: any, index: number) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Service #{index + 1}</h4>
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid gap-4">
                    <FormField
                      control={control}
                      name={`services.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Professional Photography" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`services.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe your service..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`services.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="flex items-center text-brand-purple hover:underline"
              >
                <span className="mr-1">+</span> Add Another Service
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 4: Equipment
const EquipmentStep = ({ form }: { form: any }) => {
  const { control, watch } = form;
  const equipment = watch("equipment");

  const addEquipment = () => {
    form.setValue("equipment", [
      ...equipment,
      { name: "", owned: true }
    ]);
  };

  const removeEquipment = (index: number) => {
    const updatedEquipment = [...equipment];
    updatedEquipment.splice(index, 1);
    form.setValue("equipment", updatedEquipment);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Equipment List</h2>
        <p className="text-text-secondary font-inter mt-1">Tell us about the equipment you use for your shoots.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <List className="mr-2 h-5 w-5" />
            Your Equipment
          </CardTitle>
          <CardDescription>
            Add the photography and videography equipment you use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {equipment.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                  <FormField
                    control={control}
                    name={`equipment.${index}.owned`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Own
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`equipment.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Equipment name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => removeEquipment(index)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addEquipment}
                className="flex items-center text-brand-purple hover:underline"
              >
                <span className="mr-1">+</span> Add Equipment
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 5: Availability
const AvailabilityStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Availability</h2>
        <p className="text-text-secondary font-inter mt-1">Set your working hours and availability.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="mr-2 h-5 w-5" />
            Set Your Availability
          </CardTitle>
          <CardDescription>
            Select days and times when you're available for bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="grid grid-cols-7 gap-2 mb-6">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={i} className="text-center">
                  <div className="mb-2 font-medium">{day}</div>
                  <div 
                    className={`
                      h-10 flex items-center justify-center rounded-md cursor-pointer
                      ${i < 5 ? "bg-brand-purple/10 text-brand-purple" : "bg-gray-100 text-gray-400"}
                    `}
                  >
                    {i < 5 ? "Available" : "Unavailable"}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border rounded-md p-4 bg-gray-50">
              <h4 className="font-medium mb-3">Working Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <select className="w-full rounded-md border-gray-300 p-2 text-sm">
                    {[8, 9, 10, 11, 12, 13, 14].map(hour => (
                      <option key={hour} value={hour}>
                        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <select className="w-full rounded-md border-gray-300 p-2 text-sm">
                    {[15, 16, 17, 18, 19, 20].map(hour => (
                      <option key={hour} value={hour}>
                        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 6: Verification
const VerificationStep = ({ form }: { form: any }) => {
  const { control } = form;
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Identity Verification</h2>
        <p className="text-text-secondary font-inter mt-1">Verify your identity to establish trust with clients.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <IdCard className="mr-2 h-5 w-5" />
            Upload ID Documents
          </CardTitle>
          <CardDescription>
            We need to verify your identity for security purposes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <div 
                className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <IdCard className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop your ID, or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Accepted formats: JPG, PNG, PDF (max 5MB)
                </p>
              </div>

              <FormField
                control={control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        I accept the <a href="#" className="text-brand-purple hover:underline" aria-label="Read Terms of Service">Terms of Service</a> and <a href="#" className="text-brand-purple hover:underline" aria-label="Read Privacy Policy">Privacy Policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorOnboarding;
