import { useState } from "react";
import {
  Collapse,
  Typography,
  Card,
  Space,
  Button,
  Modal,
  Input,
  DatePicker,
  Select,
} from "antd";
//  DownloadOutlined,
import {
  PrinterOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import InvoiceForm from "../components/invoice/InvoiceForm.tsx";
import InvoicePreview from "../components/invoice/InvoicePreview.tsx";
import InvoiceTable from "../components/invoice/InvoiceTable.tsx";
import type { Invoice } from "../types/invoice";
import { mockInvoices } from "../data/mockData.ts";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const { Panel } = Collapse;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function InvoicePage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null,
    status: "",
    search: "",
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // const handleDownload = async () => {
  //   console.log("Downloading PDF...");
  // };

  const filterInvoices = (invoices: Invoice[]) => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.customer.name
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        invoice.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        !filters.status || invoice.status === filters.status;
      const matchesDate =
        !filters.dateRange ||
        (dayjs(invoice.date).isAfter(filters.dateRange[0]) &&
          dayjs(invoice.date).isBefore(filters.dateRange[1]));

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  return (
    <div>
      <Title level={2}>Invoices</Title>

      <Collapse style={{ marginBottom: 24 }}>
        <Panel header="Create New Invoice" key="1">
          <InvoiceForm />
        </Panel>
      </Collapse>

      <Card title="Invoice History">
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Search invoices"
            prefix={<SearchOutlined />}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{ width: 200 }}
          />
          <RangePicker
            onChange={(dates) =>
              setFilters({
                ...filters,
                dateRange: dates as [dayjs.Dayjs, dayjs.Dayjs] | null,
              })
            }
          />
          <Select
            placeholder="Status"
            style={{ width: 120 }}
            allowClear
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Select.Option value="paid">Paid</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="void">Void</Select.Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterVisible(!filterVisible)}
          >
            More Filters
          </Button>
        </Space>

        <InvoiceTable
          invoices={filterInvoices(mockInvoices)}
          onView={(invoice) => {
            setSelectedInvoice(invoice);
            setPreviewVisible(true);
          }}
        />
      </Card>

      <Modal
        title="Invoice Preview"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            Close
          </Button>,
          <Button
            key="print"
            type="primary"
            icon={<PrinterOutlined />}
            onClick={() => reactToPrintFn()}
          >
            Print & Download PDF
          </Button>,
          // <Button
          //   key="download"
          //   type="primary"
          //   icon={<DownloadOutlined />}
          //   onClick={handleDownload}
          // >
          //   Download PDF
          // </Button>,
        ]}
      >
        <div ref={contentRef}>
          {selectedInvoice && <InvoicePreview invoice={selectedInvoice} />}
        </div>
      </Modal>
    </div>
  );
}
