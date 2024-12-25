import { Card } from "antd";
import { Column } from "@ant-design/charts";
import type { ServiceDistribution } from "../../types/dashboard";

interface ServiceDistributionChartProps {
  data: ServiceDistribution[];
  loading?: boolean;
}

export default function ServiceDistributionChart({
  data,
  loading,
}: ServiceDistributionChartProps) {
  const config = {
    data,
    xField: "service",
    yField: "count",
    label: {
      position: "top",
      style: {
        fill: "#000000",
        opacity: 0.6,
      },
    },
    animation: {
      appear: {
        animation: "fade-in",
        duration: 1000,
      },
    },
  };

  return (
    <Card title="Services Distribution" loading={loading}>
      <Column {...config} />
    </Card>
  );
}
