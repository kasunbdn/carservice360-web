import { Form, Input, Select, DatePicker, Space, Row, Col, Button } from "antd";
import type { Job } from "../../types/job";
import ServiceTable from "./ServiceTable";

const { TextArea } = Input;

interface JobFormProps {
  initialValues?: Partial<Job>;
  technicians: { id: string; name: string }[];
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export default function JobForm({
  initialValues,
  technicians,
  onSubmit,
  onCancel,
}: JobFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const totalCost =
      values.service?.items?.reduce(
        (sum: number, item: any) => sum + item.total,
        0
      ) || 0;
    onSubmit({
      ...values,
      service: {
        ...values.service,
        estimatedCost: totalCost,
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col span={24}>
          <h3>Customer Information</h3>
        </Col>
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
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <h3>Vehicle Information</h3>
        </Col>
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
        <Col span={24}>
          <Form.Item
            name={["vehicle", "vin"]}
            label="VIN"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <h3>Service Details</h3>
        </Col>
        <Col span={12}>
          <Form.Item
            name={["service", "type"]}
            label="Service Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="maintenance">Maintenance</Select.Option>
              <Select.Option value="repair">Repair</Select.Option>
              <Select.Option value="diagnostic">Diagnostic</Select.Option>
              <Select.Option value="inspection">Inspection</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name={["service", "items"]}
            label="Service Items"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please add at least one service item",
            //   },
            // ]}
          >
            <ServiceTable />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <h3>Additional Information</h3>
        </Col>
        <Col span={12}>
          <Form.Item
            name="technician"
            label="Assign Technician"
            rules={[{ required: true }]}
          >
            <Select>
              {technicians.map((tech) => (
                <Select.Option key={tech.id} value={tech.id}>
                  {tech.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="estimatedCompletion"
            label="Estimated Completion"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="notes" label="Special Instructions">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <div style={{ textAlign: "right", marginTop: 24 }}>
        {/* <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Job" : "Create Job"}
          </Button>
        </Space> */}
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" disabled={!!initialValues}>
            {initialValues ? "Update Job" : "Create Job"}
          </Button>
        </Space>
      </div>
    </Form>
  );
}
