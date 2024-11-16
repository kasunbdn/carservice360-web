import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Typography,
  Divider,
  Table,
} from "antd";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import ServiceSelect from "./ServiceSelect";
import InvoiceTerms from "./InvoiceTerms";
import InvoiceTotals from "./InvoiceTotals";
import {
  predefinedServices,
  jobTypes,
  branches,
  serviceAdvisers,
} from "../mock data/serviceData";

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

export default function InvoiceForm() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [taxRate] = useState(0);

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
      netTotal,
      taxAmount,
      grandTotal: netTotal + taxAmount,
    };
  };

  const handleSave = () => {
    console.log("Saving invoice...");
  };

  const totals = calculateTotals();

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: 24,
        }}
      >
        <Card title="Job Details" size="small">
          <Form layout="vertical" style={{ maxWidth: "100%" }}>
            <Form.Item label="Branch" required>
              <Select options={branches} />
            </Form.Item>
            <Form.Item label="Vehicle No" required>
              <Input />
            </Form.Item>
            <Form.Item label="Vehicle Model" required>
              <Input />
            </Form.Item>
            <Form.Item label="Odometer">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Job Type" required>
              <Select options={jobTypes} />
            </Form.Item>
          </Form>
        </Card>

        <Card title="Invoice Details" size="small">
          <Form layout="vertical" style={{ maxWidth: "100%" }}>
            <Form.Item label="Service Adviser" required>
              <Select options={serviceAdvisers} />
            </Form.Item>
            <Form.Item label="Date/Time" required>
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Customer" required>
              <Input />
            </Form.Item>
            <Form.Item label="NIC/BR">
              <Input />
            </Form.Item>
            <Form.Item label="Address" required>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Form>
        </Card>
      </div>

      <Card title="Services">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          footer={() => (
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={handleAddItem}
            >
              Add Service
            </Button>
          )}
        />

        <InvoiceTotals
          subtotal={totals.subtotal}
          discountTotal={totals.discountTotal}
          taxRate={taxRate}
          taxAmount={totals.taxAmount}
          grandTotal={totals.grandTotal}
        />
      </Card>

      <Divider />

      <Card size="small">
        <InvoiceTerms />
      </Card>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          Save Invoice
        </Button>
      </div>
    </div>
  );
}
