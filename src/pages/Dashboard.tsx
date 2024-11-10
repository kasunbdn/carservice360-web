import { Row, Col, Card, Table, Typography } from "antd";
import { Line, Column } from "@ant-design/charts";
import {
  DollarOutlined,
  CarOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import StatsCard from "../components/StatsCard";
import { useState } from "react";
import type { Invoice } from "../types";

const { Title } = Typography;

function Dashboard() {
  const [loading] = useState(false);

  const invoices: Invoice[] = [
    {
      key: "1",
      id: "INV-001",
      customer: "VMD",
      amount: 250,
      date: "2024-02-15",
      status: "Paid",
      description: "Oil Change + Brake Check",
    },
    {
      key: "2",
      id: "INV-002",
      customer: "CAI",
      amount: 350,
      date: "2024-02-14",
      status: "Pending",
      description: "Full Service",
    },
    {
      key: "3",
      id: "INV-003",
      customer: "MIKO",
      amount: 450,
      date: "2024-02-13",
      status: "Paid",
      description: "Engine Diagnostics",
    },
    {
      key: "4",
      id: "INV-004",
      customer: "EI",
      amount: 330,
      date: "2024-02-13",
      status: "Pending",
      description: "Engine Diagnostics",
    },
    {
      key: "5",
      id: "INV-005",
      customer: "VMD",
      amount: 120,
      date: "2024-02-13",
      status: "Paid",
      description: "Engine Diagnostics",
    },
  ];

  const columns: ColumnsType<Invoice> = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toLocaleString()}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 4500 },
    { month: "Apr", revenue: 5000 },
    { month: "May", revenue: 6200 },
    { month: "Jun", revenue: 4400 },
    { month: "Jul", revenue: 6000 },
    { month: "Aug", revenue: 7000 },
    { month: "Sep", revenue: 5000 },
    { month: "Oct", revenue: 9000 },
    { month: "Nov", revenue: 7000 },
  ];

  const serviceData = [
    { service: "Oil Change", count: 45 },
    { service: "Brake Service", count: 32 },
    { service: "Tire Rotation", count: 28 },
    { service: "Engine Repair", count: 15 },
    { service: "Brake Repair", count: 10 },
    { service: "Tire Repair", count: 8 },
    { service: "Wheel Alignment", count: 6 },
    { service: "Battery Replacement", count: 24 },
    { service: "Transmission Repair", count: 11 },
    { service: "Suspension Repair", count: 2 },
  ];

  //const COLOR_PALETTE = ["#2389ff", "#0dcccc", "#f18e56", "#d787ff", "#7f6bff"];

  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Services Distribution">
            <Column
              data={serviceData}
              xField="service"
              yField="count"
              colorField="service"
              scale={{
                color: {
                  range: ["#ff6347", "#6a5acd"],
                },
              }} // colorField="service"
              // scale={{
              //   color: { range: COLOR_PALETTE },
              // }}
              label={{
                position: "top",
                style: {
                  fill: "#000000",
                  opacity: 0.6,
                },
              }}
              animation={{
                appear: {
                  animation: "fade-in",
                  duration: 1000,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Total Revenue"
                value="$11,441"
                icon={
                  <DollarOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={12.5}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Total Jobs"
                value="210"
                icon={
                  <CarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
                }
                trend={8.2}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Active Customers"
                value="63"
                icon={
                  <UserOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={5.1}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Pending Invoices"
                value="62"
                icon={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={-2.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Pending Invoices"
                value="12"
                icon={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={-2.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Pending Invoices"
                value="12"
                icon={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={-2.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Pending Invoices"
                value="12"
                icon={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={-2.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Pending Invoices"
                value="12"
                icon={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={-2.3}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend">
            <Line
              data={revenueData}
              xField="month"
              yField="revenue"
              point={{ size: 5, shape: "diamond" }}
              smooth
              animation={{
                appear: {
                  animation: "wave-in",
                  duration: 1000,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Row gutter={[16, 16]}>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Revenue Goal"
                value="$20,000"
                icon={
                  <DollarOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={10}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Completed Jobs"
                value="150"
                icon={
                  <CarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
                }
                trend={12.7}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="New Customers"
                value="40"
                icon={
                  <UserOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={6.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="New Customers"
                value="40"
                icon={
                  <UserOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={6.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="New Customers"
                value="40"
                icon={
                  <UserOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={6.3}
              />
            </Col>
            <Col xs={12} lg={12}>
              <StatsCard
                title="Overdue Invoices"
                value="5"
                icon={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#6366f1" }}
                  />
                }
                trend={-1.5}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Card title="Recent Invoices" style={{ marginTop: "24px" }}>
        <Table
          columns={columns}
          dataSource={invoices}
          pagination={{ pageSize: 5 }}
          loading={loading}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
}

export default Dashboard;
