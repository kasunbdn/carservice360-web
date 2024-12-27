import { Modal } from "antd";
import JobFormContent from "./JobFormContent";
import type { Job } from "../../types/job";

interface EditJobFormProps {
  job: Job;
  visible: boolean;
  onSubmit: (values: Partial<Job>) => void;
  onCancel: () => void;
  technicians: Array<{ id: string; name: string }>;
}

export default function EditJobForm({
  job,
  visible,
  onSubmit,
  onCancel,
  technicians,
}: EditJobFormProps) {
  console.log("Rendering EditJobForm for job:", job.id);

  return (
    <Modal
      title="Edit Job"
      open={visible}
      onCancel={onCancel}
      width={1000}
      footer={null}
    >
      <JobFormContent
        initialValues={job}
        technicians={technicians}
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitButtonText="Update Job"
      />
    </Modal>
  );
}
