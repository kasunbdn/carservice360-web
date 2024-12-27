export interface DashboardStats {
  totalRevenue: number;
  totalJobs: number;
  activeCustomers: number;
  pendingInvoices: number;
  revenueGrowth: number;
  jobsGrowth: number;
  customersGrowth: number;
  invoicesGrowth: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  previousRevenue: number;
}

export interface ServiceDistribution {
  service: string;
  count: number;
  percentage: number;
}

export interface RecentInvoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  description: string;
}
