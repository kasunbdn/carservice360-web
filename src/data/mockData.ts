// import type { Invoice } from '../types/invoice';
// //mockCustomers
// export const mockInvoices: Invoice[] = [
//   {
//     id: 'INV-2024-001',
//     date: '2024-02-15',
//     serviceAdviser: 'John Smith',
//     customer: {
//       name: 'Alice Johnson',
//       address: '123 Main St',
//     },
//     vehicle: {
//       number: 'ABC123',
//       model: '2020 Toyota Camry',
//       odometer: 50000,
//     },
//     branch: 'Main Branch',
//     jobType: 'Maintenance',
//     items: [
//       {
//         id: '1',
//         service: 'Oil Change',
//         description: 'Full synthetic oil change',
//         quantity: 1,
//         unitPrice: 49.99,
//         discount: 0,
//         net: 49.99,
//       },
//     ],
//     totals: {
//       subtotal: 49.99,
//       discountTotal: 0,
//       taxRate: 0.1,
//       taxAmount: 5.00,
//       grandTotal: 54.99,
//     },
//     status: 'paid',
//     terms: 'Standard terms and conditions apply',
//     createdAt: '2024-02-15T10:00:00Z',
//     updatedAt: '2024-02-15T10:00:00Z',
//   },
//   // Add more mock invoices as needed
// ];

import type { Invoice } from "../types/invoice";

// mockCustomers
export const mockCustomers = [
  {
    id: "CUST-001",
    name: "Alice Johnson",
    address: "123 Main St",
    phone: "555-123-4567",
    email: "alice.johnson@example.com",
    vehicles: [
      {
        number: "ABC123",
        model: "2020 Toyota Camry",
        odometer: 50000,
      },
    ],
  },
  {
    id: "CUST-002",
    name: "Bob Williams",
    address: "456 Elm St",
    phone: "555-987-6543",
    email: "bob.williams@example.com",
    vehicles: [
      {
        number: "XYZ789",
        model: "2018 Honda Civic",
        odometer: 30000,
      },
      {
        number: "DEF456",
        model: "2021 Ford F-150",
        odometer: 10000,
      },
    ],
  },
  // Add more mock customers as needed
];

// mockInvoices
export const mockInvoices: Invoice[] = [
  {
    id: "INV-2024-001",
    date: "2024-02-15",
    serviceAdviser: "John Smith",
    customer: {
      name: "Alice Johnson",
      address: "123 Main St",
    },
    vehicle: {
      number: "ABC123",
      model: "2020 Toyota Camry",
      odometer: 50000,
    },
    branch: "Main Branch",
    jobType: "Maintenance",
    items: [
      {
        id: "1",
        service: "Oil Change",
        description: "Full synthetic oil change",
        quantity: 1,
        unitPrice: 49.99,
        discount: 0,
        net: 49.99,
      },
    ],
    totals: {
      subtotal: 49.99,
      discountTotal: 0,
      taxRate: 0.1,
      taxAmount: 5.0,
      grandTotal: 54.99,
    },
    status: "paid",
    terms: "Standard terms and conditions apply",
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
  },
  // Add more mock invoices as needed
];
