import { Row, Col, Card, Typography, Space } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import type { Job } from "../../types/job";

const { Text, Title } = Typography;

interface JobStatusOverviewProps {
  jobs: Job[];
}

export default function JobStatusOverview({ jobs }: JobStatusOverviewProps) {
  const stats = [
    {
      title: "Total Active Jobs",
      value: jobs.filter((job) => job.status === "in_progress").length,
      icon: <ToolOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      color: "#1890ff",
    },
    {
      title: "Pending Jobss",
      value: jobs.filter((job) => job.status === "pending").length,
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: "#faad14" }} />,
      color: "#faad14",
    },
    {
      title: "High Priority",
      value: jobs.filter(
        (job) => job.priority === "high" && job.status !== "completed"
      ).length,
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
      ),
      color: "#ff4d4f",
    },
    {
      title: "Completed Today",
      value: jobs.filter(
        (job) =>
          job.status === "completed" &&
          new Date(job.updatedAt).toDateString() === new Date().toDateString()
      ).length,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      color: "#52c41a",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card hoverable>
            <Space align="start">
              <div
                style={{
                  padding: "12px",
                  borderRadius: "50%",
                  background: `${stat.color}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <Text type="secondary">{stat.title}</Text>
                <Title level={3} style={{ margin: 0, color: stat.color }}>
                  {stat.value}
                </Title>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
