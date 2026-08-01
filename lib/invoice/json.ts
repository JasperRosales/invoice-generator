import { invoiceSchema } from "./schema"
import type { Invoice } from "./types"

export function serializeInvoice(invoice: Invoice): string {
  return JSON.stringify(invoice, null, 2)
}

export function downloadJson(invoice: Invoice): void {
  const blob = new Blob([serializeInvoice(invoice)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `invoice-${sanitizeFilename(invoice.meta.invoiceNumber || "untitled")}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function parseInvoiceJson(text: string): Invoice {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error("The file is not valid JSON.")
  }

  const parsed = invoiceSchema.safeParse(data)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    const path = firstIssue?.path.join(".") || "data"
    throw new Error(
      `Invalid invoice data at "${path}": ${firstIssue?.message ?? "unknown error"}`
    )
  }

  return parsed.data
}

function sanitizeFilename(value: string): string {
  return (
    value.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "invoice"
  )
}
