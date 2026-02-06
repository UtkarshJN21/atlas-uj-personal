import { useState } from 'react';
import { Search, AlertCircle, Sparkles, Undo2, Redo2, MoreVertical, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import type { Scenario } from '@/types/awards';
import { ConfigureColumnsPopover } from '@/components/awards/configure-columns-popover';
import { BulkUploadModal } from '@/components/awards/bulk-upload-modal';

interface ScenarioBarProps {
  scenarios: Scenario[];
  selectedScenario: string | undefined;
  onScenarioChange: (scenarioId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  issueCount: number;
  itemCount: number;
  vendorPage?: number;
  totalVendors?: number;
  vendorsPerPage?: number;
  onVendorPageChange?: (page: number) => void;
}

export function ScenarioBar({
  scenarios,
  selectedScenario,
  onScenarioChange,
  searchQuery,
  onSearchChange,
  issueCount,
  itemCount,
  vendorPage = 1,
  totalVendors = 5,
  vendorsPerPage = 3,
  onVendorPageChange,
}: ScenarioBarProps) {
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [currencyDisplay, setCurrencyDisplay] = useState<'quoted' | 'base'>('quoted');

  const totalPages = Math.ceil(totalVendors / vendorsPerPage);
  const vendorStart = (vendorPage - 1) * vendorsPerPage + 1;
  const vendorEnd = Math.min(vendorPage * vendorsPerPage, totalVendors);

  return (
    <>
      {/* Row 1: Scenario Selection */}
      <div className="flex items-center py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-violet-50 text-violet-700 rounded-lg px-3 py-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Scenario</span>
          </div>
          <Select value={selectedScenario} onValueChange={onScenarioChange}>
            <SelectTrigger className="w-40 h-9 text-sm border-gray-200 bg-white">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id} className="text-sm">
                  {scenario.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-9 text-sm px-4 border-gray-200 font-medium">
            Compare All
          </Button>
        </div>
      </div>

      {/* Row 2: Search, Issues, Items | Configure, More, Vendor Pagination */}
      <div className="flex items-center justify-between py-2">
        {/* Left: Search, Issues, Undo/Redo, Items */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9 w-32 pl-9 pr-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          {/* Issues Badge */}
          {issueCount > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-full">
              <AlertCircle className="w-3.5 h-3.5" />
              {issueCount} issues
            </Badge>
          )}

          {/* Undo/Redo */}
          <div className="flex items-center gap-0.5">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
              <Undo2 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Items Count */}
          <span className="text-sm text-gray-500">
            {itemCount} items
          </span>
        </div>

        {/* Right: Configure Columns, More Options, Vendor Pagination */}
        <div className="flex items-center gap-3">
          {/* Configure Columns */}
          <ConfigureColumnsPopover />

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs text-gray-500">Currency Display</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setCurrencyDisplay('quoted')}
                className="flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${currencyDisplay === 'quoted' ? 'bg-gray-900' : 'bg-transparent'}`} />
                <span className="text-sm">$ Quoted Currency</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setCurrencyDisplay('base')}
                className="flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${currencyDisplay === 'base' ? 'bg-gray-900' : 'bg-transparent'}`} />
                <span className="text-sm">↻ Base (USD)</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowBulkUpload(true)} className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Bulk Upload Allocations</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Vendor Pagination */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>
              Showing <span className="text-gray-900">{vendorStart}-{vendorEnd}</span> of <span className="text-gray-900">{totalVendors}</span> vendors
            </span>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1 mx-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onVendorPageChange?.(i + 1)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i + 1 === vendorPage ? 'bg-violet-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next Arrows */}
            <button
              onClick={() => onVendorPageChange?.(Math.max(1, vendorPage - 1))}
              disabled={vendorPage === 1}
              className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onVendorPageChange?.(Math.min(totalPages, vendorPage + 1))}
              disabled={vendorPage === totalPages}
              className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Upload Modal */}
      <BulkUploadModal open={showBulkUpload} onOpenChange={setShowBulkUpload} />
    </>
  );
}
