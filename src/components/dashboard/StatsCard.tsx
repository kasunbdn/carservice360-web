import { Card, Statistic, Typography } from "antd";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            padding: "12px",
            borderRadius: "50%",
            background: "rgba(99, 102, 241, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <div>
          <Typography.Text type="secondary">{title}</Typography.Text>
          <Statistic value={value} valueStyle={{ fontSize: "24px" }} />
          {trend && (
            <Typography.Text type={trend > 0 ? "success" : "danger"}>
              {trend > 0 ? "+" : ""}
              {trend}% from last month
            </Typography.Text>
          )}
        </div>
      </div>
    </Card>
  );
}
