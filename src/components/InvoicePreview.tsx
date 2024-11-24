import { Typography, Descriptions, Table, Divider } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface InvoiceItem {
  service: string;
  qty: number;
  price: number;
}

interface InvoicePreviewProps {
  invoice: {
    id: string;
    date: string;
    customer: string;
    status: string;
    items: InvoiceItem[];
  };
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <div id="invoice-preview" className="invoice-preview">
      <div style={{ padding: "24px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="src\\assets\\a.png"
            alt="Company Logo"
            style={{ height: 60, marginBottom: 16 }}
          />
          <Title level={3}> carservice360 Car Service (Pvt) Ltd</Title>
          <Text>123 Service Road, Anuradhapura</Text>
          <br />
          <Text>Tel: (000) 123-4567 | Email: vmd@carservice360-web.com</Text>
          <br />
          <Text>www.carservice360-web.com</Text>
        </div>

        <Divider />

        <Descriptions title="Invoice Details" bordered column={2}>
          <Descriptions.Item label="Invoice No">{invoice.id}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {dayjs(invoice.date).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Customer">
            {invoice.customer}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{invoice.status}</Descriptions.Item>
        </Descriptions>

        <Table
          style={{ marginTop: 24 }}
          dataSource={invoice.items}
          pagination={false}
          columns={[
            {
              title: "Service",
              dataIndex: "service",
              key: "service",
            },
            {
              title: "Quantity",
              dataIndex: "qty",
              key: "qty",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
              render: (price: number) => `$${price.toFixed(2)}`,
            },
            {
              title: "Total",
              key: "total",
              render: (_, record: InvoiceItem) =>
                `$${(record.qty * record.price).toFixed(2)}`,
            },
          ]}
          summary={(pageData) => {
            const total = pageData.reduce(
              (sum, item: InvoiceItem) => sum + item.qty * item.price,
              0
            );
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <strong>Total Amount</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <strong>${total.toFixed(2)}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Text type="secondary">
            Generated on {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </Text>
          <br />
          <Text strong>Thank you for choosing carservice360 Car Service!</Text>
          <br />
          <Text type="secondary">
            This is a computer-generated invoice. No signature is required.
          </Text>
        </div>
      </div>
    </div>
  );
}
