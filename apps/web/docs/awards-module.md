# Awards Module

The Awards module handles award allocation for sourcing events. It allows procurement teams to allocate quantities across vendors, compare scenarios, and review commercial terms before finalizing awards.

**Route:** `/awards/allocate`

---

## Tech Stack

| Layer         | Library                            |
| ------------- | ---------------------------------- |
| Framework     | React 19 + TypeScript              |
| Build         | Vite 7                             |
| Routing       | React Router v7 (`react-router-dom`) |
| Server State  | TanStack Query v5                  |
| Client State  | Zustand v5                         |
| Forms         | React Hook Form + Zod              |
| Styling       | Tailwind CSS v4                    |
| UI Primitives | Radix UI + CVA (shadcn/ui pattern) |
| Icons         | Lucide React                       |

---

## Folder Structure

```
apps/web/src/
├── pages/
│   └── awards/
│       └── AwardAllocationPage.tsx     # Main page (route entry point)
│
├── components/
│   ├── awards/                         # Award-specific components
│   │   ├── allocation-grid.tsx         # Data table with vendor allocations
│   │   ├── scenario-bar.tsx            # Scenario selector + toolbar (search, pagination, etc.)
│   │   ├── supplier-header.tsx         # Vendor column header (logo, rank, eval score)
│   │   ├── summary-cards.tsx           # Top-level KPI cards
│   │   ├── award-stepper.tsx           # Multi-step progress indicator
│   │   ├── configure-columns-popover.tsx  # Column visibility settings
│   │   └── bulk-upload-modal.tsx       # Bulk upload allocations via file
│   │
│   ├── ui/                             # Shared shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── popover.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tooltip.tsx
│   │   └── avatar.tsx
│   │
│   └── layout/
│       ├── main-layout.tsx             # App shell (header + content)
│       └── header.tsx                  # Global nav header
│
├── types/
│   └── awards.ts                       # All award-related TypeScript interfaces
│
├── data/
│   └── mock-award-allocation.ts        # Mock data (suppliers, items, costs, terms)
│
└── lib/
    └── utils.ts                        # cn(), formatCurrency(), formatNumber(), etc.
```

---

## Page Anatomy

`AwardAllocationPage` is composed of these sections top-to-bottom:

