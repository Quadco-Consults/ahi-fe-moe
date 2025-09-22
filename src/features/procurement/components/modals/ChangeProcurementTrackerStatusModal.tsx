"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import FormButton from "@/components/FormButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateProcurementTrackerStatus } from "@/features/procurement/controllers/procurementTrackerController";

const statusOptions = ["PENDING", "ONGOING", "COMPLETED", "CANCELED"].map(
  (option) => ({
    label: option,
    value: option,
  })
);

interface ChangeProcurementTrackerStatusModalProps {
  id: string;
  status?: string;
  onClose?: () => void;
}

export default function ChangeProcurementTrackerStatusModal({ 
  id, 
  status: prevStatus, 
  onClose 
}: ChangeProcurementTrackerStatusModalProps) {
  const [status, setStatus] = useState(prevStatus || "");

  // Procurement tracker update controller
  const { updateTrackerStatus, isLoading } = useUpdateProcurementTrackerStatus(id);

  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateTrackerStatus({ status });
      toast.success("Procurement tracker status updated successfully");
      onClose?.();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-6">
      <h2 className="text-lg font-bold">Change Procurement Tracker Status</h2>

      <Select
        value={status}
        defaultValue={status}
        onValueChange={handleChangeStatus}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>

        <SelectContent>
          {statusOptions?.map((status) => (
            <SelectItem key={status.label} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-end">
        <FormButton type="submit" loading={isLoading}>
          Submit
        </FormButton>
      </div>
    </form>
  );
}