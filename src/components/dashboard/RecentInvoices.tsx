import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RecentInvoice } from "../../types/dashboard";
import dayjs from "dayjs";

interface RecentInvoicesProps {
  invoices: RecentInvoice[];
  loading?: boolean;
}

export default function RecentInvoices({
  invoices,
  loading,
}: RecentInvoicesProps) {
  const columns: ColumnsType<RecentInvoice> = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toLocaleString()}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "paid" | "pending" | "overdue") => {
        const colors = {
          paid: "success",
          pending: "warning",
          overdue: "error",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={invoices}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
}
