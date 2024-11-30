export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

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
  service: {
    type: string;
    items: ServiceItem[];
    estimatedCost: number;
  };
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  technician: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  estimatedCompletion: string;
  notes: string;
  history: {
    timestamp: string;
    action: string;
    user: string;
  }[];
}
