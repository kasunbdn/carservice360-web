import type { ServiceItem } from "../types/service";
import type { SelectedInventoryItem } from "../types/inventory";

interface InvoiceTotals {
  subtotal: number;
  discountTotal: number;
  inventoryTotal: number;
  taxRate: number;
  taxAmount: number;
  grandTotal: number;
}

export function calculateInvoiceTotals(
  items: ServiceItem[],
  inventoryItems: SelectedInventoryItem[],
  taxRate: number = 0.1 // Default tax rate of 10%
): InvoiceTotals {
  let subtotal = 0;
  let discountTotal = 0;
  let inventoryTotal = 0;

  // Calculate totals for services
  items.forEach((item) => {
    const itemTotal = item.quantity * item.unitPrice;
    const itemDiscount = itemTotal * (item.discount / 100);
    const net = itemTotal - itemDiscount;

    subtotal += net; // Add net value to subtotal
    discountTotal += itemDiscount; // Add discount value to discountTotal
  });

  // Calculate total for inventory items
  inventoryItems.forEach((item) => {
    inventoryTotal += item.total;
  });

  // Calculate tax amount
  const taxAmount = (subtotal + inventoryTotal - discountTotal) * taxRate;

  // Calculate grand total
  const grandTotal = subtotal + inventoryTotal - discountTotal + taxAmount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discountTotal: parseFloat(discountTotal.toFixed(2)),
    inventoryTotal: parseFloat(inventoryTotal.toFixed(2)),
    taxRate,
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    grandTotal: parseFloat(grandTotal.toFixed(2)),
  };
}
