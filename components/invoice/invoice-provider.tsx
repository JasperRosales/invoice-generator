"use client"

import * as React from "react"

import { createSampleInvoice } from "@/lib/invoice/defaults"
import { addDays, toISODate } from "@/lib/invoice/format"
import type {
  ClientInfo,
  CompanyInfo,
  Invoice,
  InvoiceItem,
  InvoiceMeta,
  InvoiceSettings,
  InvoiceTotals,
} from "@/lib/invoice/types"

type Action =
  | { type: "updateMeta"; patch: Partial<InvoiceMeta> }
  | { type: "updateCompany"; patch: Partial<CompanyInfo> }
  | { type: "updateClient"; patch: Partial<ClientInfo> }
  | { type: "updateTotals"; patch: Partial<InvoiceTotals> }
  | { type: "updateSettings"; patch: Partial<InvoiceSettings> }
  | { type: "updateItem"; id: string; patch: Partial<InvoiceItem> }
  | { type: "addItem" }
  | { type: "removeItem"; id: string }
  | { type: "moveItem"; id: string; direction: -1 | 1 }
  | { type: "load"; invoice: Invoice }
  | { type: "reset" }

function reducer(state: Invoice, action: Action): Invoice {
  switch (action.type) {
    case "updateMeta":
      return { ...state, meta: { ...state.meta, ...action.patch } }
    case "updateCompany":
      return { ...state, company: { ...state.company, ...action.patch } }
    case "updateClient":
      return { ...state, client: { ...state.client, ...action.patch } }
    case "updateTotals":
      return { ...state, totals: { ...state.totals, ...action.patch } }
    case "updateSettings":
      return { ...state, settings: { ...state.settings, ...action.patch } }
    case "updateItem":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, ...action.patch } : item
        ),
      }
    case "addItem": {
      const lastId = state.items[state.items.length - 1]?.id ?? "0"
      const counter = Number.parseInt(lastId.split("-").pop() ?? "0", 36)
      const id = `item-${Date.now().toString(36)}-${counter + 1}`
      return {
        ...state,
        items: [
          ...state.items,
          { id, description: "", quantity: 1, unitPrice: 0 },
        ],
      }
    }
    case "removeItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      }
    case "moveItem": {
      const index = state.items.findIndex((item) => item.id === action.id)
      const target = index + action.direction
      if (index < 0 || target < 0 || target >= state.items.length) {
        return state
      }
      const items = [...state.items]
      const [moved] = items.splice(index, 1)
      items.splice(target, 0, moved)
      return { ...state, items }
    }
    case "load":
      return action.invoice
    case "reset":
      return createSampleInvoice()
    default:
      return state
  }
}

interface InvoiceContextValue {
  invoice: Invoice
  dispatch: React.Dispatch<Action>
}

const InvoiceContext = React.createContext<InvoiceContextValue | null>(null)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoice, dispatch] = React.useReducer(reducer, undefined, () =>
    createSampleInvoice()
  )

  React.useEffect(() => {
    const now = new Date()
    dispatch({
      type: "updateMeta",
      patch: {
        issueDate: toISODate(now),
        dueDate: toISODate(addDays(now, 30)),
        invoiceNumber: `INV-${now.getFullYear()}-0001`,
      },
    })
  }, [])

  const value = React.useMemo(() => ({ invoice, dispatch }), [invoice])

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  )
}

export function useInvoice(): InvoiceContextValue {
  const context = React.useContext(InvoiceContext)
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider")
  }
  return context
}
