import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/JobManagement";
import Customers from "./pages/Customers";
import Invoice from "./pages/Invoice";
import Inventory from "./pages/Inventory";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

const { Content } = Layout;

export default function App() {
  return (
    <Router>
      <Layout hasSider>
        <Sidebar />
        <Layout className="site-layout">
          <Header />
          <Content className="site-content">
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/jobmanagement" element={<Jobs />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/customers" element={<Customers />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
