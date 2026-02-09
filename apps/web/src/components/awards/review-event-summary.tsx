import { useState } from 'react';
import {
  Globe,
  ChevronDown,
  ChevronRight,
  Users,
  Package,
  Handshake,
  Gavel,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { SourceEvent } from '@/types/awards';

interface ReviewEventSummaryProps {
  events: SourceEvent[];
}

export function ReviewEventSummary({ events }: ReviewEventSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Globe className="w-4.5 h-4.5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Event Summary
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Event details</p>
        </div>
      </div>

      {/* Event rows */}
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventRow({ event }: { event: SourceEvent }) {
  const [isExpanded, setIsExpanded] = useState(event.isPrimary);
  const hasDetails = !!event.buyer || !!event.supplierJourney;

  return (
    <div>
      <button
        onClick={() => hasDetails && setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between px-6 py-4 transition-colors text-left',
          hasDetails && 'hover:bg-gray-50/50 cursor-pointer'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {event.name}
            </span>
            {event.isPrimary && (
              <Badge className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0 flex-shrink-0">
                Primary
              </Badge>
            )}
            <Badge
              className={cn(
                'text-[10px] px-1.5 py-0 flex-shrink-0',
                event.type === 'RFQ'
                  ? 'bg-violet-100 text-violet-700'
                  : event.type === 'Intake'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
              )}
            >
              {event.type}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{event.code}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              {event.itemCount} items
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.supplierCount} suppliers
              {(event.aiSuppliers > 0 || event.manualSuppliers > 0) && (
                <span className="text-gray-400">
                  ({event.aiSuppliers} AI, {event.manualSuppliers} manual)
                </span>
              )}
            </span>
          </div>
          {hasDetails &&
            (isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ))}
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && hasDetails && (
        <div className="px-6 pb-5">
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            {/* Buyer and Evaluators row */}
            <div className="flex items-start justify-between mb-6">
              {/* Buyer */}
              {event.buyer && (
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Buyer
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={event.buyer.name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {event.buyer.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.buyer.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Evaluators */}
              {event.evaluators && event.evaluators.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Evaluators
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {event.evaluators.map((evaluator) => (
                        <div
                          key={evaluator.id}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
                          style={{ backgroundColor: evaluator.color }}
                          title={evaluator.name}
                        >
                          {evaluator.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                      ))}
                    </div>
                    {event.evaluatorsActioned && (
                      <span className="text-xs text-gray-500 ml-1">
                        {event.evaluatorsActioned}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Supplier Journey */}
            {event.supplierJourney && (
              <div className="mb-5">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Supplier Journey
                </p>
                <SupplierJourneyBar journey={event.supplierJourney} />
              </div>
            )}

            {/* Negotiations / Auctions */}
            <div className="grid grid-cols-2 gap-4">
              {event.negotiations && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Handshake className="w-4 h-4 text-violet-500" />
                    <span className="text-sm font-medium text-gray-900">
                      Negotiations
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-gray-900">
                        {event.negotiations.rounds}
                      </span>
                      <span className="text-xs text-gray-500">rounds</span>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {event.negotiations.savings}
                    </span>
                  </div>
                </div>
              )}

              {event.auctions && (
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      Auctions
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {event.auctions.conducted
                      ? event.auctions.details || 'Conducted'
                      : 'Not conducted'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SupplierJourneyBar({
  journey,
}: {
  journey: NonNullable<SourceEvent['supplierJourney']>;
}) {
  return (
    <div className="space-y-2">
      {/* Progress bars */}
      <div className="flex items-stretch gap-1 h-8 rounded-lg overflow-hidden">
        {/* Invited */}
        <div
          className="bg-blue-100 flex items-center px-3 rounded-l-lg"
          style={{ flex: journey.invited }}
        >
          <span className="text-xs font-bold text-blue-800">
            {journey.invited}
          </span>
          <span className="text-[10px] text-blue-600 ml-1">Invited</span>
        </div>

        {/* Participated */}
        <div
          className="bg-indigo-100 flex items-center justify-between px-3"
          style={{ flex: journey.participated }}
        >
          <div className="flex items-center">
            <span className="text-xs font-bold text-indigo-800">
              {journey.participated}
            </span>
            <span className="text-[10px] text-indigo-600 ml-1">
              Participated
            </span>
          </div>
          <span className="text-[10px] text-indigo-500 font-medium">
            {journey.participatedPercent}%
          </span>
        </div>

        {/* Qualified */}
        <div
          className="bg-amber-100 flex items-center justify-between px-3"
          style={{ flex: journey.qualified }}
        >
          <div className="flex items-center">
            <span className="text-xs font-bold text-amber-800">
              {journey.qualified}
            </span>
            <span className="text-[10px] text-amber-600 ml-1">Qualified</span>
          </div>
          <span className="text-[10px] text-amber-500 font-medium">
            {journey.qualifiedPercent}%
          </span>
        </div>

        {/* Awarded */}
        <div
          className="bg-emerald-100 flex items-center justify-between px-3 rounded-r-lg"
          style={{ flex: journey.awarded }}
        >
          <div className="flex items-center">
            <span className="text-xs font-bold text-emerald-800">
              {journey.awarded}
            </span>
            <span className="text-[10px] text-emerald-600 ml-1">Awarded</span>
          </div>
          <span className="text-[10px] text-emerald-500 font-medium">
            {journey.awardedPercent}%
          </span>
        </div>
      </div>
    </div>
  );
}
