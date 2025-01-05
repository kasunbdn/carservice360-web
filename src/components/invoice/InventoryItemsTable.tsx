import { Table, InputNumber, Button, Select, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useInventoryStore } from "../../stores/inventoryStore";
import type { InventoryItem } from "../../types/inventory";
import type { ColumnsType } from "antd/es/table";

interface SelectedInventoryItem {
  key: string;
  inventoryItem: InventoryItem;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InventoryItemsTableProps {
  value: SelectedInventoryItem[];
  onChange: (items: SelectedInventoryItem[]) => void;
}

export default function InventoryItemsTable({
  value,
  onChange,
}: InventoryItemsTableProps) {
  const { items: inventoryItems } = useInventoryStore();

  const handleQuantityChange = (key: string, quantity: number) => {
    onChange(
      value.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            quantity,
            total: quantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const handlePriceChange = (key: string, unitPrice: number) => {
    onChange(
      value.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            unitPrice,
            total: item.quantity * unitPrice,
          };
        }
        return item;
      })
    );
  };

  const handleDelete = (key: string) => {
    onChange(value.filter((item) => item.key !== key));
  };

  const handleAdd = (inventoryItemId: string) => {
    const inventoryItem = inventoryItems.find(
      (item) => item.id === inventoryItemId
    );
    if (!inventoryItem) return;

    const newItem: SelectedInventoryItem = {
      key: Date.now().toString(),
      inventoryItem,
      quantity: 1,
      unitPrice: inventoryItem.price,
      total: inventoryItem.price,
    };

    onChange([...value, newItem]);
  };

  const columns: ColumnsType<SelectedInventoryItem> = [
    {
      title: "Item",
      dataIndex: ["inventoryItem", "name"],
      key: "name",
    },
    {
      title: "Description",
      dataIndex: ["inventoryItem", "description"],
      key: "description",
    },
    {
      title: "Quantity",
      key: "quantity",
      width: 120,
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.inventoryItem.quantity}
          value={record.quantity}
          onChange={(val) => handleQuantityChange(record.key, val || 1)}
        />
      ),
    },
    {
      title: "Unit Price",
      key: "unitPrice",
      width: 120,
      render: (_, record) => (
        <InputNumber
          prefix="$"
          min={0}
          value={record.unitPrice}
          onChange={(val) => handlePriceChange(record.key, val || 0)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      width: 120,
      render: (_, record) => `$${record.total.toFixed(2)}`,
    },
    {
      title: "",
      key: "action",
      width: 60,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Select
        placeholder="Add inventory item"
        style={{ width: 300 }}
        onChange={handleAdd}
        value={undefined}
      >
        {inventoryItems.map((item) => (
          <Select.Option
            key={item.id}
            value={item.id}
            disabled={item.quantity === 0}
          >
            {item.name} ({item.quantity} available)
          </Select.Option>
        ))}
      </Select>

      <Table
        columns={columns}
        dataSource={value}
        pagination={false}
        summary={(pageData) => {
          const total = pageData.reduce((sum, item) => sum + item.total, 0);
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4}>
                <strong>Total</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <strong>${total.toFixed(2)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} />
            </Table.Summary.Row>
          );
        }}
      />
    </Space>
  );
}
