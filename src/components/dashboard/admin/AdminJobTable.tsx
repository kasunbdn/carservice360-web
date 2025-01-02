import { Table, Tag, Space, Button, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useJobStore } from "../../../stores/jobStore";
import type { Job } from "../../../types/job";
import dayjs from "dayjs";

export default function AdminJobTable() {
  const { jobs, updateJobStatus } = useJobStore();

  const columns: ColumnsType<Job> = [
    {
      title: "Job ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Customer",
      dataIndex: ["customer", "name"],
      key: "customer",
      sorter: (a, b) => a.customer.name.localeCompare(b.customer.name),
    },
    {
      title: "Vehicle",
      key: "vehicle",
      render: (_, record) =>
        `${record.vehicle.year} ${record.vehicle.make} ${record.vehicle.model}`,
    },
    {
      title: "Service",
      dataIndex: ["service", "type"],
      key: "service",
      filters: [
        { text: "Maintenance", value: "maintenance" },
        { text: "Repair", value: "repair" },
        { text: "Inspection", value: "inspection" },
      ],
      onFilter: (value, record) => record.service.type === value,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={(value) => updateJobStatus(record.id, value)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="in_progress">In Progress</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="cancelled">Cancelled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const colors = {
          high: "error",
          medium: "warning",
          low: "success",
        };
        return (
          <Tag color={colors[priority as keyof typeof colors]}>
            {priority.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={jobs}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} jobs`,
      }}
    />
  );
}
