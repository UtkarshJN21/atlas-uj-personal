import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { SplitAdditionalData } from '@/types/awards';

interface SupplierAdditionalDataProps {
  data: SplitAdditionalData;
}

export function SupplierAdditionalData({ data }: SupplierAdditionalDataProps) {
  const [projectCode, setProjectCode] = useState(data.projectCode);
  const [requisitionNumber, setRequisitionNumber] = useState(
    data.requisitionNumber
  );
  const [glAccount, setGlAccount] = useState(data.glAccount);
  const [internalNotes, setInternalNotes] = useState(data.internalNotes);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {/* Project Code */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Project Code <span className="text-red-500">*</span>
          </label>
          <Input
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
            className="text-sm text-gray-700"
          />
        </div>

        {/* Requisition Number */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            Requisition Number
          </label>
          <Input
            value={requisitionNumber}
            onChange={(e) => setRequisitionNumber(e.target.value)}
            className="text-sm text-gray-700"
          />
        </div>

        {/* GL Account */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
            GL Account
          </label>
          <Input
            value={glAccount}
            onChange={(e) => setGlAccount(e.target.value)}
            className="text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Internal Notes - full width */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Internal Notes
        </label>
        <Textarea
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          placeholder="Enter internal notes for this split..."
          className="min-h-[80px] text-sm text-gray-700"
        />
      </div>
    </div>
  );
}
