import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Typography,
} from "antd";
import { Job } from "../../types/job";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

interface JobFormProps {
  initialValues?: Partial<Job>;
  onSubmit: (values: Partial<Job>) => void;
}

export default function JobForm({ initialValues, onSubmit }: JobFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      requiredMark="optional"
    >
      <Title level={5}>Customer Information</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name={["customer", "name"]}
            label="Customer Name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["customer", "phone"]}
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["customer", "email"]}
            label="Email"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5}>Vehicle Information</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name={["vehicle", "make"]}
            label="Make"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["vehicle", "model"]}
            label="Model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["vehicle", "year"]}
            label="Year"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["vehicle", "licensePlate"]}
            label="License Plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["vehicle", "vin"]} label="VIN">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5}>Service Details</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="serviceType"
            label="Service Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="maintenance">Maintenance</Option>
              <Option value="repair">Repair</Option>
              <Option value="diagnostic">Diagnostic</Option>
              <Option value="inspection">Inspection</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="estimatedCost"
            label="Estimated Cost"
            rules={[{ required: true }]}
          >
            <InputNumber prefix="$" style={{ width: "100%" }} min={0} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Service Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="notes" label="Additional Notes">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Title level={5}>Schedule</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="technician"
            label="Assign Technician"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="john">John Smith</Option>
              <Option value="sarah">Sarah Johnson</Option>
              <Option value="mike">Mike Wilson</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="estimatedCompletion"
            label="Estimated Completion"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
