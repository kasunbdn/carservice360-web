import { Typography, Input } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const defaultTerms = `1. All prices are in USD
2. Payment is due upon completion of service
3. Warranty valid for 3 months from service date
4. Parts replaced become the property of the customer
5. Labor warranty is valid for 30 days from service date
6. Any additional work requires customer approval
7. Vehicle test drive may be conducted if necessary
8. We are not responsible for personal items left in vehicle`;

export default function InvoiceTerms() {
  const [terms, setTerms] = useState(defaultTerms);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Title level={5}>Terms and Conditions</Title>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          * These terms are legally binding
        </Text>
      </div>
      <TextArea
        rows={6}
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        style={{ marginBottom: 16 }}
      />
    </div>
  );
}
