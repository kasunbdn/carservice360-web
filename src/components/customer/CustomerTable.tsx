import { Table, Button, Tag, Space, Typography } from "antd";
import type { Customer } from "../../types/customer";
import { formatPhone } from "../../utils/validation";

const { Text } = Typography;

interface CustomerTableProps {
  customers: Customer[];
  onViewCustomer: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onViewCustomer,
}: CustomerTableProps) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Customer) => (
        <Button type="link" onClick={() => onViewCustomer(record)}>
          {text}
        </Button>
      ),
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: any, record: Customer) => (
        <Space direction="vertical" size="small">
          <Text>{formatPhone(record.phone)}</Text>
          <Text type="secondary">{record.email}</Text>
        </Space>
      ),
    },
    {
      title: "Vehicles",
      key: "vehicles",
      render: (_: any, record: Customer) => (
        <Space direction="vertical" size="small">
          {record.vehicles.map((vehicle) => (
            <Text key={vehicle.id}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: (a: Customer, b: Customer) => a.totalSpent - b.totalSpent,
    },
    {
      title: "Preferred Contact",
      dataIndex: "preferredContact",
      key: "preferredContact",
      render: (method: string) => (
        <Tag
          color={
            method === "email"
              ? "blue"
              : method === "phone"
              ? "green"
              : "purple"
          }
        >
          {method.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "SMS", value: "sms" },
      ],
      onFilter: (value: string, record: Customer) =>
        record.preferredContact === value,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={customers}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} customers`,
      }}
    />
  );
}