```
┌─────────────────────────────────────────────────────────┐
│ Page Header                                             │
│  ← Back  │  Award Allocation  │  Stepper  │  Actions    │
├─────────────────────────────────────────────────────────┤
│ Summary Cards (4x grid)                                 │
│  Total Award Value │ Savings │ Item Coverage │ Suppliers │
├─────────────────────────────────────────────────────────┤
│ Scenario Bar - Row 1                                    │
│  ✨ Scenario │ [Select ▾] │ Compare All                 │
├─────────────────────────────────────────────────────────┤
│ Scenario Bar - Row 2                                    │
│  🔍 Search │ 13 issues │ ↩↪ │ 35 items  ││ ⚙5 ⋮ │ 1-3 of 5 vendors ●○ ‹ › │
├─────────────────────────────────────────────────────────┤
│ Allocation Grid                                         │
│  Commercial Information header                          │
│  ┌──────────┬───────────┬──────┬───────┬─── vendors ──┐ │
│  │ #  │ Item │ Avail │ Award │ Price │ Qty │ ...       │ │
│  │ 1  │ ...  │       │       │       │ [6] │           │ │
│  │ 2  │ ...  │       │       │       │ [ ] │           │ │
│  ├──────────┴───────────┴──────┴───────┴───────────────┤ │
│  │ Sub-Total / Additional Costs / Grand Total          │ │
│  │ Commercial Terms                                    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Component Reference

### AwardAllocationPage

**Location:** `pages/awards/AwardAllocationPage.tsx`

The root page component. Owns the following state:

| State             | Type       | Purpose                           |
| ----------------- | ---------- | --------------------------------- |
| `currentStep`     | `number`   | Active stepper step (0-indexed)   |
| `selectedScenario`| `string?`  | Selected scenario ID              |
| `searchQuery`     | `string`   | Search filter text                |
| `vendorPage`      | `number`   | Current vendor pagination page    |

Renders: `SummaryCards` → `ScenarioBar` → `AllocationGrid`

---

### AllocationGrid

**Location:** `components/awards/allocation-grid.tsx`

The main data table displaying items, unit prices, and editable award quantities per vendor.

**Props:**

| Prop                | Type           | Description                        |
| ------------------- | -------------- | ---------------------------------- |
| `suppliers`         | `Supplier[]`   | All suppliers                      |
| `items`             | `AwardItem[]`  | Line items with allocations        |
| `additionalCosts`   | `AdditionalCost[]` | Extra cost rows (travel, tools, etc.) |
| `commercialTerms`   | `CommercialTerm[]` | Payment terms, warranty, etc.     |
| `onAllocationChange`| `function?`    | Callback when award qty changes    |
| `vendorPage`        | `number`       | Which page of vendors to show      |
| `vendorsPerPage`    | `number`       | Vendors per page (default: 3)      |

**Key behaviors:**
- Award quantity inputs are editable (pill-shaped, violet when filled, gray when empty)
- L1 unit prices are highlighted in green
- Items with allocation issues show an amber dot next to the Total Award badge
- Vendor columns are paginated (controlled by parent via `vendorPage`)
- Sub-total, additional costs, grand total, and commercial terms in the footer

---

### ScenarioBar

**Location:** `components/awards/scenario-bar.tsx`

Two-row toolbar above the allocation grid.

**Row 1:** Scenario selector dropdown + "Compare All" button
**Row 2 (left):** Search input, issues badge, undo/redo, item count
**Row 2 (right):** Configure columns, 3-dot menu (currency toggle, bulk upload), vendor pagination

**Vendor pagination** displays:
- "Showing X-Y of Z vendors" text
- Dot indicators (filled = current page)
- Left/right chevron arrows

The 3-dot dropdown menu contains:
- Currency display toggle (Quoted / Base USD)
- Bulk Upload Allocations option (opens modal)

---

### SupplierHeader

**Location:** `components/awards/supplier-header.tsx`

Renders in each vendor column header within the AllocationGrid table.

**Displays:**
- Colored logo circle with supplier initial
- Supplier name
- Vendor ID (e.g., `VND-V1`)
- Rank badge: L1 (emerald), L2 (amber), L3 (orange)
- EVAL label + 5-star rating + score out of 100
- "Award all →" action link

---

### SummaryCards

**Location:** `components/awards/summary-cards.tsx`

4-column grid of KPI cards:

| Card              | Primary Value   | Secondary Info          |
| ----------------- | --------------- | ----------------------- |
| Total Award Value | Currency amount | Coverage percentage     |
| Savings           | Currency amount | % change + baseline     |
| Item Coverage     | X / Y items     | % complete              |
| Awarded Suppliers | X / Y suppliers | Non-L1 count if any     |

---

### AwardStepper

**Location:** `components/awards/award-stepper.tsx`

Horizontal multi-step indicator in the page header: **Allocation** → **Award Details** → **Review**

Steps have three visual states: completed (checkmark), current (violet filled), upcoming (gray).

---

### ConfigureColumnsPopover

**Location:** `components/awards/configure-columns-popover.tsx`

Opened via the gear icon (with badge count) in the ScenarioBar.

**Sections:**
- **Common Columns:** #, Item, Description, Qty, UOM, Location, Cost Centre, Department (each toggleable)
- **Vendor Columns:** Toggle for stacked info display
- **Footer:** Reset button to restore defaults

---

### BulkUploadModal

**Location:** `components/awards/bulk-upload-modal.tsx`

Accessed from the 3-dot menu → "Bulk Upload Allocations".

**Sections:**
- Download template button (pre-filled spreadsheet)
- Drag-and-drop file upload zone (`.xlsx`, `.xls`, `.csv`)
- Footer with selected file name + Cancel button

---

## Type Definitions

All types live in `types/awards.ts`:

```typescript
Supplier        // id, name, code, vendorId, isL1, rank, scores, totalLandedCost, logoColor
AwardItem       // id, rowNumber, name, description, availableQty, unit, totalAward, allocations[], issue?
ItemAllocation  // supplierId, unitPrice, awardQty, isL1Price
AllocationIssue // type ('over-allocation' | 'under-allocation'), units
AdditionalCost  // id, name, costs (Record<supplierId, number>)
CommercialTerm  // id, name, values (Record<supplierId, string>)
AwardSummary    // totalAwardValue, coverage, savings, savingsPercent, baseline, items, suppliers
AwardData       // id, source, summary, suppliers, items, additionalCosts, commercialTerms
AwardStep       // id, label, status ('completed' | 'current' | 'upcoming')
Scenario        // id, name, description
```

---

## Mock Data

`data/mock-award-allocation.ts` provides:

| Export               | Description                                  |
| -------------------- | -------------------------------------------- |
| `mockSuppliers`      | 5 vendors: Deloitte, KPMG, EY, PwC, Accenture |
| `mockAwardItems`     | 11 line items with allocations across 3 vendors |
| `mockAdditionalCosts`| 4 cost categories (Travel, Tech, Specialist, Insurance) |
| `mockCommercialTerms`| 5 terms (Payment, Invoice, Delivery, Warranty, Price Validity) |
| `mockAwardSummary`   | KPI numbers for the summary cards            |
| `mockAwardData`      | Combined object with all of the above         |
| `awardSteps`         | 3-step stepper config                        |
| `mockScenarios`      | 3 scenarios: Best Price, Best Supplier, Balanced |

Items 4 and 8 have `issue: { type: 'over-allocation', units: 1 }` to demonstrate the issue indicator.

---

## Styling Conventions

- **Primary color:** Violet (`violet-600` for actions, `violet-50` for backgrounds)
- **Success/L1:** Emerald (`emerald-600` for L1 prices, `emerald-100` for L1 badge)
- **Warnings:** Amber (`amber-400` for issue dots, `amber-100` for L2 badge)
- **Neutral:** Gray scale (`gray-50` backgrounds, `gray-200` borders, `gray-900` text)
- **Font:** Inter via CSS variable `--font-sans`
- **Border radius:** Rounded-xl for cards/modals, rounded-lg for inputs/buttons, rounded-full for badges/pills
- **Shadows:** `shadow-sm` for cards, `shadow-xl` for modals
- **Vendor column separators:** Dashed borders (`border-dashed border-gray-200`)

---

## Utility Functions

From `lib/utils.ts`:

| Function         | Signature                                        | Description                        |
| ---------------- | ------------------------------------------------ | ---------------------------------- |
| `cn`             | `(...inputs: ClassValue[]) => string`            | Merges Tailwind classes (clsx + twMerge) |
| `formatCurrency` | `(value, currency?, compact?) => string`         | `$1,234` or `$1.23M` (compact)    |
| `formatNumber`   | `(value) => string`                              | Locale-formatted number            |
| `formatPercent`  | `(value, decimals?) => string`                   | `+9.7%` with sign                  |
| `getInitials`    | `(name) => string`                               | `"John Doe"` → `"JD"`             |
| `pluralize`      | `(count, singular, plural?) => string`           | Basic pluralization                |

---

## Connecting to Real APIs

When replacing mock data with real API calls:

1. Create query hooks in a `hooks/` or `queries/` directory using TanStack Query:
   ```typescript
   // hooks/useAwardData.ts
   export function useAwardData(awardId: string) {
     return useQuery({
       queryKey: ['award', awardId],
       queryFn: () => fetchAwardData(awardId),
     });
   }
   ```

2. Replace `mockAwardData` import in `AwardAllocationPage` with the query hook.

3. For mutations (allocation changes), use `useMutation` with optimistic updates:
   ```typescript
   const mutation = useMutation({
     mutationFn: updateAllocation,
     onMutate: async (newAllocation) => {
       // Optimistic update
     },
   });
   ```

4. Move the `onAllocationChange` handler to use the mutation instead of `console.log`.

---

## Adding New Award Features

To add a new component to the awards module:

1. Create the component in `components/awards/`
2. Import using `@/components/awards/<name>` (path alias)
3. If it needs new types, add them to `types/awards.ts`
4. If it needs new mock data, add to `data/mock-award-allocation.ts`
5. Wire it into `AwardAllocationPage` or the relevant parent component
