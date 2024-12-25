import { Card } from "antd";
import { Line } from "@ant-design/charts";
import type { RevenueData } from "../../types/dashboard";

interface RevenueChartProps {
  data: RevenueData[];
  loading?: boolean;
}

export default function RevenueChart({ data, loading }: RevenueChartProps) {
  const config = {
    data,
    xField: "month",
    yField: "revenue",
    seriesField: "type",
    smooth: true,
    animation: {
      appear: {
        animation: "wave-in",
        duration: 1000,
      },
    },
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  return (
    <Card title="Revenue Trend" loading={loading}>
      <Line {...config} />
    </Card>
  );
}
