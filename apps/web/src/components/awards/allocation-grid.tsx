import { useMemo } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { SupplierHeader } from '@/components/awards/supplier-header';
import type { Supplier, AwardItem, AdditionalCost, CommercialTerm } from '@/types/awards';

interface AllocationGridProps {
  suppliers: Supplier[];
  items: AwardItem[];
  additionalCosts: AdditionalCost[];
  commercialTerms: CommercialTerm[];
  onAllocationChange?: (itemId: string, supplierId: string, qty: number) => void;
  vendorPage?: number;
  vendorsPerPage?: number;
}

export function AllocationGrid({
  suppliers,
  items,
  additionalCosts,
  commercialTerms,
  onAllocationChange,
  vendorPage = 1,
  vendorsPerPage = 3,
}: AllocationGridProps) {
  const paginatedSuppliers = useMemo(() => {
    const start = (vendorPage - 1) * vendorsPerPage;
    return suppliers.slice(start, start + vendorsPerPage);
  }, [suppliers, vendorPage, vendorsPerPage]);

  const supplierTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    suppliers.forEach((s) => {
      totals[s.id] = 0;
    });
    items.forEach((item) => {
      item.allocations.forEach((alloc) => {
        const currentTotal = totals[alloc.supplierId];
        if (currentTotal !== undefined) {
          totals[alloc.supplierId] = currentTotal + alloc.unitPrice * alloc.awardQty;
        }
      });
    });
    return totals;
  }, [items, suppliers]);

  const handleAwardChange = (itemId: string, supplierId: string, value: string) => {
    const qty = parseInt(value, 10) || 0;
    onAllocationChange?.(itemId, supplierId, qty);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h3 className="font-semibold text-gray-900 text-base">Commercial Information</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            {/* Supplier Headers Row */}
            <tr className="bg-white">
              <th className="w-14 bg-white sticky left-0 z-10" />
              <th className="min-w-[280px] bg-white sticky left-14 z-10" />
              <th className="w-28 bg-white" />
              <th className="w-32 bg-white" />
              {paginatedSuppliers.map((supplier) => (
                <th
                  key={supplier.id}
                  colSpan={2}
                  className="border-l border-dashed border-gray-200 bg-white align-top"
                >
                  <SupplierHeader
                    supplier={supplier}
                    totalValue={supplierTotals[supplier.id] ?? 0}
                  />
                </th>
              ))}
            </tr>

            {/* Total Landed Cost Row */}
            <tr className="bg-gray-50">
              <td className="px-4 py-4 text-gray-400 text-xs font-medium border-y border-gray-200 sticky left-0 z-10 bg-gray-50">#</td>
              <td className="px-4 py-4 font-semibold text-gray-900 text-sm border-y border-gray-200 sticky left-14 z-10 bg-gray-50">
                Total Landed Cost
              </td>
              <td className="border-y border-gray-200" />
              <td className="border-y border-gray-200" />
              {paginatedSuppliers.map((supplier) => (
                <td
                  key={supplier.id}
                  colSpan={2}
                  className="px-4 py-4 text-center border-l border-dashed border-y border-gray-200"
                >
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">
                    {formatCurrency(supplier.totalLandedCost)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Column Headers Row */}
            <tr className="bg-white">
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 sticky left-0 z-10 bg-white">
                #
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 sticky left-14 z-10 bg-white">
                Item
              </th>
              <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Available
              </th>
              <th className="px-4 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Total Award
              </th>
              {paginatedSuppliers.map((supplier) => (
                <th key={supplier.id} colSpan={2} className="border-l border-dashed border-gray-200 p-0 border-b">
                  <div className="flex h-full">
                    <div className="flex-1 px-3 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </div>
                    <div className="flex-1 px-3 py-3 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider border-l border-gray-100">
                      Award
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                {/* Row Number */}
                <td className="px-4 py-3 sticky left-0 z-10 bg-white group-hover:bg-gray-50 border-r border-transparent">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 text-gray-500 font-medium text-xs">
                    {item.rowNumber}
                  </span>
                </td>

                {/* Item Name & Description */}
                <td className="px-4 py-3 sticky left-14 z-10 bg-white group-hover:bg-gray-50 border-r border-dashed border-gray-200">
                  <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</div>
                </td>

                {/* Available */}
                <td className="px-4 py-3 text-center text-gray-600 text-xs font-medium">
                  {item.availableQty} {item.unit}
                </td>

                {/* Total Award with indicator */}
                <td className="px-4 py-3 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center min-w-[32px] h-7 px-2 rounded-full font-semibold text-xs border",
                        String(item.totalAward) === "0"
                          ? "bg-gray-50 text-gray-400 border-gray-200"
                          : "bg-violet-50 text-violet-700 border-violet-100"
                      )}
                    >
                      {item.totalAward}
                    </span>
                    {item.issue && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-50" />
                    )}
                  </div>
                </td>

                {/* Supplier Allocations */}
                {paginatedSuppliers.map((supplier) => {
                  const allocation = item.allocations.find(
                    (a) => a.supplierId === supplier.id
                  );
                  const unitPrice = allocation?.unitPrice ?? 0;
                  const awardQty = allocation?.awardQty ?? 0;
                  const isL1 = allocation?.isL1Price;

                  return (
                    <td
                      key={supplier.id}
                      colSpan={2}
                      className="border-l border-dashed border-gray-200 p-0"
                    >
                      <div className="flex h-full items-center">
                        {/* Unit Price */}
                        <div
                          className={cn(
                            'flex-1 px-3 py-3 text-center text-xs',
                            isL1 ? 'text-emerald-600 font-semibold' : 'text-gray-600'
                          )}
                        >
                          {formatCurrency(unitPrice)}
                        </div>

                        {/* Award Qty - Editable Input */}
                        <div className="flex-1 px-3 py-2 flex items-center justify-center border-l border-gray-50 h-full">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={awardQty === 0 ? '' : awardQty}
                            placeholder="-"
                            onChange={(e) => handleAwardChange(item.id, supplier.id, e.target.value)}
                            className={cn(
                              'w-14 h-8 text-center rounded-full text-xs font-semibold transition-all',
                              'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white',
                              awardQty > 0
                                ? 'bg-violet-50 text-violet-700 border border-violet-200'
                                : 'bg-gray-50 text-gray-900 border border-transparent hover:border-gray-300 placeholder-gray-300'
                            )}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          <tfoot>
            {/* Sub-Total Row */}
            <tr className="bg-gray-50 border-t border-gray-200">
              <td className="px-4 py-4 sticky left-0 z-10 bg-gray-50" />
              <td className="px-4 py-4 font-semibold text-gray-900 text-sm sticky left-14 z-10 bg-gray-50">Sub-Total</td>
              <td />
              <td />
              {paginatedSuppliers.map((supplier) => (
                <td
                  key={supplier.id}
                  colSpan={2}
                  className="px-4 py-4 text-center border-l border-dashed border-gray-200"
                >
                  <span className="font-bold text-gray-900 text-sm">
                    {formatCurrency(supplierTotals[supplier.id] ?? 0)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Additional Costs */}
            {additionalCosts.map((cost) => (
              <tr key={cost.id} className="bg-white border-t border-gray-100">
                <td className="px-4 py-3 sticky left-0 z-10 bg-white" />
                <td className="px-4 py-3 pl-8 text-gray-500 text-xs font-medium sticky left-14 z-10 bg-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  {cost.name}
                </td>
                <td />
                <td />
                {paginatedSuppliers.map((supplier) => (
                  <td
                    key={supplier.id}
                    colSpan={2}
                    className="px-4 py-3 text-center border-l border-dashed border-gray-200 text-gray-600 text-xs"
                  >
                    {formatCurrency(cost.costs[supplier.id] ?? 0)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Grand Total Row */}
            <tr className="bg-violet-50/50 border-t border-violet-100">
              <td className="px-4 py-4 sticky left-0 z-10 bg-violet-50/50" />
              <td className="px-4 py-4 font-bold text-gray-900 text-sm sticky left-14 z-10 bg-violet-50/50">Grand Total</td>
              <td />
              <td />
              {paginatedSuppliers.map((supplier) => {
                let grandTotal = supplierTotals[supplier.id] ?? 0;
                additionalCosts.forEach((cost) => {
                  grandTotal += cost.costs[supplier.id] ?? 0;
                });
                return (
                  <td
                    key={supplier.id}
                    colSpan={2}
                    className="px-4 py-4 text-center border-l border-dashed border-gray-200"
                  >
                    <span className="text-lg font-bold text-violet-700">
                      {formatCurrency(grandTotal)}
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Commercial Terms Header */}
            <tr className="border-t border-gray-200">
              <td
                colSpan={4 + paginatedSuppliers.length * 2}
                className="px-6 py-3 bg-gray-50/80 font-semibold text-gray-900 text-sm backdrop-blur-sm sticky left-0"
              >
                Commercial Terms
              </td>
            </tr>

            {/* Commercial Terms Rows */}
            {commercialTerms.map((term) => (
              <tr key={term.id} className="bg-white border-t border-gray-100">
                <td className="px-4 py-3 sticky left-0 z-10 bg-white" />
                <td className="px-4 py-3 text-gray-600 text-xs font-medium sticky left-14 z-10 bg-white">{term.name}</td>
                <td />
                <td />
                {paginatedSuppliers.map((supplier) => {
                  const value = term.values[supplier.id];
                  const isHighlighted = supplier.rank === 1;

                  return (
                    <td
                      key={supplier.id}
                      colSpan={2}
                      className="px-4 py-3 text-center border-l border-dashed border-gray-200"
                    >
                      <span
                        className={cn(
                          'text-xs px-2 py-1 rounded-md',
                          isHighlighted ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-600'
                        )}
                      >
                        {value}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  );
}
