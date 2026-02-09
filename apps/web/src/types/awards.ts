// Award allocation types based on the UI design

export interface Supplier {
  id: string;
  name: string;
  code: string;
  vendorId: string; // e.g., "VND-V1"
  isL1: boolean;
  technicalScore: number;
  evaluationScore: number;
  commercialScore: number;
  rank: number;
  totalLandedCost: number;
  logoColor: string;
}

export interface AllocationIssue {
  type: 'over-allocation' | 'under-allocation';
  units: number;
}

export interface AwardItem {
  id: string;
  rowNumber: number;
  name: string;
  description: string;
  availableQty: number;
  unit: string;
  totalAward: number;
  allocations: ItemAllocation[];
  issue?: AllocationIssue;
}

export interface ItemAllocation {
  supplierId: string;
  unitPrice: number;
  awardQty: number;
  isL1Price: boolean;
}

export interface AdditionalCost {
  id: string;
  name: string;
  costs: Record<string, number>; // supplierId -> cost value
}

export interface CommercialTerm {
  id: string;
  name: string;
  values: Record<string, string>; // supplierId -> term value
}

export interface AwardSummary {
  totalAwardValue: number;
  coverage: number;
  savings: number;
  savingsPercent: number;
  baseline: number;
  itemsCovered: number;
  totalItems: number;
  itemCoveragePercent: number;
  awardedSuppliers: number;
  totalSuppliers: number;
  nonL1Awards: number;
}

export interface AwardSource {
  id: string;
  code: string;
  type: 'standard' | 'lot' | 'rate-contract';
  name: string;
}

export interface AwardData {
  id: string;
  source: AwardSource;
  summary: AwardSummary;
  suppliers: Supplier[];
  items: AwardItem[];
  additionalCosts: AdditionalCost[];
  commercialTerms: CommercialTerm[];
}

export interface AwardStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
}

// Award Details types

export interface Milestone {
  id: string;
  label: string;
  description: string;
}

export interface AwardOverview {
  justification: string;
  milestones: Milestone[];
  status: 'complete' | 'in-progress' | 'pending';
}

export interface SplitBasicDetails {
  location: string;
  department: string;
  deliveryDate: string;
  paymentTerms: string;
  warrantyPeriod: string;
  deliveryTermsIncoterms: string;
}

export interface SplitLineItem {
  id: string;
  rowNumber: number;
  name: string;
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
  amount: number;
  location: string;
  department: string;
}

export interface SplitAdditionalData {
  projectCode: string;
  requisitionNumber: string;
  glAccount: string;
  internalNotes: string;
}

export interface SupplierAwardSplit {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierCode: string;
  logoColor: string;
  sourceCodes: string[];
  status: 'complete' | 'in-progress' | 'pending';
  awardValue: number;
  itemCount: number;
  basicDetails: SplitBasicDetails;
  items: SplitLineItem[];
  additionalData: SplitAdditionalData;
}

export interface AwardDetailsData {
  id: string;
  source: AwardSource;
  summary: AwardSummary;
  overview: AwardOverview;
  supplierSplits: SupplierAwardSplit[];
  totalSplits: number;
  totalSources: number;
}

// Review page types

export interface ReviewSupplier {
  id: string;
  name: string;
  code: string;
  vendorId: string;
  tier: 'L1' | 'L2' | 'L3';
  rating: number;
  items: number;
  coverage: number;
  total: number;
  logoColor: string;
}

export interface EventEvaluator {
  id: string;
  name: string;
  color: string;
}

export interface SupplierJourney {
  invited: number;
  participated: number;
  participatedPercent: number;
  qualified: number;
  qualifiedPercent: number;
  awarded: number;
  awardedPercent: number;
}

export interface SourceEvent {
  id: string;
  name: string;
  code: string;
  type: 'RFQ' | 'Intake' | 'RFP';
  isPrimary: boolean;
  itemCount: number;
  supplierCount: number;
  aiSuppliers: number;
  manualSuppliers: number;
  buyer?: {
    name: string;
    title: string;
    avatarColor: string;
  };
  evaluators?: EventEvaluator[];
  evaluatorsActioned?: string;
  supplierJourney?: SupplierJourney;
  negotiations?: {
    rounds: number;
    savings: string;
  };
  auctions?: {
    conducted: boolean;
    details?: string;
  };
}

export interface ReviewAISummary {
  text: string;
  tags: { label: string; type: 'success' | 'info' | 'warning' }[];
}

export interface ReviewData {
  summary: AwardSummary;
  aiSummary: ReviewAISummary;
  justification: string;
  awardAllocation: {
    totalItems: number;
    totalAward: number;
    suppliers: ReviewSupplier[];
  };
  events: SourceEvent[];
}
