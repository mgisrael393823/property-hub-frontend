
import React from "react";
import { CheckIcon, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper = ({ steps, currentStep, onStepClick }: StepperProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center w-full max-w-4xl mx-auto mb-8 gap-2 sm:gap-0">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (isCompleted || index === currentStep);

        return (
          <React.Fragment key={index}>
            <div 
              className={cn(
                "flex flex-row sm:flex-col items-center group", 
                isClickable ? "cursor-pointer" : "cursor-default",
                { "opacity-50": !isCompleted && !isCurrent }
              )}
              onClick={() => isClickable && onStepClick(index)}
            >
              <div className="flex items-center justify-center">
                <div 
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full border border-transparent transition-colors",
                    isCompleted 
                      ? "bg-brand-purple text-white" 
                      : isCurrent 
                        ? "border-brand-purple bg-white text-brand-purple" 
                        : "border-gray-300 bg-white text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs font-medium sm:text-sm md:text-base whitespace-nowrap ml-2 sm:ml-0",
                  isCompleted || isCurrent ? "text-brand-purple" : "text-gray-500"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden sm:flex h-0.5 flex-1 bg-gray-200 sm:mx-2">
                {isCompleted && (
                  <div className="h-0.5 bg-brand-purple" style={{ width: "100%" }} />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
