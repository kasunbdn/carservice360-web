import { Row, Col } from "antd";
import {
  DollarOutlined,
  CarOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total Revenue"
            value="$15,450"
            icon={
              <DollarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={12.5}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total Jobs"
            value="120"
            icon={
              <CarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={8.2}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Active Customers"
            value="85"
            icon={
              <UserOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={5.1}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Pending Invoices"
            value="12"
            icon={
              <FileOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={-2.3}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total Revenue"
            value="$15,450"
            icon={
              <DollarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={12.5}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total Jobs"
            value="120"
            icon={
              <CarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={8.2}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Active Customers"
            value="85"
            icon={
              <UserOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={5.1}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Pending Invoices"
            value="12"
            icon={
              <FileOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={-2.3}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total Revenue"
            value="$15,450"
            icon={
              <DollarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={12.5}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total Jobs"
            value="120"
            icon={
              <CarOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={8.2}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Active Customers"
            value="85"
            icon={
              <UserOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={5.1}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Pending Invoices"
            value="12"
            icon={
              <FileOutlined style={{ fontSize: "24px", color: "#6366f1" }} />
            }
            trend={-2.3}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
