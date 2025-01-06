import { Table, Input, InputNumber, Button, Typography, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ServiceItem } from "../../types/job";
import ServiceSelect from "./ServiceSelect";
import { predefinedServices } from "../../data/serviceData";

const { Text } = Typography;

interface ServiceTableProps {
  value?: ServiceItem[];
  onChange?: (services: ServiceItem[]) => void;
}

let serviceIdCounter = 1; // Start counter for service IDs

export default function ServiceTable({
  value = [],
  onChange,
}: ServiceTableProps) {
  const handleAdd = () => {
    const newService: ServiceItem = {
      id: `SERVICE-${serviceIdCounter++}`, // Incremental service ID
      name: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    onChange?.([...value, newService]);
  };

  const handleDelete = (id: string) => {
    onChange?.(value.filter((item) => item.id !== id));
  };

  const handleServiceChange = (
    id: string,
    field: keyof ServiceItem,
    val: any
  ) => {
    const newServices = value.map((service) => {
      if (service.id === id) {
        const updatedService = { ...service, [field]: val };
        if (field === "quantity" || field === "unitPrice") {
          updatedService.total =
            updatedService.quantity * updatedService.unitPrice;
        }
        return updatedService;
      }
      return service;
    });
    onChange?.(newServices);
  };

  const handleServiceSelect = (id: string, serviceName: string) => {
    const service = predefinedServices.find((s) => s.name === serviceName);
    const updatedFields = service
      ? {
          name: serviceName,
          description: `Standard ${serviceName.toLowerCase()} service`,
          unitPrice: service.price,
          total: service.price * 1,
        }
      : {
          name: serviceName,
        };

    // Update all fields in one go
    const newServices = value.map((serviceItem) => {
      if (serviceItem.id === id) {
        return {
          ...serviceItem,
          ...updatedFields,
        };
      }
      return serviceItem;
    });
    console.log("Updated service:", updatedFields);
    onChange?.(newServices);
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (_: any, record: ServiceItem) => (
        <ServiceSelect
          value={record.name}
          onChange={(value) => handleServiceSelect(record.id, value)}
          predefinedServices={predefinedServices}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (_: any, record: ServiceItem) => (
        <Input
          value={record.description}
          onChange={(e) =>
            handleServiceChange(record.id, "description", e.target.value)
          }
          placeholder="Enter description"
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
      render: (_: any, record: ServiceItem) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(val) => handleServiceChange(record.id, "quantity", val)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: "15%",
      render: (_: any, record: ServiceItem) => (
        <InputNumber
          prefix="$"
          min={0}
          value={record.unitPrice}
          onChange={(val) => handleServiceChange(record.id, "unitPrice", val)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "15%",
      render: (value: number) => <Text strong>${value.toFixed(2)}</Text>,
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: ServiceItem) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={value}
        columns={columns}
        rowKey="id"
        pagination={false}
        footer={() => (
          <Button
            type="dashed"
            onClick={handleAdd}
            block
            icon={<PlusOutlined />}
          >
            Add Service
          </Button>
        )}
      />
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Space>
          <Text>Total Amount:</Text>
          <Text strong>
            ${value.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
          </Text>
        </Space>
      </div>
    </div>
  );
}
