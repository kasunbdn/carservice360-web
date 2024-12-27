import { Form, Input, Select, Button } from "antd";
import type { CustomerHistory } from "../../types/customer";

const { TextArea } = Input;

interface AddHistoryFormProps {
  onSubmit: (values: Omit<CustomerHistory, "id" | "date">) => void;
  onCancel: () => void;
}

export default function AddHistoryForm({
  onSubmit,
  onCancel,
}: AddHistoryFormProps) {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item name="type" label="Entry Type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="note">Note</Select.Option>
          <Select.Option value="contact">Contact</Select.Option>
          <Select.Option value="update">Update</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Add Entry
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
}
