import { Space, Input, DatePicker, Select, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface InvoiceFiltersProps {
  onSearchChange: (value: string) => void;
  onDateRangeChange: (dates: [Dayjs, Dayjs] | null) => void;
  onStatusChange: (value: string) => void;
  onMoreFilters: () => void;
}

export default function InvoiceFilters({
  onSearchChange,
  onDateRangeChange,
  onStatusChange,
  onMoreFilters,
}: InvoiceFiltersProps) {
  return (
    <Space wrap>
      <Input
        placeholder="Search invoices"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 200 }}
      />
      <RangePicker
        onChange={(dates) => onDateRangeChange(dates as [Dayjs, Dayjs] | null)}
      />
      <Select
        placeholder="Status"
        style={{ width: 120 }}
        allowClear
        onChange={onStatusChange}
      >
        <Select.Option value="paid">Paid</Select.Option>
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="void">Void</Select.Option>
      </Select>
      <Button icon={<FilterOutlined />} onClick={onMoreFilters}>
        More Filters
      </Button>
    </Space>
  );
}
