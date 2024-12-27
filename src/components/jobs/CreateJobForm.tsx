import { Card, Collapse } from "antd";
import JobFormContent from "./JobFormContent";
import type { Job } from "../../types/job";

const { Panel } = Collapse;

interface CreateJobFormProps {
  onSubmit: (
    values: Omit<Job, "id" | "createdAt" | "updatedAt" | "history">
  ) => void;
  onCancel: () => void;
  technicians: Array<{ id: string; name: string }>;
}

export default function CreateJobForm({
  onSubmit,
  onCancel,
  technicians,
}: CreateJobFormProps) {
  console.log("Rendering CreateJobForm");

  return (
    <Card>
      <Collapse>
        <Panel header="Create New Job" key="1">
          <JobFormContent
            technicians={technicians}
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitButtonText="Create Job"
          />
        </Panel>
      </Collapse>
    </Card>
  );
}
