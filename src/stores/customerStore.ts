import { create } from "zustand";
import type {
  Customer,
  CustomerHistory,
  CustomerVehicle,
} from "../types/customer";
import { v4 as uuidv4 } from "uuid";

interface CustomerStore {
  customers: Customer[];
  addCustomer: (
    customer: Omit<Customer, "id" | "createdAt" | "updatedAt" | "history">
  ) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addCustomerHistory: (
    customerId: string,
    entry: Omit<CustomerHistory, "id" | "date">
  ) => void;
  addCustomerVehicle: (
    customerId: string,
    vehicle: Omit<CustomerVehicle, "id">
  ) => void;
  updateCustomerVehicle: (
    customerId: string,
    vehicleId: string,
    updates: Partial<CustomerVehicle>
  ) => void;
  deleteCustomerVehicle: (customerId: string, vehicleId: string) => void;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "VMD",
    phone: "(555) 123-4567",
    email: "example@gmail.com",
    address: "123 Main St, City, State 12345",
    vehicles: [
      {
        id: "1",
        make: "Toyota",
        model: "Camry",
        year: "2020",
        vin: "1HGCM82633A123456",
        licensePlate: "ABC-123",
        lastService: "2024-02-01",
      },
      {
        id: "2",
        make: "Honda",
        model: "CR-V",
        year: "2019",
        vin: "2HGES16575H123456",
        licensePlate: "XYZ-789",
        lastService: "2024-01-15",
      },
    ],
    history: [
      {
        id: "1",
        date: "2024-02-01",
        type: "service",
        description: "Regular maintenance service completed",
        user: "System",
      },
      {
        id: "2",
        date: "2024-01-15",
        type: "note",
        description: "Customer requested quote for brake service",
        user: "System",
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    totalSpent: 1299.99,
    lastVisit: "2024-02-01",
    preferredContact: "email",
    notes: "Prefers digital invoices",
  },
  {
    id: "2",
    name: "VMD2",
    phone: "(555) 234-5678",
    email: "example@gmail.com",
    address: "123 Main St, City, State 12345",
    vehicles: [
      {
        id: "3",
        make: "Ford",
        model: "Mustang",
        year: "2021",
        vin: "3FAHP0JA9CR123456",
        licensePlate: "MUS-789",
        lastService: "2024-01-20",
      },
    ],
    history: [
      {
        id: "3",
        date: "2024-01-20",
        type: "service",
        description: "Oil change and tire rotation",
        user: "System",
      },
    ],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    totalSpent: 799.99,
    lastVisit: "2024-01-20",
    preferredContact: "phone",
    notes: "Prefers weekend appointments",
  },
  {
    id: "3",
    name: "VMD3",
    phone: "(555) 345-6789",
    email: "example3@gmail.com",
    address: "123 Main St, City, State 12345",
    vehicles: [
      {
        id: "4",
        make: "Chevrolet",
        model: "Tahoe",
        year: "2022",
        vin: "1GNEK13ZX3R123456",
        licensePlate: "CHE-456",
        lastService: "2024-01-25",
      },
    ],
    history: [
      {
        id: "4",
        date: "2024-01-25",
        type: "service",
        description: "Replaced brake pads and alignment check",
        user: "System",
      },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
    totalSpent: 999.99,
    lastVisit: "2024-01-25",
    preferredContact: "email",
    notes: "Prefers weekend appointments",
  },
  {
    id: "4",
    name: "VMD4",
    phone: "(555) 456-7890",
    email: "example4@gmail.com",
    address: "123 Main St, City, State 12345",
    vehicles: [
      {
        id: "5",
        make: "Nissan",
        model: "Altima",
        year: "2020",
        vin: "1N4AL3AP7JC123456",
        licensePlate: "ALT-123",
        lastService: "2024-01-30",
      },
    ],
    history: [
      {
        id: "5",
        date: "2024-01-30",
        type: "service",
        description: "Battery replacement and diagnostics check",
        user: "System",
      },
    ],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-30T00:00:00Z",
    totalSpent: 499.99,
    lastVisit: "2024-01-30",
    preferredContact: "phone",
    notes: "Prefers weekend appointments",
  },
  {
    id: "5",
    name: "VMD5",
    phone: "(555) 567-8901",
    email: "example5@gmail.com",
    address: "123 Main St, City, State 12345",
    vehicles: [
      {
        id: "6",
        make: "Tesla",
        model: "Model 3",
        year: "2023",
        vin: "5YJ3E1EA5LF123456",
        licensePlate: "TES-789",
        lastService: "2024-02-05",
      },
    ],
    history: [
      {
        id: "6",
        date: "2024-02-05",
        type: "service",
        description: "Tire replacement and software update",
        user: "System",
      },
    ],
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
    totalSpent: 1499.99,
    lastVisit: "2024-02-05",
    preferredContact: "email",
    notes: "Prefers digital invoices",
  },
];

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: mockCustomers,

  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        {
          ...customer,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          history: [
            {
              id: uuidv4(),
              date: new Date().toISOString(),
              type: "note",
              description: "Customer account created",
              user: "System",
            },
          ],
          vehicles: [],
        },
        ...state.customers,
      ],
    })),

  updateCustomer: (id, updates) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : customer
      ),
    })),

  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),

  addCustomerHistory: (customerId, entry) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              history: [
                {
                  ...entry,
                  id: uuidv4(),
                  date: new Date().toISOString(),
                },
                ...customer.history,
              ],
              updatedAt: new Date().toISOString(),
            }
          : customer
      ),
    })),

  addCustomerVehicle: (customerId, vehicle) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              vehicles: [
                ...customer.vehicles,
                {
                  ...vehicle,
                  id: uuidv4(),
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : customer
      ),
    })),

  updateCustomerVehicle: (customerId, vehicleId, updates) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              vehicles: customer.vehicles.map((vehicle) =>
                vehicle.id === vehicleId ? { ...vehicle, ...updates } : vehicle
              ),
              updatedAt: new Date().toISOString(),
            }
          : customer
      ),
    })),

  deleteCustomerVehicle: (customerId, vehicleId) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              vehicles: customer.vehicles.filter(
                (vehicle) => vehicle.id !== vehicleId
              ),
              updatedAt: new Date().toISOString(),
            }
          : customer
      ),
    })),
}));
