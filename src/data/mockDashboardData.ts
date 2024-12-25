import type {
  DashboardStats,
  RevenueData,
  ServiceDistribution,
  RecentInvoice,
} from "../types/dashboard";

export const mockDashboardData = {
  stats: {
    totalRevenue: 15450,
    totalJobs: 120,
    activeCustomers: 85,
    pendingInvoices: 12,
    revenueGrowth: 12.5,
    jobsGrowth: 8.2,
    customersGrowth: 5.1,
    invoicesGrowth: -2.3,
  } as DashboardStats,

  revenueData: [
    { month: "Jan", revenue: 2500, previousRevenue: 2000 },
    { month: "Feb", revenue: 3500, previousRevenue: 2800 },
    { month: "Mar", revenue: 3000, previousRevenue: 3200 },
    { month: "Apr", revenue: 4500, previousRevenue: 3800 },
    { month: "May", revenue: 4000, previousRevenue: 3500 },
    { month: "Jun", revenue: 5000, previousRevenue: 4200 },
  ] as RevenueData[],

  serviceData: [
    { service: "Oil Change", count: 45, percentage: 37.5 },
    { service: "Brake Service", count: 32, percentage: 26.7 },
    { service: "Tire Rotation", count: 28, percentage: 23.3 },
    { service: "Engine Repair", count: 15, percentage: 12.5 },
  ] as ServiceDistribution[],

  recentInvoices: [
    {
      id: "INV-001",
      customerId: "CUST-001",
      customerName: "VMD 1",
      amount: 250,
      date: "2024-02-15",
      status: "paid",
      description: "Oil Change + Brake Check",
    },
    {
      id: "INV-002",
      customerId: "CUST-002",
      customerName: "VMD 2",
      amount: 350,
      date: "2024-02-14",
      status: "pending",
      description: "Full Service",
    },
    {
      id: "INV-003",
      customerId: "CUST-003",
      customerName: "VMD 3",
      amount: 450,
      date: "2024-02-13",
      status: "overdue",
      description: "Engine Diagnostics",
    },
  ] as RecentInvoice[],
};
