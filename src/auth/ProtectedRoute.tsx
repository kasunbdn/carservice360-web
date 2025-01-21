import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";
import { Spin, Flex } from "antd";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const currentDomain = window.location.origin;

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const location = useLocation();

  console.log("ProtectedRoute.tsx: ProtectedRoute Auth0 state:", {
    isAuthenticated,
    isLoading,
    user,
    roles: user?.[`${currentDomain}/roles`],
    Domain: currentDomain,
  });

  if (isLoading) {
    console.log("ProtectedRoute.tsx: Loading authentication status...");
    return (
      <Flex
        style={{
          height: "100vh",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  // Redirect to /logout if the user is not authenticated
  if (!isAuthenticated) {
    console.log("ProtectedRoute.tsx: User is not authenticated.");
    return <Navigate to="/logout" state={{ from: location }} replace />;
  }

  // Check if the admin role is required and if the user has it
  if (requireAdmin) {
    const roles = user?.[`${currentDomain}/roles`];
    if (!roles?.includes("admin")) {
      console.log("ProtectedRoute.tsx: User does not have admin role:", roles);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If authenticated and authorized, render the children
  console.log("ProtectedRoute.tsx: User authenticated and authorized:", user);
  return <>{children}</>;
}
