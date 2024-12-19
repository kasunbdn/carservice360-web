import { InventoryItem, StockStatus } from "../types/inventory";
import dayjs from "dayjs";

export const calculateStockStatus = (item: InventoryItem): StockStatus => {
  if (item.quantity === 0) {
    return "out_of_stock";
  }

  if (item.expiryDate && dayjs(item.expiryDate).isBefore(dayjs())) {
    return "expired";
  }

  if (item.onOrder > 0) {
    return "on_order";
  }

  if (item.quantity <= item.minQuantity) {
    return "low_stock";
  }

  return "in_stock";
};

export const getStatusColor = (status: StockStatus): string => {
  const colors = {
    in_stock: "#52c41a",
    low_stock: "#faad14",
    out_of_stock: "#ff4d4f",
    expired: "#cf1322",
    on_order: "#1890ff",
  };
  return colors[status];
};

export const getStatusLabel = (status: StockStatus): string => {
  const labels = {
    in_stock: "In Stock",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
    expired: "Expired",
    on_order: "On Order",
  };
  return labels[status];
};

export const formatQuantity = (quantity: number, unit: string): string => {
  return `${quantity} ${unit}`;
};
