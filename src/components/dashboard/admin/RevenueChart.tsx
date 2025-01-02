import { Card } from "antd";
import { Line } from "@ant-design/charts";
import { useState, useEffect } from "react";

interface RevenueData {
  month: string;
  revenue: number;
  type: "current" | "previous";
}

export default function RevenueChart() {
  const [data, setData] = useState<RevenueData[]>([]);

  useEffect(() => {
    // Mock data - replace with API call in production
    const mockData = [
      { month: "Jan", revenue: 2500, type: "current" },
      { month: "Feb", revenue: 3500, type: "current" },
      { month: "Mar", revenue: 3000, type: "current" },
      { month: "Apr", revenue: 4500, type: "current" },
      { month: "May", revenue: 4000, type: "current" },
      { month: "Jun", revenue: 5000, type: "current" },
      { month: "Jan", revenue: 2000, type: "previous" },
      { month: "Feb", revenue: 2800, type: "previous" },
      { month: "Mar", revenue: 3200, type: "previous" },
      { month: "Apr", revenue: 3800, type: "previous" },
      { month: "May", revenue: 3500, type: "previous" },
      { month: "Jun", revenue: 4200, type: "previous" },
    ];
    setData(mockData);
  }, []);

  const config = {
    data,
    xField: "month",
    yField: "revenue",
    seriesField: "type",
    yAxis: {
      label: {
        formatter: (v: string) => `$${v}`,
      },
    },
    legend: {
      itemName: {
        formatter: (text: string) =>
          text === "current" ? "Current Year" : "Previous Year",
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: "wave-in",
        duration: 1500,
      },
    },
  };

  return (
    <Card title="Revenue Trends">
      <Line {...config} />
    </Card>
  );
}
