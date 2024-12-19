export type StockStatus =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "expired"
  | "on_order";
export type ItemCategory =
  | "fuel"
  | "oil"
  | "parts"
  | "chemicals"
  | "filters"
  | "lubricants"
  | "engine"
  | "brakes";
export type MeasurementUnit = "liters" | "gallons" | "pieces" | "units" | "kg";

export interface InventoryItem {
  id: string;
  partNumber: string;
  name: string;
  category: ItemCategory;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  location: string;
  onOrder: number;
  unit: MeasurementUnit;
  expiryDate?: string;
  lastUpdated?: string;
  notes?: string;
  status: StockStatus;
}
