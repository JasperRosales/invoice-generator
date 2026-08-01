import { round2 } from "./format"
import type { CalculatedTotals, Invoice } from "./types"

export function calculateSubtotal(items: Invoice["items"]): number {
  return round2(
    items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  )
}

export function calculateTotals(invoice: Invoice): CalculatedTotals {
  const subtotal = calculateSubtotal(invoice.items)
  const { discount, discountType, taxRate, shipping } = invoice.totals

  const discountAmount =
    discountType === "percent" ? round2((subtotal * discount) / 100) : discount

  const taxable = round2(subtotal - discountAmount)
  const taxAmount = round2((taxable * taxRate) / 100)
  const total = round2(taxable + taxAmount + shipping)

  return {
    subtotal,
    discountAmount,
    taxAmount,
    shipping,
    total,
  }
}
