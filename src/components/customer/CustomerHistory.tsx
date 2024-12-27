import { Timeline, Button, Typography, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { CustomerHistory as CustomerHistoryType } from "../../types/customer";
import AddHistoryForm from "./AddHistoryForm";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface CustomerHistoryProps {
  history: CustomerHistoryType[];
  onAddHistory: (entry: Omit<CustomerHistoryType, "id" | "date">) => void;
}

export default function CustomerHistory({
  history,
  onAddHistory,
}: CustomerHistoryProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddHistory = (
    values: Omit<CustomerHistoryType, "id" | "date">
  ) => {
    onAddHistory(values);
    setIsModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={5}>History</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Entry
        </Button>
      </div>

      <Timeline
        items={history.map((entry) => ({
          children: (
            <div>
              <Text strong>{entry.type.toUpperCase()}</Text>
              <br />
              <Text>{entry.description}</Text>
              <br />
              <Text type="secondary">
                {dayjs(entry.date).format("YYYY-MM-DD HH:mm")} by {entry.user}
              </Text>
            </div>
          ),
        }))}
      />

      <Modal
        title="Add History Entry"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddHistoryForm
          onSubmit={handleAddHistory}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
}
