
import React, { useState } from "react";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
import {
  Building,
  FileImage,
  MapPin,
  Sliders,
  Tag,
  Wallet
} from "lucide-react";

// Manager onboarding steps
const managerSteps = [
  "Company Info",
  "Property Portfolio",
  "Brand Guidelines",
  "Content Types",
  "Budget Range",
  "Payment Setup"
];

// Form types for each step
type CompanyInfoFormType = UseFormReturn<z.infer<typeof companyInfoSchema>>;
type PropertyPortfolioFormType = UseFormReturn<z.infer<typeof propertyPortfolioSchema>>;
type BrandGuidelinesFormType = UseFormReturn<z.infer<typeof brandGuidelinesSchema>>;
type ContentTypesFormType = UseFormReturn<z.infer<typeof contentTypesSchema>>;
type BudgetRangeFormType = UseFormReturn<z.infer<typeof budgetRangeSchema>>;
type PaymentMethodFormType = UseFormReturn<z.infer<typeof paymentMethodSchema>>;

// Define step forms with Zod
const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  logo: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().min(10, "Company description is required")
});

const propertyPortfolioSchema = z.object({
  properties: z.array(
    z.object({
      name: z.string().min(2, "Property name is required"),
      address: z.string().min(5, "Property address is required"),
      type: z.string().min(2, "Property type is required"),
      size: z.string().min(1, "Property size is required")
    })
  ).min(1, "At least one property is required")
});

const brandGuidelinesSchema = z.object({
  brandColors: z.array(z.string()),
  logo: z.string().optional(),
  guidelines: z.string().optional()
});

const contentTypesSchema = z.object({
  contentTypes: z.array(z.string()).min(1, "At least one content type is required")
});

const budgetRangeSchema = z.object({
  minBudget: z.number().min(0),
  maxBudget: z.number().min(1)
});

const paymentMethodSchema = z.object({
  cardHolder: z.string().min(2, "Card holder name is required"),
  cardNumber: z.string().min(16, "Valid card number is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

const ManagerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Forms for each step
  const companyInfoForm = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: "",
      address: "",
      phone: "",
      email: "",
      description: ""
    }
  });

  const propertyPortfolioForm = useForm<z.infer<typeof propertyPortfolioSchema>>({
    resolver: zodResolver(propertyPortfolioSchema),
    defaultValues: {
      properties: [{ name: "", address: "", type: "", size: "" }]
    }
  });

  const brandGuidelinesForm = useForm<z.infer<typeof brandGuidelinesSchema>>({
    resolver: zodResolver(brandGuidelinesSchema),
    defaultValues: {
      brandColors: ["#ffffff", "#000000"],
      logo: "",
      guidelines: ""
    }
  });

  const contentTypesForm = useForm<z.infer<typeof contentTypesSchema>>({
    resolver: zodResolver(contentTypesSchema),
    defaultValues: {
      contentTypes: []
    }
  });

  const budgetRangeForm = useForm<z.infer<typeof budgetRangeSchema>>({
    resolver: zodResolver(budgetRangeSchema),
    defaultValues: {
      minBudget: 100,
      maxBudget: 1000
    }
  });

  const paymentMethodForm = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      termsAccepted: false
    }
  });

  // Get current form and validation status
  const getCurrentForm = () => {
    const forms = [
      companyInfoForm,
      propertyPortfolioForm,
      brandGuidelinesForm,
      contentTypesForm, 
      budgetRangeForm,
      paymentMethodForm
    ];
    return forms[currentStep];
  };

  const currentForm = getCurrentForm();
  const isFormValid = currentForm.formState.isValid;

  // Render different step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CompanyInfoStep form={companyInfoForm} />;
      case 1:
        return <PropertyPortfolioStep form={propertyPortfolioForm} />;
      case 2:
        return <BrandGuidelinesStep form={brandGuidelinesForm} />;
      case 3:
        return <ContentTypesStep form={contentTypesForm} />;
      case 4:
        return <BudgetRangeStep form={budgetRangeForm} />;
      case 5:
        return <PaymentMethodStep form={paymentMethodForm} />;
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
      type="manager"
      steps={managerSteps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      isLastStep={currentStep === managerSteps.length - 1}
      isFormValid={isFormValid}
      onSubmit={handleSubmitAll}
    >
      {renderStepContent()}
    </OnboardingLayout>
  );
};

