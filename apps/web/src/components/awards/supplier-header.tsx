import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Supplier } from '@/types/awards';

interface SupplierHeaderProps {
  supplier: Supplier;
  totalValue?: number;
  onAwardAll?: () => void;
}

function StarRating({ score }: { score: number }) {
  const fullStars = Math.floor(score / 20);
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-3 h-3',
            i < fullStars ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          )}
        />
      ))}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const configs: Record<number, { bg: string; text: string; label: string }> = {
    1: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'L1' },
    2: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'L2' },
    3: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'L3' },
  };
  const config = configs[rank];
  if (!config) return null;

  return (
    <span className={cn(
      'inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-semibold',
      config.bg, config.text
    )}>
      {config.label}
    </span>
  );
}

export function SupplierHeader({ supplier, onAwardAll }: SupplierHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center py-4 px-4 min-w-[200px]">
      {/* Logo Circle */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-2 shadow-sm border border-black/5"
        style={{
          backgroundColor: supplier.logoColor,
          color: supplier.logoColor === '#FFE600' ? '#333' : '#fff'
        }}
      >
        {supplier.name.charAt(0)}
      </div>

      {/* Name */}
      <div className="font-semibold text-gray-900 text-base mb-0.5">
        {supplier.name}
      </div>

      {/* Vendor ID */}
      <div className="text-xs text-gray-400 mb-2">
        {supplier.vendorId}
      </div>

      {/* Rank Badge + Eval + Stars + Score */}
      <div className="flex items-center gap-2 text-xs mb-3">
        <RankBadge rank={supplier.rank} />
        <span className="text-blue-600 font-semibold">EVAL:</span>
        <StarRating score={supplier.technicalScore} />
        <span className="text-gray-600 font-medium">{supplier.technicalScore}/100</span>
      </div>

      {/* Award All Link */}
      <button
        onClick={onAwardAll}
        className="text-xs text-violet-600 hover:text-violet-700 hover:bg-violet-50 px-2 py-1 rounded transition-colors font-medium flex items-center gap-1 group"
      >
        Award all
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </div>
  );
}
