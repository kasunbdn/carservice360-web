import { Card, Tabs, Button, Table, Form, Input, Space, Switch } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";

export default function AdminTools() {
  const [activeTab, setActiveTab] = useState("1");

  const userColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => <Switch checked={active} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "User Management",
      children: (
        <Table
          columns={userColumns}
          dataSource={[]}
          pagination={{ pageSize: 10 }}
        />
      ),
    },
    {
      key: "2",
      label: "System Settings",
      children: (
        <Form layout="vertical">
          <Form.Item label="Tax Rate (%)" name="taxRate">
            <Input type="number" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="Terms & Conditions" name="terms">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Save Settings</Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Card title="Admin Tools">
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
    </Card>
  );
}
