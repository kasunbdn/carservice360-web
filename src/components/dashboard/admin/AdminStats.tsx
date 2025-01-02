import { Row, Col } from "antd";
import StatsCard from "../StatsCard";
import {
  CarOutlined,
  DollarOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useJobStore } from "../../../stores/jobStore";

export default function AdminStats() {
  const { jobs } = useJobStore();

  const stats = {
    totalJobs: jobs.length,
    totalRevenue: jobs
      .filter((job) => job.status === "completed")
      .reduce((sum, job) => sum + job.service.estimatedCost, 0),
    activeCustomers: new Set(jobs.map((job) => job.customer.email)).size,
    highPriorityJobs: jobs.filter(
      (job) =>
        job.priority === "high" &&
        job.status !== "completed" &&
        job.status !== "cancelled"
    ).length,
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={<CarOutlined style={{ fontSize: "24px", color: "#1890ff" }} />}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon={
            <DollarOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
          }
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Active Customers"
          value={stats.activeCustomers}
          icon={<UserOutlined style={{ fontSize: "24px", color: "#722ed1" }} />}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="High Priority Jobs"
          value={stats.highPriorityJobs}
          icon={
            <ExclamationCircleOutlined
              style={{ fontSize: "24px", color: "#ff4d4f" }}
            />
          }
        />
      </Col>
    </Row>
  );
}
