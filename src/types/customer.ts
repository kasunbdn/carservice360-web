export interface CustomerVehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  licensePlate: string;
  lastService?: string;
}

export interface CustomerHistory {
  id: string;
  date: string;
  type: "note" | "service" | "contact" | "update";
  description: string;
  user: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  vehicles: CustomerVehicle[];
  history: CustomerHistory[];
  createdAt: string;
  updatedAt: string;
  totalSpent: number;
  lastVisit?: string;
  preferredContact: "email" | "phone" | "sms";
  notes?: string;
}
