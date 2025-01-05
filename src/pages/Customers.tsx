import { useState } from "react";
import { Typography, Input, Button, Space, Card, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Customer } from "../types/customer";
import { useCustomerStore } from "../stores/customerStore";
import CustomerTable from "../components/customer/CustomerTable";
import CustomerForm from "../components/customer/CustomerForm";
import CustomerDetails from "../components/customer/CustomerDetails";
import CustomerVehicles from "../components/customer/CustomerVehicles";
import CustomerHistory from "../components/customer/CustomerHistory";

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

export default function Customers() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    addCustomerHistory,
    addCustomerVehicle,
    updateCustomerVehicle,
    deleteCustomerVehicle,
  } = useCustomerStore();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCustomer = async (values: any) => {
    try {
      setLoading(true);
      addCustomer(values);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCustomer = async (values: any) => {
    if (!selectedCustomer) return;
    try {
      setLoading(true);
      updateCustomer(selectedCustomer.id, values);
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error updating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = (customerId: string) => async (values: any) => {
    try {
      setLoading(true);
      addCustomerVehicle(customerId, values);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateVehicle =
    (customerId: string) => async (vehicleId: string, values: any) => {
      try {
        setLoading(true);
        updateCustomerVehicle(customerId, vehicleId, values);
      } catch (error) {
        console.error("Error updating vehicle:", error);
      } finally {
        setLoading(false);
      }
    };

  const handleDeleteVehicle =
    (customerId: string) => async (vehicleId: string) => {
      try {
        setLoading(true);
        deleteCustomerVehicle(customerId, vehicleId);
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      } finally {
        setLoading(false);
      }
    };

  const handleAddHistory = (customerId: string) => async (values: any) => {
    try {
      setLoading(true);
      addCustomerHistory(customerId, {
        ...values,
        user: "System",
      });
    } catch (error) {
      console.error("Error adding history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.includes(searchText)
  );

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={2}>Customers</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Add Customer
          </Button>
        </div>

        <Card>
          <Space style={{ marginBottom: 16 }}>
            <Search
              placeholder="Search customers"
              allowClear
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>

          <CustomerTable
            customers={filteredCustomers}
            onViewCustomer={(customer) => {
              setSelectedCustomer(customer);
              setIsDetailsModalVisible(true);
            }}
          />
        </Card>

        <Modal
          title="Add New Customer"
          open={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          footer={null}
          width={800}
        >
          <CustomerForm
            onSubmit={handleCreateCustomer}
            onCancel={() => setIsCreateModalVisible(false)}
            loading={loading}
          />
        </Modal>

        <Modal
          title="Customer Details"
          open={isDetailsModalVisible}
          onCancel={() => {
            setIsDetailsModalVisible(false);
            setSelectedCustomer(null);
          }}
          footer={null}
          width={1000}
        >
          {selectedCustomer && (
            <Tabs defaultActiveKey="details">
              <TabPane tab="Details" key="details">
                <CustomerDetails
                  customer={selectedCustomer}
                  onEdit={handleUpdateCustomer}
                />
              </TabPane>
              <TabPane tab="Vehicles" key="vehicles">
                <CustomerVehicles
                  vehicles={selectedCustomer.vehicles}
                  onAddVehicle={handleAddVehicle(selectedCustomer.id)}
                  onUpdateVehicle={handleUpdateVehicle(selectedCustomer.id)}
                  onDeleteVehicle={handleDeleteVehicle(selectedCustomer.id)}
                />
              </TabPane>
              <TabPane tab="History" key="history">
                <CustomerHistory
                  history={selectedCustomer.history}
                  onAddHistory={handleAddHistory(selectedCustomer.id)}
                />
              </TabPane>
            </Tabs>
          )}
        </Modal>
      </Space>
    </div>
  );
}
