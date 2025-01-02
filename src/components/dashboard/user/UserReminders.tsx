import { Card, Timeline, Tag } from "antd";
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useJobStore } from "../../../stores/jobStore";
import dayjs from "dayjs";

export default function UserReminders() {
  const { jobs } = useJobStore();

  const upcomingJobs = jobs
    .filter((job) => job.status === "pending" || job.status === "in_progress")
    .sort(
      (a, b) =>
        dayjs(a.estimatedCompletion).unix() -
        dayjs(b.estimatedCompletion).unix()
    )
    .slice(0, 5);

  const overdueJobs = jobs.filter(
    (job) =>
      job.status !== "completed" &&
      job.status !== "cancelled" &&
      dayjs(job.estimatedCompletion).isBefore(dayjs())
  );

  return (
    <Card title="Reminders">
      {overdueJobs.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Tag color="error" icon={<ExclamationCircleOutlined />}>
            You have {overdueJobs.length} overdue{" "}
            {overdueJobs.length === 1 ? "job" : "jobs"}
          </Tag>
        </div>
      )}

      <Timeline
        items={upcomingJobs.map((job) => ({
          color: dayjs(job.estimatedCompletion).isBefore(dayjs())
            ? "red"
            : "blue",
          dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
          children: (
            <div>
              <div style={{ fontWeight: "bold" }}>
                {job.service.type.charAt(0).toUpperCase() +
                  job.service.type.slice(1)}
              </div>
              <div>
                {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
              </div>
              <div style={{ color: "#666" }}>
                Due: {dayjs(job.estimatedCompletion).format("MMM D, YYYY")}
              </div>
            </div>
          ),
        }))}
      />
    </Card>
  );
}
