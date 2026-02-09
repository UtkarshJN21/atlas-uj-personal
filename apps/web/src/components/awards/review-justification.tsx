import { FileText } from 'lucide-react';

interface ReviewJustificationProps {
  justification: string;
}

export function ReviewJustification({
  justification,
}: ReviewJustificationProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <FileText className="w-4.5 h-4.5 text-gray-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">Justification</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{justification}</p>
    </div>
  );
}
