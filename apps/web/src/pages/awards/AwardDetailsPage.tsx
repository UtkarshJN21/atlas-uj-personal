import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AwardStepper } from '@/components/awards/award-stepper';
import { SummaryCards } from '@/components/awards/summary-cards';
import { AwardSplitsBar } from '@/components/awards/award-splits-bar';
import { AwardOverview } from '@/components/awards/award-overview';
import { SupplierAwardCard } from '@/components/awards/supplier-award-card';
import {
  mockAwardDetailsData,
  awardDetailsSteps,
} from '@/data/mock-award-details';

export function AwardDetailsPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [allExpanded, setAllExpanded] = useState(false);

  const { source, summary, overview, supplierSplits, totalSplits, totalSources } =
    mockAwardDetailsData;

  const handleStepClick = (index: number) => {
    if (index === 0) {
      navigate('/awards/allocate');
    } else if (index === 2) {
      navigate('/awards/review');
    } else {
      setCurrentStep(index);
    }
  };

  const handleNext = () => {
    navigate('/awards/review');
  };

  const handleBack = () => {
    navigate('/awards/allocate');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="border-l border-gray-200 pl-4 ml-1">
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Award Allocation
                </h1>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{source.name}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="font-medium text-gray-900">{source.code}</span>
                </div>
              </div>
            </div>

            <AwardStepper
              steps={awardDetailsSteps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 text-sm px-4 text-violet-700 bg-violet-50 border-violet-200 hover:bg-violet-100 hover:border-violet-300 font-medium transition-all"
              >
                <Sparkles className="w-4 h-4" />
                AI Pre-fill
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-sm px-4 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-medium"
              >
                Discard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="h-9 text-sm px-4 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-medium"
              >
                Back
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                className="h-9 text-sm px-6 bg-violet-600 hover:bg-violet-700 font-medium shadow-sm"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-6 space-y-6">
        <SummaryCards summary={summary} />

        <AwardSplitsBar
          totalSplits={totalSplits}
          totalSources={totalSources}
          allExpanded={allExpanded}
          onToggleAll={() => setAllExpanded(!allExpanded)}
        />

        <AwardOverview overview={overview} />

        {/* Supplier Award Cards */}
        <div className="space-y-4">
          {supplierSplits.map((split) => (
            <SupplierAwardCard
              key={split.id}
              split={split}
              defaultExpanded={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
