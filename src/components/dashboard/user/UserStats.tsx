import { Row, Col } from "antd";
import StatsCard from "../StatsCard";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useJobStore } from "../../../stores/jobStore";

export default function UserStats() {
  const { jobs } = useJobStore();
  const userJobs = jobs; // In production, filter by user ID

  const stats = {
    pending: userJobs.filter((job) => job.status === "pending").length,
    total: userJobs.length,
    completed: userJobs.filter((job) => job.status === "completed").length,
    totalCost: userJobs.reduce(
      (sum, job) => sum + job.service.estimatedCost,
      0
    ),
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Pending Jobs"
          value={stats.pending}
          icon={
            <ClockCircleOutlined
              style={{ fontSize: "24px", color: "#faad14" }}
            />
          }
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Total Jobs"
          value={stats.total}
          icon={<CarOutlined style={{ fontSize: "24px", color: "#1890ff" }} />}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Completed Jobs"
          value={stats.completed}
          icon={
            <CheckCircleOutlined
              style={{ fontSize: "24px", color: "#52c41a" }}
            />
          }
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatsCard
          title="Total Cost"
          value={`$${stats.totalCost.toFixed(2)}`}
          icon={
            <DollarOutlined style={{ fontSize: "24px", color: "#722ed1" }} />
          }
        />
      </Col>
    </Row>
  );
}
