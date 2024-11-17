import { Layout, Menu, Typography } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  UserOutlined,
  FileTextOutlined,
  ToolOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  TagOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const menuItems: MenuProps["items"] = [
  {
    key: "dashboard",
    type: "group",
    label: "MAIN",
    children: [
      {
        key: "/",
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
    ],
  },
  {
    key: "operations",
    type: "group",
    label: "OPERATIONS",
    children: [
      {
        key: "/jobs",
        icon: <CarOutlined />,
        label: "Jobs",
      },
      {
        key: "/schedule",
        icon: <ScheduleOutlined />,
        label: "Schedule",
      },
      {
        key: "/services",
        icon: <ToolOutlined />,
        label: "Services",
      },
    ],
  },
  {
    key: "finance",
    type: "group",
    label: "FINANCE",
    children: [
      {
        key: "/invoice",
        icon: <FileTextOutlined />,
        label: "Invoices",
      },
      {
        key: "/expenses",
        icon: <TagOutlined />,
        label: "Expenses",
      },
    ],
  },
  {
    key: "contacts",
    type: "group",
    label: "CONTACTS",
    children: [
      {
        key: "/customers",
        icon: <UserOutlined />,
        label: "Customers",
      },
      {
        key: "/staff",
        icon: <TeamOutlined />,
        label: "Staff",
      },
    ],
  },
  {
    key: "system",
    type: "group",
    label: "SYSTEM",
    children: [
      {
        key: "/inventory",
        icon: <DatabaseOutlined />,
        label: "Inventory",
      },
      {
        key: "/settings",
        icon: <SettingOutlined />,
        label: "Settings",
      },
    ],
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
      }}
      width={260}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          textAlign: "center",
        }}
      >
        <Title level={4} style={{ margin: 0, color: "#6366f1" }}>
          VMD
        </Title>
      </div>
      <div style={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </div>
    </Sider>
  );
}

export default Sidebar;
