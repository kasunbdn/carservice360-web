import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export default function Logout() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as any)?.from?.pathname || "/";

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login...");
      loginWithRedirect({
        appState: { returnTo: from },
      });
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, from, loginWithRedirect]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      {/* <Result
        status="info"
        title="Welcome to carservice360-web"
        subTitle="Please log in to access the system"
      /> */}
    </div>
  );
}
