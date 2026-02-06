import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn, formatCurrency } from '@/lib/utils';
import type { AwardSummary } from '@/types/awards';

interface SummaryCardsProps {
  summary: AwardSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 gap-4">
        {/* Total Award Value */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Total Award Value</span>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                Total value of all awarded items
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            {formatCurrency(summary.totalAwardValue, 'USD', true)}
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
              summary.coverage >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            )}>
              <span className={cn(
                'w-1.5 h-1.5 rounded-full',
                summary.coverage >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
              )} />
              <span>Coverage: {summary.coverage}%</span>
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Savings</span>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                Total savings compared to baseline
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(summary.savings, 'USD', true)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              +{summary.savingsPercent.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-400">
              from {formatCurrency(summary.baseline, 'USD', true)}
            </span>
          </div>
        </div>

        {/* Item Coverage */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Item Coverage</span>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                Items with allocations / Total items
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              {summary.itemsCovered}
            </span>
            <span className="text-xl text-gray-400 font-medium">/ {summary.totalItems}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
              <span>{summary.itemCoveragePercent}% Complete</span>
            </div>
          </div>
        </div>

        {/* Awarded Suppliers */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Awarded Suppliers</span>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                Suppliers with at least one allocation
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              {summary.awardedSuppliers}
            </span>
            <span className="text-xl text-gray-400 font-medium">/ {summary.totalSuppliers}</span>
          </div>
          {summary.nonL1Awards > 0 ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{summary.nonL1Awards} Non-L1</span>
              </div>
            </div>
          ) : (
            <div className="h-6" />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
