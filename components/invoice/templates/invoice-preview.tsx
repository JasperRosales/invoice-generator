"use client"

import { MinimalTemplate } from "./minimal"
import { ModernTemplate } from "./modern"
import { useInvoice } from "@/components/invoice/invoice-provider"
import { calculateTotals } from "@/lib/invoice/calculate"

export function InvoicePreview() {
  const { invoice } = useInvoice()
  const totals = calculateTotals(invoice)

  switch (invoice.settings.template) {
    case "minimal":
      return <MinimalTemplate invoice={invoice} totals={totals} />
    case "modern":
    default:
      return <ModernTemplate invoice={invoice} totals={totals} />
  }
}
