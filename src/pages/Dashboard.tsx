import { useState, useEffect } from "react";
import { Typography, Row, Col, Card } from "antd";
import StatsOverview from "../components/dashboard/StatsOverview";
import RevenueChart from "../components/dashboard/RevenueChart";
import ServiceDistributionChart from "../components/dashboard/ServiceDistributionChart";
import RecentInvoices from "../components/dashboard/RecentInvoices";
import type {
  DashboardStats,
  RevenueData,
  ServiceDistribution,
  RecentInvoice,
} from "../types/dashboard";
import { mockDashboardData } from "../data/mockDashboardData";

const { Title } = Typography;

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [serviceData, setServiceData] = useState<ServiceDistribution[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<RecentInvoice[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = mockDashboardData;

        setStats(data.stats);
        setRevenueData(data.revenueData);
        setServiceData(data.serviceData);
        setRecentInvoices(data.recentInvoices);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!stats) {
    return null;
  }

  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <StatsOverview stats={stats} />

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={16}>
          <RevenueChart data={revenueData} loading={loading} />
        </Col>
        <Col xs={24} lg={8}>
          <ServiceDistributionChart data={serviceData} loading={loading} />
        </Col>
      </Row>

      <Card title="Recent Invoices" style={{ marginTop: "24px" }}>
        <RecentInvoices invoices={recentInvoices} loading={loading} />
      </Card>
    </div>
  );
}
