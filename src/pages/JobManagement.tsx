import { useState } from "react";
import { Typography, Card, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Job } from "../types/job";
import JobStatusOverview from "../components/jobs/JobStatusOverview";
import JobFilters from "../components/jobs/JobFilters";
import JobTable from "../components/jobs/JobTable";
import JobForm from "../components/jobs/JobForm";
import type { Dayjs } from "dayjs";

const { Title } = Typography;

const technicians = [
  { id: "1", name: "VMD" },
  { id: "2", name: "MIKO" },
  { id: "3", name: "REIDEN" },
  { id: "4", name: "CAI" },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    technician: "",
    dateRange: null as [Dayjs | null, Dayjs | null] | null,
  });

  const handleCreateJob = (values: any) => {
    const uniqueId = `JOB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newJob: Job = {
      id: uniqueId,
      ...values,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startDate: new Date().toISOString(),
      history: [
        {
          timestamp: new Date().toISOString(),
          action: "Job Created",
          user: "System",
        },
      ],
    };

    setJobs([newJob, ...jobs]);
    setIsModalVisible(false);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedJob(null);
    setIsModalVisible(false);
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
        />
      </Card>

      <Modal
        title={selectedJob ? "Edit Job" : "Create New Job"}
        open={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <JobForm
          initialValues={selectedJob || undefined}
          technicians={technicians}
          onSubmit={handleCreateJob}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
