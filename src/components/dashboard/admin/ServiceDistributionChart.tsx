import { Card } from "antd";
import { Pie } from "@ant-design/charts";
import { useState, useEffect } from "react";
import { useJobStore } from "../../../stores/jobStore";

interface ServiceData {
  type: string;
  value: number;
}

export default function ServiceDistributionChart() {
  const [data, setData] = useState<ServiceData[]>([]);
  const { jobs } = useJobStore();

  useEffect(() => {
    // Calculate service distribution from jobs
    const distribution = jobs.reduce((acc: Record<string, number>, job) => {
      const type = job.service.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(distribution).map(([type, value]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      value,
    }));

    setData(chartData);
  }, [jobs]);

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
    animation: {
      appear: {
        animation: "wave-in",
        duration: 1500,
      },
    },
  };

  return (
    <Card title="Service Distribution">
      <Pie {...config} />
    </Card>
  );
}
