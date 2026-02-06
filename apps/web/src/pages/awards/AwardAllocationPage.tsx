import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AwardStepper } from '@/components/awards/award-stepper';
import { SummaryCards } from '@/components/awards/summary-cards';
import { ScenarioBar } from '@/components/awards/scenario-bar';
import { AllocationGrid } from '@/components/awards/allocation-grid';
import {
  mockAwardData,
  awardSteps,
  mockScenarios,
} from '@/data/mock-award-allocation';

export function AwardAllocationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');
  const [vendorPage, setVendorPage] = useState(1);

  const { source, summary, suppliers, items, additionalCosts, commercialTerms } =
    mockAwardData;

  const vendorsPerPage = 3;

  const handleAllocationChange = (
    itemId: string,
    supplierId: string,
    qty: number
  ) => {
    console.log('Allocation changed:', { itemId, supplierId, qty });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back, Title */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="border-l border-gray-200 pl-4 ml-1">
                <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Award Allocation
                </h1>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span className="font-medium text-gray-900">{source.code}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{source.name}</span>
                </div>
              </div>
            </div>

            {/* Center: Stepper */}
            <AwardStepper
              steps={awardSteps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />

            {/* Right: Actions */}
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
                size="sm"
                className="h-9 text-sm px-4 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-medium"
              >
                Discard
              </Button>
              <Button
                size="sm"
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
        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Scenario Bar */}
        <ScenarioBar
          scenarios={mockScenarios}
          selectedScenario={selectedScenario}
          onScenarioChange={setSelectedScenario}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          issueCount={13}
          itemCount={35}
          vendorPage={vendorPage}
          totalVendors={suppliers.length}
          vendorsPerPage={vendorsPerPage}
          onVendorPageChange={setVendorPage}
        />

        {/* Allocation Grid */}
        <AllocationGrid
          suppliers={suppliers}
          items={items}
          additionalCosts={additionalCosts}
          commercialTerms={commercialTerms}
          onAllocationChange={handleAllocationChange}
          vendorPage={vendorPage}
          vendorsPerPage={vendorsPerPage}
        />
      </div>
    </div>
  );
}
