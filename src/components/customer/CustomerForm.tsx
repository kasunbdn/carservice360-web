import { Form, Input, Select, Space, Button } from "antd";
import { phoneRegex, emailRegex } from "../../utils/validation";
import type { Customer } from "../../types/customer";

const { TextArea } = Input;

interface CustomerFormProps {
  initialValues?: Partial<Customer>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function CustomerForm({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}: CustomerFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...values,
      totalSpent: 0,
      vehicles: [],
      history: [],
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please enter customer name" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please enter phone number" },
          { pattern: phoneRegex, message: "Please enter a valid phone number" },
        ]}
      >
        <Input placeholder="(555) 123-4567" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter email" },
          { pattern: emailRegex, message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter address" }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="preferredContact"
        label="Preferred Contact Method"
        rules={[
          { required: true, message: "Please select preferred contact method" },
        ]}
      >
        <Select>
          <Select.Option value="email">Email</Select.Option>
          <Select.Option value="phone">Phone</Select.Option>
          <Select.Option value="sms">SMS</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {initialValues ? "Update Customer" : "Create Customer"}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
