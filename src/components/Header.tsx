import { Layout, Space, Avatar, Dropdown } from "antd";
// Switch, BellOutlined, SunOutlined, MoonOutlined,
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;

export default function Header() {
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
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Space size={24}>
        {/* <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <BellOutlined /> */}
        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </Space>
    </AntHeader>
  );
}
