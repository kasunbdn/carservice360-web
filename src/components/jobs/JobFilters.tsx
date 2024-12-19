import { Space, Input, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface JobFiltersProps {
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onTechnicianChange: (value: string) => void;
  onDateRangeChange: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  technicians: { id: string; name: string }[];
}

export default function JobFilters({
  onSearch,
  onStatusChange,
  onPriorityChange,
  onTechnicianChange,
  onDateRangeChange,
  technicians,
}: JobFiltersProps) {
  return (
    <Space wrap>
      <Input
        placeholder="Search jobs..."
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Status"
        style={{ width: 120 }}
        onChange={onStatusChange}
        allowClear
      >
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="in_progress">In Progress</Select.Option>
        <Select.Option value="completed">Completed</Select.Option>
        <Select.Option value="cancelled">Cancelled</Select.Option>
      </Select>
      <Select
        placeholder="Priority"
        style={{ width: 120 }}
        onChange={onPriorityChange}
        allowClear
      >
        <Select.Option value="high">High</Select.Option>
        <Select.Option value="medium">Medium</Select.Option>
        <Select.Option value="low">Low</Select.Option>
      </Select>
      <Select
        placeholder="Technician"
        style={{ width: 150 }}
        onChange={onTechnicianChange}
        allowClear
      >
        {technicians.map((tech) => (
          <Select.Option key={tech.id} value={tech.id}>
            {tech.name}
          </Select.Option>
        ))}
      </Select>
      <RangePicker onChange={onDateRangeChange} />
    </Space>
  );
}
