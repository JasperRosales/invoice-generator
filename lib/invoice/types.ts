export type InvoiceTemplateId = "modern" | "minimal"

export type DiscountType = "percent" | "flat"

export interface CompanyInfo {
  name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  email: string
  phone: string
  taxId: string
  logo: string | null
}

export interface ClientInfo {
  name: string
  company: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  email: string
  phone: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface InvoiceMeta {
  invoiceNumber: string
  poNumber: string
  issueDate: string
  dueDate: string
  currency: string
  notes: string
  terms: string
}

export interface InvoiceTotals {
  taxRate: number
  discount: number
  discountType: DiscountType
  shipping: number
}

export interface InvoiceSettings {
  template: InvoiceTemplateId
  accentColor: string
}

export interface Invoice {
  meta: InvoiceMeta
  company: CompanyInfo
  client: ClientInfo
  items: InvoiceItem[]
  totals: InvoiceTotals
  settings: InvoiceSettings
}

export interface CalculatedTotals {
  subtotal: number
  discountAmount: number
  taxAmount: number
  shipping: number
  total: number
}
