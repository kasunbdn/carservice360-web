import { Typography, Descriptions, Table, Divider } from "antd";
import dayjs from "dayjs";
import type { Invoice } from "../../types/invoice";

const { Title, Text } = Typography;

interface InvoicePreviewProps {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <div id="invoice-preview" className="invoice-preview">
      <div style={{ padding: "24px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/logo.png"
            alt="Company Logo"
            style={{ height: 60, marginBottom: 16 }}
          />
          <Title level={3}>Auto Service Pro</Title>
          <Text>123 Service Road, Anytown, USA</Text>
          <br />
          <Text>Tel: (555) 123-4567 | Email: service@autoservicepro.com</Text>
        </div>

        <Divider />

        <Descriptions title="Invoice Details" bordered column={2}>
          <Descriptions.Item label="Invoice No">{invoice.id}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {dayjs(invoice.date).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Customer">
            {invoice.customer.name}
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
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Unit Price",
              dataIndex: "unitPrice",
              key: "unitPrice",
              render: (price: number) => `$${price.toFixed(2)}`,
            },
            {
              title: "Net",
              dataIndex: "net",
              key: "net",
              render: (net: number) => `$${net.toFixed(2)}`,
            },
          ]}
          summary={() => (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <strong>Subtotal</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong>${invoice.totals.subtotal.toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <strong>
                    Tax ({(invoice.totals.taxRate * 100).toFixed(1)}%)
                  </strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong>${invoice.totals.taxAmount.toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <strong>Total Amount</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong>${invoice.totals.grandTotal.toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          )}
        />

        <Divider />

        <div style={{ marginTop: 24 }}>
          <Title level={5}>Terms and Conditions</Title>
          <Text type="secondary">{invoice.terms}</Text>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Text type="secondary">
            Generated on {dayjs().format("YYYY-MM-DD HH:mm:ss")}
          </Text>
          <br />
          <Text strong>Thank you for choosing Auto Service Pro!</Text>
        </div>
      </div>
    </div>
  );
}
