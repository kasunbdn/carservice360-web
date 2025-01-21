import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout, Flex, Spin } from "antd";
import Auth0ProviderWithNavigate from "./auth/Auth0Provider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/JobManagement";
import Customers from "./pages/Customers";
import Invoice from "./pages/Invoice";
import Inventory from "./pages/Inventory";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Logout from "./pages/Logout";
import Unauthorized from "./pages/Unauthorized";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

const { Content } = Layout;

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log("App.tsx: Auth state:", { isAuthenticated, isLoading });

  if (isLoading) {
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

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/logout" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Header />
        <Content className="site-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/logout" element={<Logout />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/UserDashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AdminDashboard"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoice"
                element={
                  <ProtectedRoute>
                    <Invoice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobmanagement"
                element={
                  <ProtectedRoute>
                    <Jobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Inventory"
                element={
                  <ProtectedRoute>
                    <Inventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <AppContent />
      </Auth0ProviderWithNavigate>
    </Router>
  );
}
