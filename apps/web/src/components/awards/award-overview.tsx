import { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Pencil,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AwardOverview as AwardOverviewType } from '@/types/awards';

interface AwardOverviewProps {
  overview: AwardOverviewType;
  onJustificationChange?: (value: string) => void;
}

export function AwardOverview({
  overview,
  onJustificationChange,
}: AwardOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [justification, setJustification] = useState(overview.justification);
  const [milestones, setMilestones] = useState(
    overview.milestones.map((m) => ({ ...m }))
  );

  const statusLabel =
    overview.status === 'complete'
      ? 'Complete'
      : overview.status === 'in-progress'
        ? 'In Progress'
        : 'Pending';

  const statusVariant =
    overview.status === 'complete'
      ? 'success'
      : overview.status === 'in-progress'
        ? 'warning'
        : 'default';

  const handleJustificationChange = (value: string) => {
    setJustification(value);
    onJustificationChange?.(value);
  };

  const handleMilestoneChange = (index: number, value: string) => {
    setMilestones((prev) =>
      prev.map((m, i) => (i === index ? { ...m, description: value } : m))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900">
              Award Overview
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Justification and overview information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={statusVariant} className="text-xs">
            {statusLabel}
          </Badge>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {/* Award Justification */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Award Justification
              </h4>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-600 hover:bg-violet-50 rounded-md transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Assist
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <Textarea
              value={justification}
              onChange={(e) => handleJustificationChange(e.target.value)}
              className="min-h-[80px] text-sm text-gray-700 leading-relaxed"
            />
          </div>

          {/* Milestones */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Milestones
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.id}>
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    {milestone.label}
                  </label>
                  <Input
                    value={milestone.description}
                    onChange={(e) =>
                      handleMilestoneChange(index, e.target.value)
                    }
                    className="text-sm text-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
