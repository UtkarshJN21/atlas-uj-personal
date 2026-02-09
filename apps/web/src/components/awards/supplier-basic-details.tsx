import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SplitBasicDetails } from '@/types/awards';

interface SupplierBasicDetailsProps {
  details: SplitBasicDetails;
}

const locationOptions = [
  'Chicago',
  'New York',
  'San Francisco',
  'Dallas',
  'Austin',
  'Boston',
  'London',
  'Singapore',
];

const departmentOptions = [
  'Marketing',
  'Creative',
  'Technology',
  'Finance',
  'Legal & Compliance',
  'Risk Management',
  'Design & Development',
  'DevOps',
  'Security',
  'Operations',
];

const paymentTermsOptions = ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Net 90'];

const warrantyOptions = [
  '6 Months',
  '12 Months',
  '18 Months',
  '24 Months',
  '36 Months',
];

const incotermsOptions = [
  'DDP - Delivered Duty Paid',
  'CIF - Cost, Insurance and Freight',
  'FOB - Free on Board',
  'EXW - Ex Works',
  'DAP - Delivered at Place',
  'CPT - Carriage Paid To',
];

export function SupplierBasicDetails({ details }: SupplierBasicDetailsProps) {
  const [location, setLocation] = useState(details.location || undefined);
  const [department, setDepartment] = useState(
    details.department || undefined
  );
  const [deliveryDate, setDeliveryDate] = useState(details.deliveryDate);
  const [paymentTerms, setPaymentTerms] = useState(
    details.paymentTerms || undefined
  );
  const [warrantyPeriod, setWarrantyPeriod] = useState(
    details.warrantyPeriod || undefined
  );
  const [incoterms, setIncoterms] = useState(
    details.deliveryTermsIncoterms || undefined
  );

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">
      {/* Location */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Location <span className="text-red-500">*</span>
        </label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locationOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Department */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Department
        </label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Delivery Date */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Delivery Date <span className="text-red-500">*</span>
        </label>
        <Input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>

      {/* Payment Terms */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Payment Terms <span className="text-red-500">*</span>
        </label>
        <Select value={paymentTerms} onValueChange={setPaymentTerms}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment terms" />
          </SelectTrigger>
          <SelectContent>
            {paymentTermsOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Warranty Period */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Warranty Period
        </label>
        <Select value={warrantyPeriod} onValueChange={setWarrantyPeriod}>
          <SelectTrigger>
            <SelectValue placeholder="Select warranty period" />
          </SelectTrigger>
          <SelectContent>
            {warrantyOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Delivery Terms (Incoterms) */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1.5 block">
          Delivery Terms (Incoterms)
        </label>
        <Select value={incoterms} onValueChange={setIncoterms}>
          <SelectTrigger>
            <SelectValue placeholder="Select incoterms" />
          </SelectTrigger>
          <SelectContent>
            {incotermsOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
