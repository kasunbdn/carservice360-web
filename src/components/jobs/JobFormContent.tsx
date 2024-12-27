import {
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  Button,
  InputNumber,
  Divider,
} from "antd";
import { useState, useEffect } from "react";
import type { Job, ServiceItem } from "../../types/job";
import ServiceTable from "./ServiceTable";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

interface JobFormContentProps {
  initialValues?: Job;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  technicians: Array<{ id: string; name: string }>;
  submitButtonText: string;
}

const defaultValues = {
  customer: {
    name: "",
    phone: "",
    email: "",
  },
  vehicle: {
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
  },
  service: {
    type: "maintenance",
    items: [],
    estimatedCost: 0,
  },
  status: "pending" as const,
  priority: "medium" as const,
  technician: "",
  startDate: dayjs(),
  estimatedCompletion: dayjs().add(1, "day"),
  notes: "",
};

export default function JobFormContent({
  initialValues,
  onSubmit,
  onCancel,
  technicians,
  submitButtonText,
}: JobFormContentProps) {
  const [form] = Form.useForm();
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>(
    initialValues?.service.items || []
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        estimatedCompletion: dayjs(initialValues.estimatedCompletion),
        startDate: dayjs(initialValues.startDate),
      });
      setServiceItems(initialValues.service.items);
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    console.log("Form values before submit:", values);
    const formattedValues = {
      ...values,
      service: {
        ...values.service,
        items: serviceItems,
        estimatedCost: serviceItems.reduce((sum, item) => sum + item.total, 0),
      },
      startDate: values.startDate.format(),
      estimatedCompletion: values.estimatedCompletion.format(),
    };
    onSubmit(formattedValues);
  };

  const handleClear = () => {
    console.log("Clearing form");

    form.resetFields();

    setServiceItems([]);
  };

  const handleServiceItemsChange = (items: ServiceItem[]) => {
    console.log("Service items changed:", items);
    setServiceItems(items);
    form.setFieldValue(
      ["service", "estimatedCost"],
      items.reduce((sum, item) => sum + item.total, 0)
    );
  };

  const disabledDate = (current: Dayjs) => {
    return current && current.isBefore(dayjs(), "day");
  };

  const validateCompletionDate = (_: any, value: Dayjs) => {
    const startDate = form.getFieldValue("startDate");
    if (!value || !startDate || startDate.isBefore(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Completion date must be after start date")
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={defaultValues}
      className="job-form"
    >
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left">Customer Information</Divider>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name={["customer", "name"]}
            label="Customer Name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name={["customer", "phone"]}
            label="Phone"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input placeholder="(555) 555-5555" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
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

      {/* Vehicle Information Section */}
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left">Vehicle Information</Divider>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name={["vehicle", "make"]}
            label="Make"
            rules={[{ required: true, message: "Please enter vehicle make" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name={["vehicle", "model"]}
            label="Model"
            rules={[{ required: true, message: "Please enter vehicle model" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name={["vehicle", "year"]}
            label="Year"
            rules={[
              { required: true, message: "Please enter vehicle year" },
              { pattern: /^\d{4}$/, message: "Please enter a valid year" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={["vehicle", "vin"]}
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
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={["vehicle", "licensePlate"]}
            label="License Plate"
            rules={[{ required: true, message: "Please enter license plate" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* Service Details Section */}
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left">Service Details</Divider>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name={["service", "type"]}
            label="Service Type"
            rules={[{ required: true, message: "Please select service type" }]}
          >
            <Select>
              <Option value="maintenance">Maintenance</Option>
              <Option value="repair">Repair</Option>
              <Option value="inspection">Inspection</Option>
              <Option value="diagnostic">Diagnostic</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="technician"
            label="Assign Technician"
            rules={[{ required: true, message: "Please select technician" }]}
          >
            <Select>
              {technicians.map((tech) => (
                <Option key={tech.id} value={tech.id}>
                  {tech.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Service Items"
            required
            help="Add at least one service item"
          >
            <ServiceTable
              value={serviceItems}
              onChange={handleServiceItemsChange}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Schedule Section */}
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left">Schedule</Divider>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="estimatedCompletion"
            label="Estimated Completion"
            rules={[
              {
                required: true,
                message: "Please select estimated completion date",
              },
              { validator: validateCompletionDate },
            ]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="notes" label="Additional Notes">
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {submitButtonText}
          </Button>
          <Button onClick={handleClear}>Clear Form</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
