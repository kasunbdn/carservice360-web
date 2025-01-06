import { Typography, Descriptions, Table, Divider, Space, Tag } from "antd";
import dayjs from "dayjs";
import type { Invoice } from "../../types/invoice";
//import type { SelectedInventoryItem } from "../../types/inventory";

const { Title, Text } = Typography;

interface InvoicePreviewProps {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <div id="invoice-preview" className="invoice-preview">
      <div style={{ padding: "24px", background: "#fff" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3}>carservice360 Car Service (Pvt) Ltd</Title>
          <Text>123 Service Road, Anuradhapura</Text>
          <br />
          <Text>Tel: (000) 123-4567 | Email: vmd@carservice360-web.com</Text>
        </div>

        <Divider />

        {/* Invoice Details */}
        <Descriptions title="Invoice Details" bordered column={2}>
          <Descriptions.Item label="Invoice No">{invoice.id}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {dayjs(invoice.date).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Customer">
            {invoice.customer.name}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={
                invoice.status === "paid"
                  ? "success"
                  : invoice.status === "pending"
                  ? "warning"
                  : "default"
              }
            >
              {invoice.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {invoice.customer.address}
          </Descriptions.Item>
        </Descriptions>

        {/* Related Jobs */}
        {/* {invoice.relatedJobs && (
          <div style={{ marginTop: 24 }}>
            <Title level={5}>Related Jobs</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              {invoice.relatedJobs.map((jobId) => (
                <Text key={jobId} code>
                  {jobId}
                </Text>
              ))}
            </Space>
          </div>
        )} */}

        {/* Services Table */}
        <div style={{ marginTop: 24 }}>
          <Title level={5}>Services</Title>
          <Table
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
                title: "Discount",
                dataIndex: "discount",
                key: "discount",
                render: (discount: number) => `${discount}%`,
              },
              {
                title: "Net",
                dataIndex: "net",
                key: "net",
                render: (net: number) => `$${net.toFixed(2)}`,
              },
            ]}
          />
        </div>

        {/* Inventory Items Table */}
        {invoice.inventoryItems && invoice.inventoryItems.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <Title level={5}>Parts & Materials</Title>
            <Table
              dataSource={invoice.inventoryItems}
              pagination={false}
              columns={[
                {
                  title: "Item",
                  dataIndex: ["inventoryItem", "name"],
                  key: "name",
                },
                {
                  title: "Part Number",
                  dataIndex: ["inventoryItem", "partNumber"],
                  key: "partNumber",
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
                  title: "Total",
                  dataIndex: "total",
                  key: "total",
                  render: (total: number) => `$${total.toFixed(2)}`,
                },
              ]}
            />
          </div>
        )}

        {/* Totals */}
        <div
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ width: 300 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Services Subtotal:</Text>
                <Text>${invoice.totals.subtotal.toFixed(2)}</Text>
              </div>
              {invoice.totals.inventoryTotal > 0 && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text>Parts & Materials:</Text>
                  <Text>${invoice.totals.inventoryTotal.toFixed(2)}</Text>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Discount Total:</Text>
                <Text type="success">
                  -${invoice.totals.discountTotal.toFixed(2)}
                </Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Tax ({(invoice.totals.taxRate * 100).toFixed(1)}%):</Text>
                <Text>${invoice.totals.taxAmount.toFixed(2)}</Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title level={4}>Grand Total:</Title>
                <Title level={4}>${invoice.totals.grandTotal.toFixed(2)}</Title>
              </div>
            </Space>
          </div>
        </div>

        <Divider />

        {/* Terms and Footer */}
        <div style={{ marginTop: 24 }}>
          <Title level={5}>Terms and Conditions</Title>
          <Text type="secondary">{invoice.terms}</Text>
        </div>

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
