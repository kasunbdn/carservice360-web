import { Typography, Divider } from "antd";

const { Text, Title } = Typography;

interface InvoiceTotalsProps {
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxRate?: number;
  readonly taxAmount?: number;
  readonly grandTotal: number;
}

export default function InvoiceTotals({
  subtotal,
  discountTotal,
  taxRate = 0,
  taxAmount = 0,
  grandTotal,
}: InvoiceTotalsProps) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
      <div style={{ width: 300 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text>Subtotal:</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text>Discount Total:</Text>
          <Text type={discountTotal > 0 ? "success" : undefined}>
            -${discountTotal.toFixed(2)}
          </Text>
        </div>
        {taxRate > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text>Tax ({(taxRate * 100).toFixed(1)}%):</Text>
            <Text>${taxAmount.toFixed(2)}</Text>
          </div>
        )}
        <Divider style={{ margin: "12px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={4}>Grand Total:</Title>
          <Title level={4}>${grandTotal.toFixed(2)}</Title>
        </div>
      </div>
    </div>
  );
}
