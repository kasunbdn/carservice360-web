import { List, Button, Typography, Modal, Space, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { CustomerVehicle } from "../../types/customer";
import VehicleForm from "./VehicleForm";
import dayjs from "dayjs";

const { Text, Title } = Typography;

interface CustomerVehiclesProps {
  vehicles: CustomerVehicle[];
  onAddVehicle: (vehicle: Omit<CustomerVehicle, "id">) => void;
  onUpdateVehicle: (id: string, vehicle: Omit<CustomerVehicle, "id">) => void;
  onDeleteVehicle: (id: string) => void;
}

export default function CustomerVehicles({
  vehicles,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
}: CustomerVehiclesProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] =
    useState<CustomerVehicle | null>(null);

  const handleAddVehicle = (values: Omit<CustomerVehicle, "id">) => {
    onAddVehicle(values);
    setIsModalVisible(false);
  };

  const handleUpdateVehicle = (values: Omit<CustomerVehicle, "id">) => {
    if (selectedVehicle) {
      onUpdateVehicle(selectedVehicle.id, values);
      setIsModalVisible(false);
      setSelectedVehicle(null);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={5}>Vehicles</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedVehicle(null);
            setIsModalVisible(true);
          }}
        >
          Add Vehicle
        </Button>
      </div>

      <List
        dataSource={vehicles}
        renderItem={(vehicle) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setIsModalVisible(true);
                }}
              />,
              <Popconfirm
                key="delete"
                title="Are you sure you want to delete this vehicle?"
                onConfirm={() => onDeleteVehicle(vehicle.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              description={
                <Space direction="vertical" size="small">
                  <Text type="secondary">VIN: {vehicle.vin}</Text>
                  <Text type="secondary">
                    License Plate: {vehicle.licensePlate}
                  </Text>
                  {vehicle.lastService && (
                    <Text type="secondary">
                      Last Service:{" "}
                      {dayjs(vehicle.lastService).format("YYYY-MM-DD")}
                    </Text>
                  )}
                </Space>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title={selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedVehicle(null);
        }}
        footer={null}
      >
        <VehicleForm
          onSubmit={selectedVehicle ? handleUpdateVehicle : handleAddVehicle}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedVehicle(null);
          }}
          initialValues={selectedVehicle || undefined}
        />
      </Modal>
    </div>
  );
}
