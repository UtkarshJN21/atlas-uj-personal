import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  ClipboardList,
  Package,
  Database,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SupplierBasicDetails } from '@/components/awards/supplier-basic-details';
import { SupplierItemsTable } from '@/components/awards/supplier-items-table';
import { SupplierAdditionalData } from '@/components/awards/supplier-additional-data';
import type { SupplierAwardSplit } from '@/types/awards';

interface SupplierAwardCardProps {
  split: SupplierAwardSplit;
  defaultExpanded?: boolean;
}

export function SupplierAwardCard({
  split,
  defaultExpanded = false,
}: SupplierAwardCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const statusLabel =
    split.status === 'complete'
      ? 'Complete'
      : split.status === 'in-progress'
        ? 'In Progress'
        : 'Pending';

  const statusVariant =
    split.status === 'complete'
      ? 'success'
      : split.status === 'in-progress'
        ? 'warning'
        : 'default';

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Supplier Logo */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: split.logoColor }}
          >
            {split.supplierCode.slice(0, 2)}
          </div>

          <span className="text-sm font-semibold text-gray-900">
            {split.supplierName}
          </span>

          {/* Source code badges */}
          <div className="flex items-center gap-2">
            {split.sourceCodes.map((code) => (
              <div
                key={code}
                className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-2 py-1"
              >
                <FileText className="w-3 h-3" />
                <span>{code}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge
            variant={statusVariant}
            className={cn(
              'text-xs',
              split.status === 'complete' &&
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
            )}
          >
            {statusLabel}
          </Badge>
          <div className="text-right">
            <span className="text-sm font-bold text-gray-900">
              {formatCurrency(split.awardValue, 'USD', true)}
            </span>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {split.itemCount} items
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content with Tabs */}
      {isExpanded && (
        <div className="px-6 pb-6">
          <Tabs defaultValue="basic-details">
            <TabsList>
              <TabsTrigger
                value="basic-details"
                icon={<ClipboardList className="w-3.5 h-3.5" />}
              >
                Basic Details
              </TabsTrigger>
              <TabsTrigger
                value="items"
                icon={<Package className="w-3.5 h-3.5" />}
              >
                Items
              </TabsTrigger>
              <TabsTrigger
                value="additional-data"
                icon={<Database className="w-3.5 h-3.5" />}
              >
                Additional Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-details">
              <SupplierBasicDetails details={split.basicDetails} />
            </TabsContent>

            <TabsContent value="items">
              <SupplierItemsTable items={split.items} />
            </TabsContent>

            <TabsContent value="additional-data">
              <SupplierAdditionalData data={split.additionalData} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
