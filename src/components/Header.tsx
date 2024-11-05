import { Layout, Switch, Space, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  BellOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import useThemeStore from "../stores/themeStore";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;

export default function Header() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const userMenuItems: MenuProps["items"] = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "settings" },
    { type: "divider" },
    { key: "log out", label: "Log out" },
  ];
  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Space size={24}>
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <BellOutlined />
        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </Space>
    </AntHeader>
  );
}
