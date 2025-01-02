import { Table, Tag, Button, Space, DatePicker, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useJobStore } from "../../../stores/jobStore";
import type { Job } from "../../../types/job";
import dayjs from "dayjs";
import { Typography, Card, Timeline, Descriptions, Row, Col } from "antd";

const { Title, Text } = Typography;

const { RangePicker } = DatePicker;

const technicians = [
  { id: "1", name: "Bennet" },
  { id: "2", name: "Sara" },
  { id: "3", name: "Neuvillette" },
  { id: "4", name: "EI" },
];

export default function UserJobList() {
  const { jobs } = useJobStore();
  const [filters, setFilters] = useState({
    status: "",
    dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null,
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsPreviewVisible(true);
  };

  const columns: ColumnsType<Job> = [
    {
      title: "Job ID",
      dataIndex: "id",
      key: "id",
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
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          pending: "warning",
          in_progress: "processing",
          completed: "success",
          cancelled: "error",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in_progress" },
        { text: "Completed", value: "completed" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Estimated Cost",
      dataIndex: ["service", "estimatedCost"],
      key: "estimatedCost",
      render: (cost: number) => `$${cost.toFixed(2)}`,
      sorter: (a, b) => a.service.estimatedCost - b.service.estimatedCost,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewJob(record)}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          onChange={(dates) =>
            setFilters({
              ...filters,
              dateRange: dates as [dayjs.Dayjs, dayjs.Dayjs],
            })
          }
        />
      </Space>
      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      {/* <Modal
        title="Job Details"
        open={isPreviewVisible}
        onCancel={() => {
          setIsPreviewVisible(false);
          setSelectedJob(null);
        }}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsPreviewVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedJob && (
          <div>
            <h3>Job ID: {selectedJob.id}</h3>
            <p>
              <strong>Customer:</strong> {selectedJob.customer.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedJob.customer.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedJob.customer.email}
            </p>
            <p>
              <strong>Vehicle:</strong> {selectedJob.vehicle.year}{" "}
              {selectedJob.vehicle.make} {selectedJob.vehicle.model} (VIN:{" "}
              {selectedJob.vehicle.vin})
            </p>
            <p>
              <strong>License Plate:</strong> {selectedJob.vehicle.licensePlate}
            </p>
            <p>
              <strong>Service Type:</strong> {selectedJob.service.type}
            </p>
            <p>
              <strong>Service Items:</strong>
            </p>
            <ul>
              {selectedJob.service.items.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.description} (${item.total.toFixed(2)})
                </li>
              ))}
            </ul>
            <p>
              <strong>Estimated Cost:</strong> $
              {selectedJob.service.estimatedCost.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {selectedJob.status}
            </p>
            <p>
              <strong>Priority:</strong> {selectedJob.priority}
            </p>
            <p>
              <strong>Technician ID:</strong> {selectedJob.technician}
            </p>
            <p>
              <strong>Notes:</strong> {selectedJob.notes}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {dayjs(selectedJob.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {dayjs(selectedJob.updatedAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {dayjs(selectedJob.startDate).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              <strong>Estimated Completion:</strong>{" "}
              {dayjs(selectedJob.estimatedCompletion).format(
                "YYYY-MM-DD HH:mm"
              )}
            </p>
            <p>
              <strong>History:</strong>
            </p>
            <ul>
              {selectedJob.history.map((entry, index) => (
                <li key={index}>
                  {dayjs(entry.timestamp).format("YYYY-MM-DD HH:mm")} -{" "}
                  {entry.action} (User: {entry.user})
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal> */}
      <Modal
        title="Job Details"
        open={isPreviewVisible}
        onCancel={() => {
          setIsPreviewVisible(false);
          setSelectedJob(null);
        }}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsPreviewVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedJob && (
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Row gutter={24}>
              <Col span={12}>
                <Descriptions title="Customer Information" column={1}>
                  <Descriptions.Item label="Name">
                    {selectedJob.customer.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {selectedJob.customer.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {selectedJob.customer.email}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12}>
                <Descriptions title="Vehicle Information" column={1}>
                  <Descriptions.Item label="Make">
                    {selectedJob.vehicle.make}
                  </Descriptions.Item>
                  <Descriptions.Item label="Model">
                    {selectedJob.vehicle.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Year">
                    {selectedJob.vehicle.year}
                  </Descriptions.Item>
                  <Descriptions.Item label="VIN">
                    {selectedJob.vehicle.vin}
                  </Descriptions.Item>
                  <Descriptions.Item label="License Plate">
                    {selectedJob.vehicle.licensePlate}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Descriptions title="Service Information" column={2}>
              <Descriptions.Item label="Service Type">
                {selectedJob.service.type}
              </Descriptions.Item>
              <Descriptions.Item label="Estimated Cost">
                ${selectedJob.service.estimatedCost}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    selectedJob.status === "completed"
                      ? "success"
                      : selectedJob.status === "in_progress"
                      ? "processing"
                      : selectedJob.status === "pending"
                      ? "warning"
                      : "default"
                  }
                >
                  {selectedJob.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Tag
                  color={
                    selectedJob.priority === "high"
                      ? "error"
                      : selectedJob.priority === "medium"
                      ? "warning"
                      : "default"
                  }
                >
                  {selectedJob.priority.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Technician">
                {
                  technicians.find((tech) => tech.id === selectedJob.technician)
                    ?.name
                }
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {dayjs(selectedJob.createdAt).format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
            </Descriptions>

            <Card title="Service Items">
              {selectedJob.service.items.map((item) => (
                <div key={item.id} style={{ marginBottom: 16 }}>
                  <Text strong>{item.name}</Text>
                  <br />
                  <Text type="secondary">{item.description}</Text>
                  <br />
                  <Text>
                    Quantity: {item.quantity} × ${item.unitPrice} = $
                    {item.total.toFixed(2)}
                  </Text>
                </div>
              ))}
            </Card>

            {selectedJob.notes && (
              <Card title="Notes">
                <Text>{selectedJob.notes}</Text>
              </Card>
            )}
          </Space>
        )}
      </Modal>
    </div>
  );
}
