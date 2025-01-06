import { Typography, Row, Col, Card, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserStats from "../components/dashboard/user/UserStats";
import UserJobList from "../components/dashboard/user/UserJobList";
import UserReminders from "../components/dashboard/user/UserReminders";
import { useJobStore } from "../stores/jobStore";

const { Title, Text } = Typography;

export default function UserDashboard() {
  const { jobs } = useJobStore();
  const pendingJobTotal = jobs.filter((job) => job.status === "pending").length;
  const navigate = useNavigate();
  const mockUser = {
    name: "VMD",
  };

  const handleButtonClick = () => {
    navigate("/jobmanagement");
  };
  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>Welcome, {mockUser.name}!</Title>
          <Text>
            You have {pendingJobTotal} {pendingJobTotal === 1 ? "job" : "jobs"}
          </Text>
        </div>

        <UserStats />

        <Card
          title="Job Management"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleButtonClick}
            >
              Submit New Job
            </Button>
          }
        >
          <UserJobList />
        </Card>

        <Row gutter={16}>
          <Col span={24}>
            <UserReminders />
          </Col>
        </Row>
      </Space>
    </div>
  );
}
