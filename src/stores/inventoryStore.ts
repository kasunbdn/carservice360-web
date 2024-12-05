import { create } from "zustand";
import type { InventoryItem } from "../types/inventory";

interface InventoryStore {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  removeItem: (id: string) => void;
}
const initialItems: InventoryItem[] = [
  {
    id: "1",
    partNumber: "OIL-001",
    name: "Synthetic Oil Filter",
    category: "parts", // change 'engine' to 'parts'
    quantity: 50,
    minQuantity: 20,
    price: 12.99,
    supplier: "AutoParts Inc",
    location: "A1-B2",
    onOrder: 0,
    status: "in_stock",
    unit: "units",
  },
  {
    id: "2",
    partNumber: "BRK-002",
    name: "Brake Pads",
    category: "parts",
    quantity: 15,
    minQuantity: 20,
    price: 45.99,
    supplier: "Parts Plus",
    location: "B2-C3",
    onOrder: 50,
    status: "on_order",
    unit: "pieces",
  },
];

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: initialItems,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
