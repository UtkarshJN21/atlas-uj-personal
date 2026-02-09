import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SplitLineItem } from '@/types/awards';

interface SupplierItemsTableProps {
  items: SplitLineItem[];
}

const departmentOptions = [
  'Marketing',
  'Creative',
  'Technology',
  'Finance',
  'Legal & Compliance',
  'Risk Management',
  'Design & Development',
  'DevOps',
  'Security',
  'Operations',
  'Human Resources',
  'Sales',
];

export function SupplierItemsTable({ items }: SupplierItemsTableProps) {
  const [rows, setRows] = useState(items.map((item) => ({ ...item })));

  const handleDepartmentChange = (index: number, value: string) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, department: value } : r))
    );
  };

  return (
    <div>
      {/* Column info */}
      <div className="flex items-center justify-end mb-3">
        <span className="text-xs text-gray-500">
          Showing columns 1-4 of 8
        </span>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-10">
                  #
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 min-w-[200px]">
                  Item
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-28">
                  Qty
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-4 py-3 w-28">
                  Unit Price
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-4 py-3 w-28">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-28">
                  Location
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-48">
                  Department
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index < rows.length - 1
                      ? 'border-b border-gray-100'
                      : ''
                  }
                >
                  <td className="text-sm text-gray-500 px-4 py-3">
                    {item.rowNumber}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </td>
                  <td className="text-sm text-gray-700 px-4 py-3">
                    {item.qty.toLocaleString()} {item.unit}
                  </td>
                  <td className="text-sm text-gray-700 px-4 py-3 text-right">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="text-sm font-medium text-gray-900 px-4 py-3 text-right">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="text-sm text-gray-700 px-4 py-3">
                    {item.location}
                  </td>
                  <td className="px-4 py-2">
                    <Select
                      value={item.department || undefined}
                      onValueChange={(val) =>
                        handleDepartmentChange(index, val)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
