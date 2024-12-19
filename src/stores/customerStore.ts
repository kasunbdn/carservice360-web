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
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john@example.com",
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
    notes: "Prefers weekend appointments",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "(555) 234-5678",
    email: "jane@example.com",
    address: "456 Oak Ave, City, State 12345",
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
    notes: "Allergic to air fresheners",
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
