import { Layout, Space, Avatar, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

export default function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Header.tsx: logout process...");

    try {
      logout({
        logoutParams: {
          returnTo: window.location.origin + "/logout",
        },
      });
      console.log("Header.tsx: Logout successful.");
    } catch (error) {
      console.error("Header.tsx: Logout error:", error);
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="ant-layout-header">
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Space size={24}>
          {isAuthenticated ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Avatar
                src={user?.picture}
                icon={<UserOutlined />}
                style={{
                  cursor: "pointer",
                  backgroundColor: user?.picture ? "transparent" : "#6366f1",
                }}
              />
            </Dropdown>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => {
                console.log("Header.tsx: Login button clicked");
                loginWithRedirect();
              }}
            >
              Login
            </Button>
          )}
        </Space>
      </div>
    </AntHeader>
  );
}
