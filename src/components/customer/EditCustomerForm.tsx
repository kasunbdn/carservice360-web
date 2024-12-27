import {
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Button,
  Typography,
} from "antd";
import type { Customer } from "../../types/customer";
import { phoneRegex, emailRegex, formatPhone } from "../../utils/validation";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

interface EditCustomerFormProps {
  customer: Customer;
  onSubmit: (values: Partial<Customer>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function EditCustomerForm({
  customer,
  onSubmit,
  onCancel,
  loading = false,
}: EditCustomerFormProps) {
  const [form] = Form.useForm();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    form.setFieldsValue({ phone: formatted });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        ...customer,
        lastVisit: customer.lastVisit ? dayjs(customer.lastVisit) : undefined,
      }}
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
        <Input onChange={handlePhoneChange} placeholder="(555) 123-4567" />
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
        <TextArea rows={2} />
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

      <Form.Item name="lastVisit" label="Last Visit">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <TextArea rows={4} />
      </Form.Item>

      <Space direction="vertical" style={{ width: "100%" }} size="small">
        <Text type="secondary">
          Total Spent: ${customer.totalSpent.toFixed(2)}
        </Text>
        <Text type="secondary">
          Created: {dayjs(customer.createdAt).format("YYYY-MM-DD")}
        </Text>
        <Text type="secondary">
          Last Updated: {dayjs(customer.updatedAt).format("YYYY-MM-DD")}
        </Text>
      </Space>

      <div style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Customer
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </div>
    </Form>
  );
}
