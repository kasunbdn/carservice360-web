import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  PrinterOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { jobTypes, branches, serviceAdvisers } from "../mock data/serviceData";

const { Title, Text } = Typography;

function Invoice() {
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const branchOptions = branches.map((branch) => ({
    value: branch.value,
    label: branch.label,
  }));

  const jobTypeOptions = jobTypes.map((type) => ({
    value: type.value,
    label: type.label,
  }));

  const adviserOptions = serviceAdvisers.map((adviser) => ({
    value: adviser.value,
    label: `${adviser.label} - ${adviser.specialization}`,
  }));
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={2}>Create Invoice</Title>
        <Space>
          <Button icon={<SaveOutlined />}>Save Draft</Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Button icon={<DownloadOutlined />} type="primary">
            Download PDF
          </Button>
        </Space>
      </div>
      <div id="invoice-content">
        <Card className="invoice-card">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <img
              src="src/assets/miko.PNG"
              alt="Company Logo"
              style={{ height: 60, marginBottom: 16 }}
            />
            <Title level={3}>VMD (Pvt) Ltd</Title>
            <Text>123 Road, Anuradhapura</Text>
            <br />
            <Text>Tel: (000) 000-0000 | Email: vmd4@gmail.com</Text>
            <br />
            <Text>www.vmd.com</Text>
          </div>

          <Divider />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: 24,
            }}
          >
            <Card
              title="Job Details"
              size="small"
              bordered={false}
              style={{ background: "#fafafa" }}
            >
              <Form layout="vertical" style={{ maxWidth: "100%" }}>
                <Form.Item label="Branch" required>
                  <Select options={branchOptions} />
                </Form.Item>
                <Form.Item label="Vehicle No" required>
                  <Input />
                </Form.Item>
                <Form.Item label="Vehicle Model" required>
                  <Input />
                </Form.Item>
                <Form.Item label="Odometer">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Job Status" required>
                  <Select options={statusOptions} />
                </Form.Item>
                <Form.Item label="Job Type" required>
                  <Select options={jobTypeOptions} />
                </Form.Item>
              </Form>
            </Card>

            <Card
              title="Invoice Details"
              size="small"
              bordered={false}
              style={{ background: "#fafafa" }}
            >
              <Form layout="vertical" style={{ maxWidth: "100%" }}>
                <Form.Item label="Invoice No">
                  <Input
                    disabled
                    value={`INV-${dayjs().format("YYYYMMDD")}-0001`}
                  />
                </Form.Item>
                <Form.Item label="Service Adviser" required>
                  <Select options={adviserOptions} />
                </Form.Item>
                <Form.Item label="Date/Time" required>
                  <DatePicker showTime style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Customer" required>
                  <Input />
                </Form.Item>
                <Form.Item label="NIC/BR">
                  <Input />
                </Form.Item>
                <Form.Item label="Address" required>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Form>
            </Card>
          </div>
          <Divider />

          <Card size="small" bordered={false} style={{ background: "#fafafa" }}>
            InvoiceTerms
            InvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTerm
            sInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvo
            iceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvo
            sInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTerm
            sInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTerm
            sInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTermsInvoiceTerm
          </Card>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Text type="secondary">
              Generated on {dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </Text>
            <br />
            <Text strong>Thank you for choosing VMD Service!</Text>
            <br />
            <Text type="secondary">
              This is a computer-generated invoice. No signature is required.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Invoice;
