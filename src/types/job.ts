import { Dayjs } from "dayjs";

export interface Job {
  id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: string;
    vin: string;
    licensePlate: string;
  };
  serviceType: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  technician: string;
  startDate: string;
  estimatedCompletion: string;
  progress: number;
  estimatedCost: number;
  description: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  searchText: string;
  status: string | null;
  priority: string | null;
  technician: string | null;
  dateRange: [Dayjs | null, Dayjs | null] | null;
}
