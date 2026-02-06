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
