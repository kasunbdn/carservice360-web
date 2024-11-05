import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
// import Jobs from "./pages/Jobs";
// import Customers from "./pages/Customers";
// import Invoice from "./pages/Invoice";
import "./App.css";

const { Content } = Layout;

export default function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header />
          <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* 
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/invoice" element={<Invoice />} /> */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
