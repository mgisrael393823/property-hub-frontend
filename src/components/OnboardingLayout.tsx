
import React, { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingLayoutProps {
  type: "creator" | "manager";
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLastStep: boolean;
  isFormValid?: boolean;
  children: ReactNode;
  onSubmit?: () => void;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  type,
  steps,
  currentStep,
  setCurrentStep,
  isLastStep,
  isFormValid = true,
  children,
  onSubmit,
}) => {
  const handleNext = () => {
    if (isLastStep) {
      onSubmit?.();
      // Redirect to dashboard
      window.location.href = type === "creator" ? "/creator-dashboard" : "/manager-dashboard";
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-brand-dark/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white font-jakarta">
            ZeroVacancy
          </Link>
          <div>
            <Button variant="ghost" className="text-white hover:text-white/80">
              Save & Exit
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white font-jakarta mb-2">
              {type === "creator" ? "Creator Onboarding" : "Property Manager Onboarding"}
            </h1>
            <p className="text-text-secondary font-inter">
              {type === "creator" 
                ? "Set up your creator profile to connect with property managers." 
                : "Set up your property manager profile to find creators."}
            </p>
          </div>

          <Stepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

          <Card className="bg-white/90 backdrop-blur-md p-6 border shadow-md rounded-xl">
            {children}
          </Card>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="bg-white border-brand-purple text-brand-purple hover:bg-brand-purple/10"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isFormValid}
              className="bg-brand-purple hover:bg-brand-purple/90 text-white"
            >
              {isLastStep ? "Complete" : "Continue"}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
