import { Sparkles, CheckCircle2 } from 'lucide-react';
import type { ReviewAISummary } from '@/types/awards';

interface ReviewAISummaryCardProps {
  aiSummary: ReviewAISummary;
}

export function ReviewAISummaryCard({ aiSummary }: ReviewAISummaryCardProps) {
  return (
    <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 rounded-xl border border-violet-100 p-6">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            AI Summary & Recommendation
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {aiSummary.text}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {aiSummary.tags.map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-xs font-medium text-emerald-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {tag.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
