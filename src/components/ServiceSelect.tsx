import { Select, Input } from "antd";
import { useState } from "react";

interface ServiceSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  predefinedServices: Array<{ name: string; price: number; category: string }>;
}

export default function ServiceSelect({
  value,
  onChange,
  predefinedServices,
}: ServiceSelectProps) {
  const [isCustom, setIsCustom] = useState(false);

  const handleChange = (selected: string) => {
    if (selected === "custom") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      onChange?.(selected);
    }
  };

  const topServices = predefinedServices.slice(0, 5);

  return isCustom ? (
    <Input
      placeholder="Enter custom service name"
      value={value === "csv" ? "" : value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={(e) => {
        if (!e.target.value) {
          setIsCustom(false);
        }
      }}
    />
  ) : (
    <Select
      style={{ width: "100%" }}
      value={value || undefined}
      onChange={handleChange}
      allowClear
      showSearch
      placeholder="Select or enter custom service"
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label as string).toLowerCase().includes(input.toLowerCase())
      }
      options={[
        { value: "custom", label: "+ Add Custom Service" },
        ...topServices.map((service) => ({
          value: service.name,
          label: `${service.name} - $${service.price}`,
        })),
      ]}
    />
  );
}
