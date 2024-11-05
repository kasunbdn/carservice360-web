import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CarOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";

const { Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/jobs",
    icon: <CarOutlined />,
    label: "Make Job",
  },
  {
    key: "/invoice",
    icon: <FileTextOutlined />,
    label: "Make Invoice",
  },
  {
    key: "/customers",
    icon: <UserOutlined />,
    label: "Customers",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider theme="dark" breakpoint="lg" collapsedWidth="0">
      <div style={{ height: 32, margin: 16, background: "#e8eaed" }} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
}
