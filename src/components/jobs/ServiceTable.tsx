import { Table, Input, InputNumber, Button, Typography, Divider } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import ServiceSelect from "../ServiceSelect";
import { predefinedServices } from "../../mock data/serviceData";

const { Text } = Typography;

interface ServiceItem {
  key: string;
  service: string;
  description: string;
  qty: number;
  unitPrice: number;
  discount: number;
  discountPercentage: number;
  net: number;
  amount: number;
}

const AddServiceButton = ({ onClick }: { onClick: () => void }) => (
  <Button type="dashed" block icon={<PlusOutlined />} onClick={onClick}>
    Add Service
  </Button>
);

export default function ServiceTable() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [taxRate] = useState(0); // Tax rate for calculations, you can customize or remove if unnecessary.

  const calculateNet = (
    qty: number,
    unitPrice: number,
    discountPercentage: number
  ) => {
    const total = qty * unitPrice;
    const discount = total * (discountPercentage / 100);
    return total - discount;
  };

  const handleAddItem = () => {
    const newItem: ServiceItem = {
      key: Date.now().toString(),
      service: "",
      description: "",
      qty: 1,
      unitPrice: 0,
      discount: 0,
      discountPercentage: 0,
      net: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (key: string) => {
    setItems(items.filter((item) => item.key !== key));
  };

  const handleItemChange = (
    key: string,
    field: keyof ServiceItem,
    value: any
  ) => {
    setItems(
      items.map((item) => {
        if (item.key === key) {
          const updatedItem = { ...item, [field]: value };

          if (
            field === "qty" ||
            field === "unitPrice" ||
            field === "discountPercentage"
          ) {
            updatedItem.net = calculateNet(
              field === "qty" ? value : item.qty,
              field === "unitPrice" ? value : item.unitPrice,
              field === "discountPercentage" ? value : item.discountPercentage
            );
            updatedItem.amount = updatedItem.net;
            updatedItem.discount =
              updatedItem.qty * updatedItem.unitPrice - updatedItem.net;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleServiceSelect = (key: string, serviceName: string) => {
    const service = predefinedServices.find((s) => s.name === serviceName);
    if (service) {
      handleItemChange(key, "service", serviceName);
      handleItemChange(
        key,
        "description",
        `Standard ${serviceName.toLowerCase()} service`
      );
      handleItemChange(key, "unitPrice", service.price);
    } else {
      handleItemChange(key, "service", serviceName);
    }
  };

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.qty * item.unitPrice,
      0
    );
    const discountTotal = items.reduce((sum, item) => sum + item.discount, 0);
    const netTotal = subtotal - discountTotal;
    const taxAmount = netTotal * taxRate;
    return {
      subtotal,
      discountTotal,
      grandTotal: netTotal + taxAmount,
    };
  };

  const totals = calculateTotals();

  const columns: ColumnsType<ServiceItem> = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      width: "25%",
      render: (_, record) => (
        <ServiceSelect
          value={record.service}
          onChange={(value) => handleServiceSelect(record.key, value)}
          predefinedServices={predefinedServices}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      render: (_, record) => (
        <Input
          placeholder="Enter description"
          value={record.description}
          onChange={(e) =>
            handleItemChange(record.key, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
      width: "10%",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.qty}
          onChange={(value) => handleItemChange(record.key, "qty", value)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: "15%",
      render: (_, record) => (
        <InputNumber
          prefix="$"
          min={0}
          value={record.unitPrice}
          onChange={(value) => handleItemChange(record.key, "unitPrice", value)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      width: "12%",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={record.discountPercentage}
          onChange={(value) =>
            handleItemChange(record.key, "discountPercentage", value)
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Net",
      dataIndex: "net",
      key: "net",
      width: "12%",
      render: (net) => <Text strong>${net.toFixed(2)}</Text>,
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteItem(record.key)}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        footer={() => <AddServiceButton onClick={handleAddItem} />}
      />
      <Divider />
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Text strong>Subtotal:</Text> ${totals.subtotal.toFixed(2)}
        <br />
        <Text strong>Discount Total:</Text> ${totals.discountTotal.toFixed(2)}
        <br />
        <Text strong>Grand Total:</Text> ${totals.grandTotal.toFixed(2)}
      </div>
    </div>
  );
}
