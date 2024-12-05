import { useState } from "react";
import {
  Typography,
  Card,
  Button,
  Modal,
  Space,
  Tag,
  Timeline,
  Descriptions,
  Row,
  Col,
} from "antd";
import { PlusOutlined, HistoryOutlined } from "@ant-design/icons";
import type { Job } from "../types/job";
import JobStatusOverview from "../components/jobs/JobStatusOverview";
import JobFilters from "../components/jobs/JobFilters";
import JobTable from "../components/jobs/JobTable";
import JobForm from "../components/jobs/JobForm";
import { useJobStore } from "../stores/jobStore";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const technicians = [
  { id: "1", name: "Bennet" },
  { id: "2", name: "Sara" },
  { id: "3", name: "Neuvillette" },
  { id: "4", name: "EI" },
];

export default function JobManagement() {
  const { jobs, addJob, updateJob, updateJobStatus } = useJobStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    technician: "",
    dateRange: null as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
  });

  const handleCreateJob = (values: any) => {
    if (selectedJob) {
      updateJob(selectedJob.id, values);
    } else {
      addJob(values);
    }
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsPreviewVisible(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleViewHistory = (job: Job) => {
    setSelectedJob(job);
    setIsHistoryVisible(true);
  };

  const handleClearForm = () => {
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesPriority =
      !filters.priority || job.priority === filters.priority;
    const matchesTechnician =
      !filters.technician || job.technician === filters.technician;
    const matchesDateRange =
      !filters.dateRange ||
      ((!filters.dateRange[0] ||
        new Date(job.createdAt) >= filters.dateRange[0].toDate()) &&
        (!filters.dateRange[1] ||
          new Date(job.createdAt) <= filters.dateRange[1].toDate()));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesTechnician &&
      matchesDateRange
    );
  });

  return (
    <div>
      <Title level={2}>Job Management</Title>

      <JobStatusOverview jobs={jobs} />

      <Card
        style={{ marginTop: 24 }}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <JobFilters
              onSearch={(value) => setFilters({ ...filters, search: value })}
              onStatusChange={(value) =>
                setFilters({ ...filters, status: value })
              }
              onPriorityChange={(value) =>
                setFilters({ ...filters, priority: value })
              }
              onTechnicianChange={(value) =>
                setFilters({ ...filters, technician: value })
              }
              onDateRangeChange={(dates) =>
                setFilters({ ...filters, dateRange: dates })
              }
              technicians={technicians}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedJob(null);
                setIsModalVisible(true);
              }}
            >
              Create New Job
            </Button>
          </div>
        }
      >
        <JobTable
          jobs={filteredJobs}
          onViewJob={handleViewJob}
          onEditJob={handleEditJob}
          onStatusChange={updateJobStatus}
          onViewHistory={handleViewHistory}
        />
      </Card>

      <Modal
        title={selectedJob ? "Edit Job" : "Create New Job"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedJob(null);
        }}
        width={1000}
        footer={null}
      >
        <JobForm
          initialValues={selectedJob || undefined}
          technicians={technicians}
          onSubmit={handleCreateJob}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedJob(null);
          }}
          onClear={handleClearForm}
        />
      </Modal>

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
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setIsPreviewVisible(false);
              setIsModalVisible(true);
            }}
          >
            Edit Job
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
                  {selectedJob.status?.toUpperCase() ?? "UNKNOWN"}
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
                  {selectedJob.priority?.toUpperCase() ?? "UNKNOWN"}
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
      <Modal
        title="Job History"
        open={isHistoryVisible}
        onCancel={() => {
          setIsHistoryVisible(false);
          setSelectedJob(null);
        }}
        footer={[
          <Button key="close" onClick={() => setIsHistoryVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedJob && (
          <Timeline
            items={selectedJob.history.map((event) => ({
              children: (
                <div>
                  <Text strong>{event.action}</Text>
                  <br />
                  <Text type="secondary">
                    {dayjs(event.timestamp).format("YYYY-MM-DD HH:mm")} by{" "}
                    {event.user}
                  </Text>
                </div>
              ),
              dot: <HistoryOutlined />,
            }))}
          />
        )}
      </Modal>
    </div>
  );
}
