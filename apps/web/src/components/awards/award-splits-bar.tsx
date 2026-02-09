import { useState } from 'react';
import {
  SplitSquareHorizontal,
  GitBranch,
  ChevronsDownUp,
  ChevronsUpDown,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AwardSplitsBarProps {
  totalSplits: number;
  totalSources: number;
  allExpanded: boolean;
  onToggleAll: () => void;
}

interface SplitField {
  id: string;
  label: string;
  type?: string;
  checked: boolean;
}

const initialDefaults: SplitField[] = [
  { id: 'supplier', label: 'Supplier', checked: true },
  { id: 'source', label: 'Source', checked: true },
  { id: 'purchase-channel', label: 'Purchase Channel', checked: true },
];

const initialAdditional: SplitField[] = [
  { id: 'location', label: 'Location', type: 'TEXT', checked: false },
  { id: 'cost-centre', label: 'Cost Centre', type: 'TEXT', checked: false },
  { id: 'department', label: 'Department', type: 'TEXT', checked: false },
];

export function AwardSplitsBar({
  totalSplits,
  totalSources,
  allExpanded,
  onToggleAll,
}: AwardSplitsBarProps) {
  const [defaults, setDefaults] = useState(initialDefaults);
  const [additional, setAdditional] = useState(initialAdditional);
  const [open, setOpen] = useState(false);

  const allFields = [...defaults, ...additional];
  const selectedFields = allFields.filter((f) => f.checked);
  const defaultsChecked = defaults.filter((f) => f.checked).length;
  const additionalChecked = additional.filter((f) => f.checked).length;

  const toggleDefault = (id: string) => {
    setDefaults((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  const toggleAdditional = (id: string) => {
    setAdditional((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  const removeTag = (id: string) => {
    if (defaults.some((f) => f.id === id)) {
      toggleDefault(id);
    } else {
      toggleAdditional(id);
    }
  };

  const handleReset = () => {
    setDefaults(initialDefaults);
    setAdditional(initialAdditional);
  };

  const handleApply = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Award Splits with configure popover */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <SplitSquareHorizontal className="w-4 h-4 text-violet-500" />
          <span>Award Splits: {totalSplits}</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 p-0">
              {/* Header */}
              <div className="px-4 pt-4 pb-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  Configure Splits ({selectedFields.length})
                </h4>
              </div>

              {/* Selected tags */}
              {selectedFields.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                  {selectedFields.map((field) => {
                    const isDefault = defaults.some((d) => d.id === field.id);
                    return (
                      <span
                        key={field.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 text-violet-700 rounded-md text-xs font-medium border border-violet-200"
                      >
                        {field.label}
                        {!isDefault && (
                          <button
                            onClick={() => removeTag(field.id)}
                            className="text-violet-400 hover:text-violet-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    );
                  })}
                </div>
              )}

              <div className="border-t border-gray-100" />

              {/* Fields */}
              <div className="px-4 py-3 max-h-64 overflow-y-auto">
                {/* Defaults */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Defaults
                    </span>
                    <span className="text-xs text-gray-400">
                      {defaultsChecked}/{defaults.length}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {defaults.map((field) => (
                      <label
                        key={field.id}
                        className="flex items-center gap-2.5 py-1"
                      >
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="w-3.5 h-3.5 rounded border-gray-300 text-violet-600 pointer-events-none accent-violet-600"
                        />
                        <span className="text-sm text-gray-500">
                          {field.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Additional
                    </span>
                    <span className="text-xs text-gray-400">
                      {additionalChecked}/{additional.length}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {additional.map((field) => (
                      <label
                        key={field.id}
                        className="flex items-center justify-between py-1 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={field.checked}
                            onChange={() => toggleAdditional(field.id)}
                            className="w-3.5 h-3.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            {field.label}
                          </span>
                        </div>
                        {field.type && (
                          <span className="text-[10px] font-medium text-gray-400 uppercase">
                            {field.type}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-8 text-xs text-gray-500 hover:text-gray-700"
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  className="h-8 text-xs px-4 bg-violet-600 hover:bg-violet-700"
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Sources */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <GitBranch className="w-4 h-4 text-violet-500" />
          <span>Sources: {totalSources}</span>
        </div>
      </div>

      {/* Expand/Collapse */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleAll}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {allExpanded ? (
            <>
              <ChevronsDownUp className="w-4 h-4" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronsUpDown className="w-4 h-4" />
              Expand All
            </>
          )}
        </button>
      </div>
    </div>
  );
}
