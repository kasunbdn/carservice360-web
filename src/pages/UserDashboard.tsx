import { Typography, Row, Col, Card, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserStats from "../components/dashboard/user/UserStats";
import UserJobList from "../components/dashboard/user/UserJobList";
import UserReminders from "../components/dashboard/user/UserReminders";
import JobSubmissionForm from "../components/dashboard/user/JobSubmissionForm";
import { useState } from "react";

const { Title, Text } = Typography;

export default function UserDashboard() {
  const [isJobFormVisible, setIsJobFormVisible] = useState(false);
  const navigate = useNavigate();
  const mockUser = {
    name: "VMD",
    pendingJobs: 3,
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
            You have
            {/* {mockUser.pendingJobs}  */} ~~ pending{" "}
            {mockUser.pendingJobs === 1 ? "job" : "jobs"}
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
            // <Button
            //   type="primary"
            //   icon={<PlusOutlined />}
            //   onClick={() => setIsJobFormVisible(true)}
            // >
            //   Submit New Job
            // </Button>
          }
        >
          <UserJobList />
        </Card>

        <Row gutter={16}>
          <Col span={24}>
            <UserReminders />
          </Col>
        </Row>

        <JobSubmissionForm
          visible={isJobFormVisible}
          onCancel={() => setIsJobFormVisible(false)}
          onSubmit={(values) => {
            console.log("New job submission:", values);
            setIsJobFormVisible(false);
          }}
        />
      </Space>
    </div>
  );
}
