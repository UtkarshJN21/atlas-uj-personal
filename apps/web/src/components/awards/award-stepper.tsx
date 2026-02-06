import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AwardStep } from '@/types/awards';

interface AwardStepperProps {
  steps: AwardStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function AwardStepper({ steps, currentStep, onStepClick }: AwardStepperProps) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = index <= currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick?.(index)}
              disabled={!isClickable}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
                isCurrent && 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
                isCompleted && 'text-violet-700 hover:bg-violet-50',
                !isCurrent && !isCompleted && 'text-gray-400',
                isClickable && !isCurrent && 'cursor-pointer'
              )}
            >
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  isCurrent && 'bg-violet-600 text-white shadow-sm',
                  isCompleted && 'bg-violet-100 text-violet-700',
                  !isCurrent && !isCompleted && 'bg-gray-100 text-gray-500'
                )}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="whitespace-nowrap">{step.label}</span>
            </button>

            {!isLast && (
              <div className="w-8 h-px mx-1 bg-gray-200">
                <div
                  className={cn(
                    'h-full transition-all duration-300 ease-in-out',
                    index < currentStep ? 'bg-violet-200 w-full' : 'w-0'
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
