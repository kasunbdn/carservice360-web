import {
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Typography,
  Table,
  Space,
} from "antd";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import ServiceSelect from "./ServiceSelect";
import InvoiceTerms from "./InvoiceTerms";
import InvoiceTotals from "./InvoiceTotals";
import InventoryItemsTable from "./InventoryItemsTable";
import { useJobStore } from "../../stores/jobStore";
import { calculateInvoiceTotals } from "../../utils/invoice";
import type { ServiceItem } from "../../types/service";
//import type { Job } from "../../types/job";
import type { SelectedInventoryItem } from "../../types/inventory";
import { predefinedServices } from "../../data/serviceData";

const { Text } = Typography;
const { Option } = Select;

const AddServiceButton = ({ onClick }: { onClick: () => void }) => (
  <Button type="dashed" block icon={<PlusOutlined />} onClick={onClick}>
    Add Service
  </Button>
);

export default function InvoiceForm() {
  //const [form] = Form.useForm();
  const { jobs } = useJobStore();
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [inventoryItems, setInventoryItems] = useState<SelectedInventoryItem[]>(
    []
  );
  //const [taxRate] = useState(0.1); // 10% tax rate

  useEffect(() => {
    if (selectedJobs.length > 0) {
      const jobServices = selectedJobs.flatMap((jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        return (
          job?.service.items.map((item) => ({
            key: `${jobId}-${item.id}`,
            service: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discount: 0,
            net: item.total,
          })) || []
        );
      });
      setItems(jobServices);
    }
  }, [selectedJobs, jobs]);

  const handleAddItem = () => {
    const newItem: ServiceItem = {
      key: Date.now().toString(),
      service: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      net: 0,
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
            field === "quantity" ||
            field === "unitPrice" ||
            field === "discount"
          ) {
            updatedItem.net = calculateNet(
              field === "quantity" ? value : item.quantity,
              field === "unitPrice" ? value : item.unitPrice,
              field === "discount" ? value : item.discount
            );
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateNet = (
    quantity: number,
    unitPrice: number,
    discountPercentage: number
  ) => {
    const total = quantity * unitPrice;
    const discount = total * (discountPercentage / 100);
    return total - discount;
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

  const handleJobSelect = (selectedJobIds: string[]) => {
    setSelectedJobs(selectedJobIds);
  };

  const handleSave = () => {
    const totals = calculateInvoiceTotals(items, inventoryItems);
    console.log("Saving invoice...", {
      jobs: selectedJobs,
      items,
      inventoryItems,
      totals,
    });
  };

  const totals = calculateInvoiceTotals(items, inventoryItems);

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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleItemChange(record.key, "quantity", value)}
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
      dataIndex: "discount",
      key: "discount",
      width: "12%",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={record.discount}
          onChange={(value) => handleItemChange(record.key, "discount", value)}
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
      <div style={{ marginBottom: 24 }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Form.Item label="Select Jobs" style={{ marginBottom: 0, flex: 1 }}>
            <Select
              mode="multiple"
              placeholder="Select related jobs"
              onChange={handleJobSelect}
              style={{ width: "auto", minWidth: 300 }}
            >
              {jobs.map((job) => (
                <Option key={job.id} value={job.id}>
                  {`${job.id} - ${job.customer.name} (${job.vehicle.make} ${job.vehicle.model})`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>
      </div>

      <Card title="Services">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          footer={() => <AddServiceButton onClick={handleAddItem} />}
        />
      </Card>

      <Card title="Inventory Items" style={{ marginTop: 24 }}>
        <InventoryItemsTable
          value={inventoryItems}
          onChange={setInventoryItems}
        />
      </Card>

      <Card style={{ marginTop: 24 }}>
        <InvoiceTotals
          subtotal={totals.subtotal}
          discountTotal={totals.discountTotal}
          inventoryTotal={totals.inventoryTotal}
          taxRate={totals.taxRate}
          taxAmount={totals.taxAmount}
          grandTotal={totals.grandTotal}
        />
      </Card>

      <Card size="small" style={{ marginTop: 24 }}>
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
