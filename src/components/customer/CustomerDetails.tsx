import { Card, Descriptions, Button, Space, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { Customer } from "../../types/customer";
import EditCustomerForm from "./EditCustomerForm";
import dayjs from "dayjs";

interface CustomerDetailsProps {
  customer: Customer;
  onEdit: (values: Partial<Customer>) => void;
}

export default function CustomerDetails({
  customer,
  onEdit,
}: CustomerDetailsProps) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (values: Partial<Customer>) => {
    try {
      setLoading(true);
      await onEdit(values);
      setIsEditModalVisible(false);
      message.success("Customer updated successfully");
    } catch (error) {
      message.error("Failed to update customer");
      console.error("Error updating customer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        title="Customer Information"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditModalVisible(true)}
          >
            Edit
          </Button>
        }
      >
        <Descriptions column={2}>
          <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="Preferred Contact">
            {customer.preferredContact.toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {customer.address}
          </Descriptions.Item>
          <Descriptions.Item label="Total Spent">
            ${customer.totalSpent.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Last Visit">
            {customer.lastVisit
              ? dayjs(customer.lastVisit).format("YYYY-MM-DD")
              : "Never"}
          </Descriptions.Item>
          {customer.notes && (
            <Descriptions.Item label="Notes" span={2}>
              {customer.notes}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Created">
            {dayjs(customer.createdAt).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Last Updated">
            {dayjs(customer.updatedAt).format("YYYY-MM-DD")}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Edit Customer"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <EditCustomerForm
          customer={customer}
          onSubmit={handleEdit}
          onCancel={() => setIsEditModalVisible(false)}
          loading={loading}
        />
      </Modal>
    </>
  );
}
