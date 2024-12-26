import { Table, Tag, Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import type { Invoice } from "../../types/invoice";
import dayjs from "dayjs";

interface InvoiceTableProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
}

export default function InvoiceTable({ invoices, onView }: InvoiceTableProps) {
  const columns: ColumnsType<Invoice> = [
    {
      title: "Invoice #",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Customer",
      dataIndex: ["customer", "name"],
      key: "customer",
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
    },
    {
      title: "Amount",
      dataIndex: ["totals", "grandTotal"],
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.totals.grandTotal - b.totals.grandTotal,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Invoice["status"]) => {
        const colors = {
          draft: "default",
          pending: "warning",
          paid: "success",
          void: "error",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "Draft", value: "draft" },
        { text: "Pending", value: "pending" },
        { text: "Paid", value: "paid" },
        { text: "Void", value: "void" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={invoices}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} invoices`,
      }}
    />
  );
}
