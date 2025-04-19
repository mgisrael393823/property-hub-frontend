
import { useState } from "react";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

// Mock data for the project
const mockProject = {
  id: "1",
  title: "Office Space Photography",
  budget: "$500 - $1,000",
  timeline: "April 30, 2025",
  address: "123 Business Ave, San Francisco, CA",
  description: "We need professional photographs of our newly renovated office space. Looking for someone who can capture the modern aesthetic and natural lighting. Must include wide-angle shots of common areas and detail shots of unique features.",
  contentTypes: ["Photography", "Virtual Staging"],
  attachments: ["floor-plan.pdf", "style-guide.pdf"],
};

const applyFormSchema = z.object({
  message: z.string().min(10, "Please provide more details about your interest"),
  quote: z.string().optional(),
});

type ApplyFormValues = z.infer<typeof applyFormSchema>;

export default function ProjectBrief() {
  const { id } = useParams();
  const [hasApplied, setHasApplied] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      message: "",
      quote: "",
    },
  });

  const onSubmit = (data: ApplyFormValues) => {
    console.log("Application submitted:", data);
    setHasApplied(true);
    toast({
      title: "Success!",
      description: "Your application has been submitted.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Project Header */}
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">{mockProject.title}</h1>
          <div className="mt-4 space-y-2 text-gray-600">
            <p><strong>Budget:</strong> {mockProject.budget}</p>
            <p><strong>Timeline:</strong> {mockProject.timeline}</p>
            <p><strong>Location:</strong> {mockProject.address}</p>
          </div>
        </div>

        {/* Project Details Card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold">Project Details</h2>
            <p className="text-gray-600">{mockProject.description}</p>
            
            <div className="space-y-2">
              <h3 className="font-heading text-sm font-medium">Content Types</h3>
              <div className="flex flex-wrap gap-2">
                {mockProject.contentTypes.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-sm font-medium">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {mockProject.attachments.map((file) => (
                  <Button key={file} variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {file}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apply Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Interested in this project?
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message to Project Owner</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Introduce yourself and explain why you're a good fit for this project..."
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
                  name="quote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Quote (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your quote in USD"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={hasApplied}
                >
                  {hasApplied ? "Application Submitted" : "Apply to Project"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
