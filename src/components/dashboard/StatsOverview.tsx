import { Row, Col } from "antd";
import {
  DollarOutlined,
  CarOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";
import StatsCard from "../StatsCard";
import type { DashboardStats } from "../../types/dashboard";

interface StatsOverviewProps {
  stats: DashboardStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const statsConfig = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />,
      trend: stats.revenueGrowth,
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs.toString(),
      icon: <CarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />,
      trend: stats.jobsGrowth,
    },
    {
      title: "Active Customers",
      value: stats.activeCustomers.toString(),
      icon: <UserOutlined style={{ fontSize: "24px", color: "#6366f1" }} />,
      trend: stats.customersGrowth,
    },
    {
      title: "Pending Invoices",
      value: stats.pendingInvoices.toString(),
      icon: <FileOutlined style={{ fontSize: "24px", color: "#6366f1" }} />,
      trend: stats.invoicesGrowth,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {statsConfig.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <StatsCard {...stat} />
        </Col>
      ))}
    </Row>
  );
}
