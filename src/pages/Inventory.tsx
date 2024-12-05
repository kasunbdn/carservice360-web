import { useState } from "react";
import {
  Typography,
  Space,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Tooltip,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useInventoryStore } from "../stores/inventoryStore";
import type {
  InventoryItem,
  ItemCategory,
  MeasurementUnit,
  StockStatus,
} from "../types/inventory";
import {
  calculateStockStatus,
  getStatusColor,
  getStatusLabel,
  formatQuantity,
} from "../utils/inventory";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const categories: { label: string; value: ItemCategory }[] = [
  { label: "Fuel", value: "fuel" },
  { label: "Oil", value: "oil" },
  { label: "Parts", value: "parts" },
  { label: "Chemicals", value: "chemicals" },
  { label: "Filters", value: "filters" },
  { label: "Lubricants", value: "lubricants" },
];

const units: { label: string; value: MeasurementUnit }[] = [
  { label: "Liters", value: "liters" },
  { label: "Gallons", value: "gallons" },
  { label: "Pieces", value: "pieces" },
  { label: "Units", value: "units" },
  { label: "Kilograms", value: "kg" },
];

export default function Inventory() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [form] = Form.useForm();
  const { items, addItem, updateItem, removeItem } = useInventoryStore();
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    supplier: "",
  });

  const handleSubmit = (values: any) => {
    const status = calculateStockStatus({
      ...values,
      status: "in_stock", // Temporary status for calculation
    });

    const itemData = {
      ...values,
      status,
      lastUpdated: dayjs().toISOString(),
    };

    if (selectedItem) {
      updateItem(selectedItem.id, itemData);
    } else {
      addItem({
        id: Date.now().toString(),
        ...itemData,
      });
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeItem(id);
      },
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      !filters.category || item.category === filters.category;
    const matchesStatus = !filters.status || item.status === filters.status;
    const matchesSupplier =
      !filters.supplier || item.supplier === filters.supplier;

    return matchesSearch && matchesCategory && matchesStatus && matchesSupplier;
  });

  const columns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      key: "partNumber",
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.partNumber.localeCompare(b.partNumber),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: categories.map((cat) => ({ text: cat.label, value: cat.value })),
      onFilter: (value: string | number, record: InventoryItem) =>
        record.category === value,
      render: (category: ItemCategory) => {
        const cat = categories.find((c) => c.value === category);
        return cat?.label || category;
      },
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record: InventoryItem) => (
        <Space>
          {formatQuantity(record.quantity, record.unit)}
          {record.quantity <= record.minQuantity && (
            <Tooltip title="Low Stock Warning">
              <WarningOutlined style={{ color: "#faad14" }} />
            </Tooltip>
          )}
        </Space>
      ),
      sorter: (a: InventoryItem, b: InventoryItem) => a.quantity - b.quantity,
    },
    {
      title: "Status",
      key: "status",
      filters: [
        { text: "In Stock", value: "in_stock" },
        { text: "Low Stock", value: "low_stock" },
        { text: "Out of Stock", value: "out_of_stock" },
        { text: "Expired", value: "expired" },
        { text: "On Order", value: "on_order" },
      ],
      onFilter: (value: string, record: InventoryItem) =>
        record.status === value,
      render: (_: any, record: InventoryItem) => {
        const status = calculateStockStatus(record);
        return (
          <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
        );
      },
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date: string) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
      sorter: (a: InventoryItem, b: InventoryItem) => {
        if (!a.expiryDate || !b.expiryDate) return 0;
        return dayjs(a.expiryDate).unix() - dayjs(b.expiryDate).unix();
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: InventoryItem) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedItem(record);
                form.setFieldsValue({
                  ...record,
                  expiryDate: record.expiryDate
                    ? dayjs(record.expiryDate)
                    : undefined,
                });
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const stats = [
    {
      title: "Total Items",
      value: items.length,
      color: "#1890ff",
    },
    {
      title: "Low Stock Items",
      value: items.filter((item) => item.quantity <= item.minQuantity).length,
      color: "#faad14",
    },
    {
      title: "Expired Items",
      value: items.filter(
        (item) => item.expiryDate && dayjs(item.expiryDate).isBefore(dayjs())
      ).length,
      color: "#ff4d4f",
    },
    {
      title: "Total Value",
      value: `$${items
        .reduce((sum, item) => sum + item.quantity * item.price, 0)
        .toFixed(2)}`,
      color: "#52c41a",
    },
  ];

  return (
    <div>
      <Title level={2}>Inventory Management</Title>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {stats.map((stat, index) => (
            <Card key={index}>
              <Text type="secondary">{stat.title}</Text>
              <Title level={3} style={{ margin: "8px 0", color: stat.color }}>
                {stat.value}
              </Title>
            </Card>
          ))}
        </div>

        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Space wrap>
                <Input.Search
                  placeholder="Search inventory..."
                  style={{ width: 250 }}
                  allowClear
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Select
                  placeholder="Category"
                  style={{ width: 150 }}
                  allowClear
                  onChange={(value) =>
                    setFilters({ ...filters, category: value })
                  }
                >
                  {categories.map((cat) => (
                    <Option key={cat.value} value={cat.value}>
                      {cat.label}
                    </Option>
                  ))}
                </Select>
                <Select
                  placeholder="Status"
                  style={{ width: 150 }}
                  allowClear
                  onChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <Option value="in_stock">In Stock</Option>
                  <Option value="low_stock">Low Stock</Option>
                  <Option value="out_of_stock">Out of Stock</Option>
                  <Option value="expired">Expired</Option>
                  <Option value="on_order">On Order</Option>
                </Select>
              </Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedItem(null);
                  form.resetFields();
                  setIsModalVisible(true);
                }}
              >
                Add Item
              </Button>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredItems}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </Card>
      </Space>

      <Modal
        title={selectedItem ? "Edit Inventory Item" : "Add Inventory Item"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="partNumber"
              label="Part Number"
              rules={[{ required: true, message: "Please enter part number" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select>
                {categories.map((cat) => (
                  <Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="unit"
              label="Unit"
              rules={[{ required: true, message: "Please select unit" }]}
            >
              <Select>
                {units.map((unit) => (
                  <Option key={unit.value} value={unit.value}>
                    {unit.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="minQuantity"
              label="Min Quantity"
              rules={[
                { required: true, message: "Please enter minimum quantity" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <InputNumber
                min={0}
                precision={2}
                prefix="$"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="onOrder"
              label="On Order"
              rules={[
                { required: true, message: "Please enter on order quantity" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="supplier"
              label="Supplier"
              rules={[{ required: true, message: "Please select supplier" }]}
            >
              <Select>
                <Option value="AutoParts Inc">AutoParts Inc</Option>
                <Option value="Parts Plus">Parts Plus</Option>
                <Option value="Global Supply">Global Supply</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="location"
              label="Storage Location"
              rules={[
                { required: true, message: "Please enter storage location" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="expiryDate" label="Expiry Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {selectedItem ? "Update" : "Add"} Item
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
