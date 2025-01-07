import { Form, Input, Button, Space } from "antd";
import type { CustomerVehicle } from "../../types/customer";

interface VehicleFormProps {
  onSubmit: (values: Omit<CustomerVehicle, "id">) => void;
  onCancel: () => void;
  initialValues?: CustomerVehicle;
}

export default function VehicleForm({
  onSubmit,
  onCancel,
  initialValues,
}: VehicleFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please enter vehicle make" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please enter vehicle model" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="year"
        label="Year"
        rules={[
          { required: true, message: "Please enter vehicle year" },
          { pattern: /^\d{4}$/, message: "Please enter a valid year" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="vin"
        label="VIN"
        rules={[
          { required: true, message: "Please enter VIN" },
          {
            pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
            message: "Please enter a valid VIN",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="licensePlate"
        label="License Plate"
        rules={[{ required: true, message: "Please enter license plate" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Vehicle" : "Add Vehicle"}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
