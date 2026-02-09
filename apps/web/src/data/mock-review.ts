import type {
  AwardSummary,
  AwardStep,
  ReviewAISummary,
  ReviewSupplier,
  SourceEvent,
  ReviewData,
} from '@/types/awards';

export const reviewSummary: AwardSummary = {
  totalAwardValue: 5230000,
  coverage: 94,
  savings: 310000,
  savingsPercent: 5.6,
  baseline: 5540000,
  itemsCovered: 40,
  totalItems: 40,
  itemCoveragePercent: 100,
  awardedSuppliers: 2,
  totalSuppliers: 15,
  nonL1Awards: 1,
};

export const reviewAISummary: ReviewAISummary = {
  text: 'This consolidated award achieves 6% savings across 3 sourcing events through strategic dual-sourcing. Based on analysis of 15 supplier quotes, evaluation scores, and compliance checks, the recommended allocation meets all policy requirements while maintaining supply chain resilience.',
  tags: [
    { label: 'Policy Compliant', type: 'success' },
    { label: 'Market Aligned', type: 'success' },
    { label: 'Price Competitive', type: 'success' },
  ],
};

export const reviewJustification =
  'The award was made to ensure quality delivery while maintaining competitive pricing across regions. The dual-sourcing strategy mitigates supply chain risk while leveraging established vendor relationships.';

export const reviewSuppliers: ReviewSupplier[] = [
  {
    id: 'rev-sup-1',
    name: 'Deloitte',
    code: 'DLT',
    vendorId: 'VND-DEL-2024-001',
    tier: 'L1',
    rating: 4.9,
    items: 40,
    coverage: 70,
    total: 3660000,
    logoColor: '#86BC25',
  },
  {
    id: 'rev-sup-2',
    name: 'KPMG',
    code: 'KPMG',
    vendorId: 'VND-KPR-2024-003',
    tier: 'L2',
    rating: 4.7,
    items: 14,
    coverage: 30,
    total: 1570000,
    logoColor: '#00338D',
  },
];

export const reviewEvents: SourceEvent[] = [
  {
    id: 'evt-1',
    name: 'Marketing Services RFQ',
    code: 'RFQ-MKT-25-1064',
    type: 'RFQ',
    isPrimary: true,
    itemCount: 18,
    supplierCount: 8,
    aiSuppliers: 4,
    manualSuppliers: 4,
    buyer: {
      name: 'Priya Menon',
      title: 'Chief Audit Executive',
      avatarColor: '#7C3AED',
    },
    evaluators: [
      { id: 'eval-1', name: 'Sarah Chen', color: '#10B981' },
      { id: 'eval-2', name: 'Michael Hu', color: '#F59E0B' },
      { id: 'eval-3', name: 'Ava Patel', color: '#EF4444' },
      { id: 'eval-4', name: 'Raj Sharma', color: '#6366F1' },
    ],
    evaluatorsActioned: '3/4 actioned',
    supplierJourney: {
      invited: 8,
      participated: 6,
      participatedPercent: 75,
      qualified: 4,
      qualifiedPercent: 50,
      awarded: 1,
      awardedPercent: 15,
    },
    negotiations: {
      rounds: 2,
      savings: '5% savings',
    },
    auctions: {
      conducted: false,
    },
  },
  {
    id: 'evt-2',
    name: 'Financial Services RFQ',
    code: 'RFQ-FIN-25-0892',
    type: 'RFQ',
    isPrimary: false,
    itemCount: 12,
    supplierCount: 7,
    aiSuppliers: 4,
    manualSuppliers: 3,
  },
  {
    id: 'evt-3',
    name: 'Contract Renewal Intake',
    code: 'INT-MIX-25-0100',
    type: 'Intake',
    isPrimary: false,
    itemCount: 10,
    supplierCount: 4,
    aiSuppliers: 0,
    manualSuppliers: 0,
  },
];

export const reviewSteps: AwardStep[] = [
  { id: 'allocation', label: 'Allocation', status: 'completed' },
  { id: 'details', label: 'Award Details', status: 'completed' },
  { id: 'review', label: 'Review', status: 'current' },
];

export const mockReviewData: ReviewData = {
  summary: reviewSummary,
  aiSummary: reviewAISummary,
  justification: reviewJustification,
  awardAllocation: {
    totalItems: 54,
    totalAward: 5230000,
    suppliers: reviewSuppliers,
  },
  events: reviewEvents,
};
