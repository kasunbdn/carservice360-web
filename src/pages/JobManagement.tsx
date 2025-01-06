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
import type { Job } from "../types/job";
import JobStatusOverview from "../components/jobs/JobStatusOverview";
import JobFilters from "../components/jobs/JobFilters";
import JobTable from "../components/jobs/JobTable";
import CreateJobForm from "../components/jobs/CreateJobForm";
import EditJobForm from "../components/jobs/EditJobForm";
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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
    console.log("Creating new job:", values);
    addJob(values);
  };

  const handleEditJob = (job: Job) => {
    console.log("Opening edit form for job:", job.id);
    setSelectedJob(job);
    setIsEditModalVisible(true);
  };

  const handleUpdateJob = (values: any) => {
    console.log("Updating job:", selectedJob?.id, values);
    if (selectedJob) {
      updateJob(selectedJob.id, values);
      setIsEditModalVisible(false);
      setSelectedJob(null);
    }
  };

  const handleViewJob = (job: Job) => {
    console.log("Viewing job details:", job.id);
    setSelectedJob(job);
    setIsPreviewVisible(true);
  };

  const handleViewHistory = (job: Job) => {
    console.log("Viewing job history:", job.id);
    setSelectedJob(job);
    setIsHistoryVisible(true);
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

      <CreateJobForm
        onSubmit={handleCreateJob}
        onCancel={() => {}}
        technicians={technicians}
      />

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

      {selectedJob && (
        <EditJobForm
          job={selectedJob}
          visible={isEditModalVisible}
          onSubmit={handleUpdateJob}
          onCancel={() => {
            setIsEditModalVisible(false);
            setSelectedJob(null);
          }}
          technicians={technicians}
        />
      )}

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
              setIsEditModalVisible(true);
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
                  {/* <Text strong>{item.name || "Unnamed Service"}</Text> */}
                  <br />
                  <Text type="secondary">{item.description}</Text>
                  <br />
                  <Text>
                    {/* Quantity: {item.quantity} × ${item.unitPrice} = $ */}{" "}
                    Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)} = $
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
        width={800}
        footer={null}
      >
        <Timeline>
          {selectedJob?.history.map((event, index) => (
            <Timeline.Item key={index}>
              <Text>{dayjs(event.timestamp).format("YYYY-MM-DD HH:mm")}</Text>
              <br />
              <Text>{event.action}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Modal>
    </div>
  );
}
