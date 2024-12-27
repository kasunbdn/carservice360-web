export interface Customer {
  key: string;
  name: string;
  phone: string;
  email: string;
  vehicles: string;
  lastService: string;
}

export interface JobFormData {
  customer: string;
  vehicle: string;
  service: string;
  date: string;
  amount: number;
  notes?: string;
}

export type ServiceType = "oil" | "brake" | "tire" | "engine";
