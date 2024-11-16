import { Collapse, Typography } from "antd";
import InvoiceForm from "../components/InvoiceForm";

const { Panel } = Collapse;
const { Title } = Typography;

function Invoice() {
  return (
    <div>
      <Title level={2}>Invoices</Title>
      <Collapse style={{ marginBottom: 24 }}>
        <Panel header="Create New Invoice" key="1">
          <InvoiceForm />
        </Panel>
      </Collapse>
    </div>
  );
}
export default Invoice;
