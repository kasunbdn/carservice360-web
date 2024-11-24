import { useState } from "react";
import {
  Collapse,
  Typography,
  Card,
  Table,
  Space,
  Button,
  Modal,
  Input,
  DatePicker,
  Select,
} from "antd";
import InvoiceForm from "../components/InvoiceForm";
import {
  PrinterOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import InvoicePreview from "../components/InvoicePreview";
import { generatePDF } from "../utils/pdfGenerator";

const { Panel } = Collapse;
const { Title } = Typography;
const { RangePicker } = DatePicker;

interface InvoiceRecord {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: string;
  items: any[];
}

const mockInvoices: InvoiceRecord[] = [
  {
    id: "INV-20240215-001",
    date: "2024-02-15",
    customer: "Miko",
    amount: 299.99,
    status: "Paid",
    items: [
      { service: "Oil Change", qty: 1, price: 49.99 },
      { service: "Brake Service", qty: 1, price: 250.0 },
    ],
  },
  {
    id: "INV-20240214-002",
    date: "2024-02-14",
    customer: "Arlecchino",
    amount: 159.99,
    status: "Pending",
    items: [{ service: "Tire Rotation", qty: 4, price: 159.99 }],
  },
];

function Invoice() {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(
    null
  );
  const [previewVisible, setPreviewVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  // const [filters, setFilters] = useState({
  //   dateRange: null,
  //   status: "",
  //   search: "",
  // });
  const [filters, setFilters] = useState<{
    dateRange: dayjs.Dayjs[] | null;
    status: string;
    search: string;
  }>({
    dateRange: null,
    status: "",
    search: "",
  });

  const columns: ColumnsType<InvoiceRecord> = [
    {
      title: "Invoice #",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setSelectedInvoice(record);
              setPreviewVisible(true);
            }}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(record)}
          >
            Print
          </Button>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          >
            PDF
          </Button>
        </Space>
      ),
    },
  ];

  const handlePrint = async (_invoice: InvoiceRecord) => {
    const element = document.getElementById("invoice-preview");
    if (element) {
      window.print();
    }
  };

  const handleDownload = async (invoice: InvoiceRecord) => {
    await generatePDF(invoice);
  };

  const filterInvoices = (invoices: InvoiceRecord[]) => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
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
          {/* <RangePicker
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          /> */}
          <RangePicker
            onChange={(dates) =>
              setFilters({
                ...filters,
                dateRange:
                  dates?.filter((date): date is dayjs.Dayjs => date !== null) ||
                  null,
              })
            }
          />

          <Select
            placeholder="Status"
            style={{ width: 120 }}
            allowClear
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Select.Option value="Paid">Paid</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
          </Select>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterVisible(!filterVisible)}
          >
            More Filters
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filterInvoices(mockInvoices)}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} invoices`,
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
            onClick={() => handlePrint(selectedInvoice!)}
          >
            Print
          </Button>,
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(selectedInvoice!)}
          >
            Download PDF
          </Button>,
        ]}
      >
        {selectedInvoice && <InvoicePreview invoice={selectedInvoice} />}
      </Modal>
    </div>
  );
}
export default Invoice;
