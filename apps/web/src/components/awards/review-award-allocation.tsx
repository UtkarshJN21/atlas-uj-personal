import { Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, formatCurrency } from '@/lib/utils';
import type { ReviewSupplier } from '@/types/awards';

interface ReviewAwardAllocationProps {
  totalItems: number;
  totalAward: number;
  suppliers: ReviewSupplier[];
}

export function ReviewAwardAllocation({
  totalItems,
  totalAward,
  suppliers,
}: ReviewAwardAllocationProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Award className="w-4.5 h-4.5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Award Allocation
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Supplier breakdown and rankings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Items</p>
            <p className="text-lg font-bold text-gray-900">{totalItems}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Award</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(totalAward, 'USD', true)}
            </p>
          </div>
        </div>
      </div>

      {/* Supplier rows */}
      <div className="divide-y divide-gray-100">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Supplier logo */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: supplier.logoColor }}
              >
                {supplier.code.slice(0, 2)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {supplier.name}
                  </span>
                  <Badge
                    className={cn(
                      'text-[10px] px-1.5 py-0 font-bold',
                      supplier.tier === 'L1'
                        ? 'bg-violet-100 text-violet-700'
                        : supplier.tier === 'L2'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {supplier.tier}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{supplier.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {supplier.vendorId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {supplier.items}
                </p>
                <p className="text-xs text-gray-500">Items</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {supplier.coverage}%
                </p>
                <p className="text-xs text-gray-500">Coverage</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(supplier.total, 'USD', true)}
                </p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
