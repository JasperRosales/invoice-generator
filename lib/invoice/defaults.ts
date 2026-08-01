import type { Invoice, InvoiceItem } from "./types"

let itemCounter = 0

export function createItemId(): string {
  itemCounter += 1
  return `item-${Date.now().toString(36)}-${itemCounter}`
}

export function createEmptyItem(): InvoiceItem {
  return {
    id: createItemId(),
    description: "",
    quantity: 1,
    unitPrice: 0,
  }
}

export function createEmptyInvoice(): Invoice {
  return {
    meta: {
      invoiceNumber: "INV-0001",
      poNumber: "",
      issueDate: "",
      dueDate: "",
      currency: "USD",
      notes: "Thank you for your business.",
      terms: "Payment is due within 30 days of the invoice date.",
    },
    company: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phone: "",
      taxId: "",
      logo: null,
    },
    client: {
      name: "",
      company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phone: "",
    },
    items: [createEmptyItem()],
    totals: {
      taxRate: 0,
      discount: 0,
      discountType: "percent",
      shipping: 0,
    },
    settings: {
      template: "modern",
      accentColor: "#c2410c",
    },
  }
}

export function createSampleInvoice(): Invoice {
  const invoice = createEmptyInvoice()

  invoice.company = {
    name: "Northstar Studio",
    address: "48 Wellington Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "United States",
    email: "hello@northstar.studio",
    phone: "+1 (512) 555-0142",
    taxId: "",
    logo: null,
  }

  invoice.client = {
    name: "Sofia Alvarez",
    company: "Meridian Coffee Roasters",
    address: "2210 Willow Lane",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    country: "United States",
    email: "sofia@meridiancoffee.com",
    phone: "+1 (214) 555-0187",
  }

  invoice.items = [
    {
      id: createItemId(),
      description: "Brand identity design — logo, palette and typography",
      quantity: 1,
      unitPrice: 1200,
    },
    {
      id: createItemId(),
      description: "Website landing page design & development",
      quantity: 1,
      unitPrice: 1850,
    },
    {
      id: createItemId(),
      description: "Packaging design for seasonal collection",
      quantity: 2,
      unitPrice: 340,
    },
  ]

  invoice.totals = {
    taxRate: 8.25,
    discount: 0,
    discountType: "percent",
    shipping: 0,
  }

  return invoice
}