// Step 1: Company Info
const CompanyInfoStep = ({ form }: { form: CompanyInfoFormType }) => {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Company Information</h2>
        <p className="text-text-secondary font-inter mt-1">Tell us about your property management company.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition-colors">
                <Building className="h-10 w-10" />
              </div>
            </div>
            <div className="text-center mt-2">
              <button type="button" className="text-sm text-brand-purple hover:underline">
                Upload Logo
              </button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
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
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street address, city, state, zip" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="company@example.com" {...field} />
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
                  <FormLabel>Business Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Business phone number" {...field} />
                  </FormControl>
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
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe your company..." 
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

// Step 2: Property Portfolio
const PropertyPortfolioStep = ({ form }: { form: PropertyPortfolioFormType }) => {
  const { control, watch } = form;
  const properties = watch("properties");

  const addProperty = () => {
    form.setValue("properties", [
      ...properties,
      { name: "", address: "", type: "", size: "" }
    ]);
  };

  const removeProperty = (index: number) => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    form.setValue("properties", updatedProperties);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Property Portfolio</h2>
        <p className="text-text-secondary font-inter mt-1">Add the properties you manage that need content creation.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MapPin className="mr-2 h-5 w-5" />
            Your Properties
          </CardTitle>
          <CardDescription>
            Add all properties that need content creation services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {properties.map((property: any, index: number) => (
                <div key={index} className="p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Property #{index + 1}</h4>
                    {properties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProperty(index)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid gap-4">
                    <FormField
                      control={control}
                      name={`properties.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Sunset Apartments" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`properties.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address, city, state, zip" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`properties.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <FormControl>
                              <select 
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                {...field}
                              >
                                <option value="">Select a type</option>
                                <option value="apartment">Apartment</option>
                                <option value="single_family">Single Family Home</option>
                                <option value="condo">Condominium</option>
                                <option value="townhouse">Townhouse</option>
                                <option value="commercial">Commercial</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`properties.${index}.size`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size (sq ft)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProperty}
                className="flex items-center text-brand-purple hover:underline"
              >
                <span className="mr-1">+</span> Add Another Property
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 3: Brand Guidelines
const BrandGuidelinesStep = ({ form }: { form: BrandGuidelinesFormType }) => {
  const brandColors = form.watch("brandColors");

  const addColor = () => {
    form.setValue("brandColors", [...brandColors, "#ffffff"]);
  };

  const removeColor = (index: number) => {
    const updatedColors = [...brandColors];
    updatedColors.splice(index, 1);
    form.setValue("brandColors", updatedColors);
  };

  const updateColor = (index: number, color: string) => {
    const updatedColors = [...brandColors];
    updatedColors[index] = color;
    form.setValue("brandColors", updatedColors);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Brand Guidelines</h2>
        <p className="text-text-secondary font-inter mt-1">Help creators understand your brand identity.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <FileImage className="mr-2 h-5 w-5" />
            Brand Assets & Style
          </CardTitle>
          <CardDescription>
            Upload brand guidelines and select brand colors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Brand Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {brandColors.map((color: string, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="h-12 w-12 rounded-md border cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        // In real app, this would open a color picker
                        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
                        updateColor(index, randomColor);
                      }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1">{color}</div>
                    {brandColors.length > 1 && (
                      <button
                        className="text-xs text-red-500 mt-1 hover:underline"
                        onClick={() => removeColor(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  onClick={addColor}
                  className="h-12 w-full rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  + Add Color
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Logo</h4>
              <div 
                className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FileImage className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop your logo, or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Recommended size: 512×512px (PNG or SVG)
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Brand Guidelines</h4>
              <div 
                className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FileImage className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 mb-2">
                  Upload your brand guidelines document
                </p>
                <p className="text-xs text-gray-400">
                  Accepted formats: PDF, DOCX (max 10MB)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 4: Content Types
const ContentTypesStep = ({ form }: { form: ContentTypesFormType }) => {
  const { control } = form;
  
  const contentTypeOptions = [
    { id: "photos", label: "Professional Photography" },
    { id: "videos", label: "Property Video Tours" },
    { id: "drone", label: "Aerial/Drone Footage" },
    { id: "3d", label: "3D Virtual Tours" },
    { id: "floorplans", label: "Floor Plans" },
    { id: "social", label: "Social Media Content" },
    { id: "staging", label: "Virtual Staging" },
    { id: "copywriting", label: "Property Descriptions" }
  ];

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Preferred Content Types</h2>
        <p className="text-text-secondary font-inter mt-1">Select the types of content you're looking to create.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Tag className="mr-2 h-5 w-5" />
            Content Preferences
          </CardTitle>
          <CardDescription>
            Select all the content types you need for your properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contentTypeOptions.map((option) => (
                  <div key={option.id} className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                    <FormField
                      control={control}
                      name="contentTypes"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, option.id]);
                                  } else {
                                    field.onChange(currentValues.filter((value: string) => value !== option.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{option.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <div className="text-sm font-medium mb-2">Custom Content Requirements</div>
                <Textarea 
                  placeholder="Any specific content requirements we should know about?" 
                  className="w-full min-h-[100px]"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 5: Budget Range
const BudgetRangeStep = ({ form }: { form: BudgetRangeFormType }) => {
  const { control } = form;
  const minBudget = form.watch("minBudget");
  const maxBudget = form.watch("maxBudget");

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Budget Range</h2>
        <p className="text-text-secondary font-inter mt-1">Set your budget expectations for content creation.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Sliders className="mr-2 h-5 w-5" />
            Budget Settings
          </CardTitle>
          <CardDescription>
            Define your budget range for property content creation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Monthly Budget Range</h4>
                  <div className="h-4 relative w-full bg-gray-100 rounded-full">
                    <div 
                      className="absolute h-4 bg-brand-purple/20 rounded-full" 
                      style={{
                        left: `${(minBudget / 2000) * 100}%`,
                        right: `${100 - (maxBudget / 2000) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>$0</span>
                    <span>$500</span>
                    <span>$1000</span>
                    <span>$1500</span>
                    <span>$2000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="minBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="maxBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Budget ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-md text-center">
                  <div className="text-lg font-medium text-brand-purple">
                    ${minBudget} - ${maxBudget}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Your estimated monthly budget range
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Content Creation Budget Breakdown</h4>
                <div className="space-y-3">
                  {[
                    { name: "Photography", percent: 40 },
                    { name: "Videography", percent: 30 },
                    { name: "Drone Shots", percent: 20 },
                    { name: "Staging", percent: 10 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-brand-purple h-2 rounded-full" 
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Step 6: Payment Method Setup
const PaymentMethodStep = ({ form }: { form: PaymentMethodFormType }) => {
  const { control } = form;
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-headers-primary font-jakarta">Payment Method</h2>
        <p className="text-text-secondary font-inter mt-1">Set up your payment method for booking creators.</p>
      </div>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Wallet className="mr-2 h-5 w-5" />
            Payment Setup
          </CardTitle>
          <CardDescription>
            Add a payment method to book content creators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <div className="p-5 bg-gray-50 rounded-md border mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-12 bg-gray-200 rounded mr-3"></div>
                  <div className="text-sm font-medium">Credit Card</div>
                </div>

                <div className="grid gap-4">
                  <FormField
                    control={control}
                    name="cardHolder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name as it appears on card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="•••• •••• •••• ••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                      <Input placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <Input placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Secure Payment Processing</div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    <div className="h-6 w-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                </p>
              </div>

              <FormField
                control={control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        I authorize ZeroVacancy to charge my payment method for bookings and accept the <a href="#" className="text-brand-purple hover:underline" aria-label="Read Terms of Service">Terms of Service</a> and <a href="#" className="text-brand-purple hover:underline" aria-label="Read Privacy Policy">Privacy Policy</a>
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

export default ManagerOnboarding;
