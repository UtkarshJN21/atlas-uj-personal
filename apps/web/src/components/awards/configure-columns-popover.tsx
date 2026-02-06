import { useState } from 'react';
import { Settings2, RotateCcw } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ColumnConfig {
  id: string;
  label: string;
  checked: boolean;
  type: 'text' | 'number';
}

const defaultCommonColumns: ColumnConfig[] = [
  { id: '#', label: '#', checked: true, type: 'number' },
  { id: 'item', label: 'Item', checked: true, type: 'text' },
  { id: 'description', label: 'Description', checked: true, type: 'text' },
  { id: 'qty', label: 'Qty', checked: true, type: 'number' },
  { id: 'uom', label: 'UOM', checked: true, type: 'text' },
  { id: 'location', label: 'Location', checked: false, type: 'text' },
  { id: 'costCentre', label: 'Cost Centre', checked: false, type: 'text' },
  { id: 'department', label: 'Department', checked: false, type: 'text' },
];

export function ConfigureColumnsPopover() {
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultCommonColumns);
  const [vendorColumns, setVendorColumns] = useState(true);

  const selectedCount = columns.filter(c => c.checked).length;

  const toggleColumn = (id: string) => {
    setColumns(cols => cols.map(col =>
      col.id === id ? { ...col, checked: !col.checked } : col
    ));
  };

  const resetColumns = () => {
    setColumns(defaultCommonColumns);
    setVendorColumns(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
          <Settings2 className="w-4 h-4" />
          {selectedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
              {selectedCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm">
            Configure Columns ({selectedCount})
          </h3>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto">
          {/* Common Columns */}
          <div className="mb-3">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1.5">
              Common Columns
            </div>
            <div className="space-y-0.5">
              {columns.map((column) => (
                <label
                  key={column.id}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={column.checked}
                    onChange={() => toggleColumn(column.id)}
                    className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-sm text-gray-700">{column.label}</span>
                  <span className="ml-auto text-xs text-gray-400 uppercase">
                    {column.type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Vendor Columns */}
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-1.5">
              Vendor Columns
            </div>
            <label className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={vendorColumns}
                onChange={() => setVendorColumns(!vendorColumns)}
                className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-gray-700">Show as stacked info in vendor cells</span>
            </label>
          </div>
        </div>

        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Configure what appears in the table
            </span>
            <button
              onClick={resetColumns}
              className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
