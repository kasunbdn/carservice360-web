import { Typography, Row, Col, Card, Space } from "antd";
import AdminStats from "../components/dashboard/admin/AdminStats";
import AdminJobTable from "../components/dashboard/admin/AdminJobTable";
import RevenueChart from "../components/dashboard/admin/RevenueChart";
import ServiceDistributionChart from "../components/dashboard/admin/ServiceDistributionChart";
import AdminTools from "../components/dashboard/admin/AdminTools";

const { Title } = Typography;

export default function AdminDashboard() {
  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2}>Admin Dashboard</Title>

        <AdminStats />

        <Card title="Job Management">
          <AdminJobTable />
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <RevenueChart />
          </Col>
          <Col xs={24} lg={10}>
            <ServiceDistributionChart />
          </Col>
        </Row>

        <AdminTools />
      </Space>
    </div>
  );
}
