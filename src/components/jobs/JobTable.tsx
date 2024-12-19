import { Table, Tag, Space, Button, Tooltip, Select, Typography } from "antd";
import { EditOutlined, EyeOutlined, HistoryOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Job } from "../../types/job";
import dayjs from "dayjs";

const { Text } = Typography;

interface JobTableProps {
  jobs: Job[];
  onViewJob: (job: Job) => void;
  onEditJob: (job: Job) => void;
  onStatusChange: (jobId: string, status: Job["status"]) => void;
  onViewHistory: (job: Job) => void;
}

export default function JobTable({
  jobs,
  onViewJob,
  onEditJob,
  onStatusChange,
  onViewHistory,
}: JobTableProps) {
  const getStatusColor = (status: Job["status"]) => {
    const colors = {
      pending: "#faad14",
      in_progress: "#1890ff",
      completed: "#52c41a",
      cancelled: "#ff4d4f",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Job["priority"]) => {
    const colors = {
      low: "#52c41a",
      medium: "#faad14",
      high: "#ff4d4f",
    };
    return colors[priority];
  };

  const columns: ColumnsType<Job> = [
    {
      title: "Job ID",
      key: "id",
      render: (_, record) => (
        <Button type="link" onClick={() => onViewJob(record)}>
          {record.id}
        </Button>
      ),
    },
    {
      title: "Customer",
      dataIndex: ["customer", "name"],
      key: "customerName",
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
      key: "service",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Text>
            {record.service.type.charAt(0).toUpperCase() +
              record.service.type.slice(1)}
          </Text>
          {record.service.items.map((item) => (
            <Text key={item.id} type="secondary" style={{ fontSize: "12px" }}>
              {item.name}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Job["status"], record) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(value) =>
            onStatusChange(record.id, value as Job["status"])
          }
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
      render: (priority: Job["priority"]) => (
        <Tag color={getPriorityColor(priority)}>{priority.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Est. Cost",
      dataIndex: ["service", "estimatedCost"],
      key: "estimatedCost",
      render: (cost: number) => `$${cost.toFixed(2)}`,
      sorter: (a, b) => a.service.estimatedCost - b.service.estimatedCost,
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
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onViewJob(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditJob(record)}
            />
          </Tooltip>
          <Tooltip title="View History">
            <Button
              type="text"
              icon={<HistoryOutlined />}
              onClick={() => onViewHistory(record)}
            />
          </Tooltip>
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
      scroll={{ x: true }}
    />
  );
}
