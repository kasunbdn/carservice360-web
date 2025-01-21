import { Layout, Menu, Typography } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  UserOutlined,
  FileTextOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import type { MenuProps } from "antd";

const { Sider } = Layout;
const { Title } = Typography;
const currentDomain = window.location.origin;
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0();

  const isAdmin = user?.[`${currentDomain}/roles`]?.includes("admin") || false;

  console.log("Sidebar user info:", { isAuthenticated, user, isAdmin });

  const getMenuItems = (isAdmin: boolean): MenuProps["items"] =>
    [
      {
        key: "dashboard",
        type: "group" as const,
        label: "MAIN",
        children: [
          // { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
          {
            key: "/UserDashboard",
            icon: <DashboardOutlined />,
            label: "UserDashboard",
          },
          isAdmin
            ? {
                key: "/AdminDashboard",
                icon: <DashboardOutlined />,
                label: "AdminDashboard",
              }
            : null,
        ].filter(Boolean) as MenuProps["items"],
      },
      {
        key: "operations",
        type: "group" as const,
        label: "OPERATIONS",
        children: [
          {
            key: "/jobmanagement",
            icon: <CarOutlined />,
            label: "Job Management",
          },
        ],
      },
      {
        key: "finance",
        type: "group" as const,
        label: "FINANCE",
        children: [
          { key: "/invoice", icon: <FileTextOutlined />, label: "Invoices" },
        ],
      },
      isAdmin
        ? {
            key: "contacts",
            type: "group" as const,
            label: "CONTACTS",
            children: [
              { key: "/customers", icon: <UserOutlined />, label: "Customers" },
            ],
          }
        : null,
      isAdmin
        ? {
            key: "system",
            type: "group" as const,
            label: "SYSTEM",
            children: [
              {
                key: "/inventory",
                icon: <DatabaseOutlined />,
                label: "Inventory",
              },
            ],
          }
        : null,
    ].filter(Boolean) as MenuProps["items"];

  const menuItems = getMenuItems(isAdmin);

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
