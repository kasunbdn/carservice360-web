export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
}

export interface Vehicle {
  make: string;
  model: string;
  year: string;
  vin: string;
  licensePlate: string;
}

export interface Service {
  type: "maintenance" | "repair" | "inspection" | "diagnostic";
  items: ServiceItem[];
  estimatedCost: number;
}

export interface JobHistory {
  timestamp: string;
  action: string;
  user: string;
}

export interface Job {
  id: string;
  customer: Customer;
  vehicle: Vehicle;
  service: Service;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  technician: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  estimatedCompletion: string;
  notes: string;
  history: JobHistory[];
}
