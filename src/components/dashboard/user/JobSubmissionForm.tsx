import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Space,
} from "antd";
import { useJobStore } from "../../../stores/jobStore";
import dayjs from "dayjs";

interface JobSubmissionFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default function JobSubmissionForm({
  visible,
  onCancel,
  onSubmit,
}: JobSubmissionFormProps) {
  const [form] = Form.useForm();
  const { addJob } = useJobStore();

  const handleSubmit = (values: any) => {
    const formattedValues = {
      customer: {
        name: values.customerName,
        phone: values.customerPhone,
        email: values.customerEmail,
      },
      vehicle: {
        make: values.vehicleMake,
        model: values.vehicleModel,
        year: values.vehicleYear,
        vin: values.vehicleVin,
        licensePlate: values.vehicleLicensePlate,
      },
      service: {
        type: values.serviceType,
        items: [],
        estimatedCost: values.estimatedCost,
      },
      status: "pending",
      priority: values.priority,
      technician: values.technician,
      startDate: values.startDate.format(),
      estimatedCompletion: values.estimatedCompletion.format(),
      notes: values.notes,
    };

    addJob(formattedValues);
    onSubmit(formattedValues);
    form.resetFields();
  };

  return (
    <Modal
      title="Submit New Job Request"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="customerName"
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Space style={{ width: "100%" }} size="large">
          <Form.Item
            name="customerPhone"
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="customerEmail"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Space>

        <Space style={{ width: "100%" }} size="large">
          <Form.Item
            name="vehicleMake"
            label="Make"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="vehicleModel"
            label="Model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="vehicleYear"
            label="Year"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Space>

        <Space style={{ width: "100%" }} size="large">
          <Form.Item name="vehicleVin" label="VIN" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="vehicleLicensePlate"
            label="License Plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Space>

        <Space style={{ width: "100%" }} size="large">
          <Form.Item
            name="serviceType"
            label="Service Type"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 200 }}>
              <Select.Option value="maintenance">Maintenance</Select.Option>
              <Select.Option value="repair">Repair</Select.Option>
              <Select.Option value="inspection">Inspection</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 200 }}>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
        </Space>

        <Form.Item
          name="estimatedCost"
          label="Estimated Cost"
          rules={[{ required: true }]}
        >
          <InputNumber prefix="$" style={{ width: 200 }} min={0} step={0.01} />
        </Form.Item>

        <Space style={{ width: "100%" }} size="large">
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="estimatedCompletion"
            label="Estimated Completion"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Space>

        <Form.Item name="notes" label="Additional Notes">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
