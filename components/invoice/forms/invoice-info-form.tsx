"use client"

import { FormSection } from "@/components/invoice/form-section"
import { Field, TextAreaField } from "@/components/invoice/field"
import { useInvoice } from "@/components/invoice/invoice-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CURRENCIES } from "@/lib/invoice/currencies"
import { FileTextIcon } from "lucide-react"

export function InvoiceInfoForm() {
  const { invoice, dispatch } = useInvoice()
  const { meta } = invoice

  return (
    <FormSection
      title="Invoice Details"
      description="Numbers, dates, currency and payment notes"
      icon={<FileTextIcon />}
    >
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Invoice Number"
          value={meta.invoiceNumber}
          onChange={(event) =>
            dispatch({
              type: "updateMeta",
              patch: { invoiceNumber: event.target.value },
            })
          }
          placeholder="INV-2026-0001"
        />
        <Field
          label="PO Number (Optional)"
          value={meta.poNumber}
          onChange={(event) =>
            dispatch({
              type: "updateMeta",
              patch: { poNumber: event.target.value },
            })
          }
          placeholder="PO-1024"
        />
        <Field
          label="Invoice Date"
          type="date"
          value={meta.issueDate}
          onChange={(event) =>
            dispatch({
              type: "updateMeta",
              patch: { issueDate: event.target.value },
            })
          }
        />
        <Field
          label="Due Date"
          type="date"
          value={meta.dueDate}
          onChange={(event) =>
            dispatch({
              type: "updateMeta",
              patch: { dueDate: event.target.value },
            })
          }
        />
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground select-none">
          Currency
        </span>
        <Select
          id="currency-select"
          value={meta.currency}
          onValueChange={(value) =>
            dispatch({ type: "updateMeta", patch: { currency: String(value) } })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <span className="w-10 shrink-0 font-medium tabular-nums">
                  {currency.code}
                </span>
                <span className="text-muted-foreground">{currency.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 grid gap-3">
        <TextAreaField
          label="Notes"
          value={meta.notes}
          onChange={(event) =>
            dispatch({
              type: "updateMeta",
              patch: { notes: event.target.value },
            })
          }
          placeholder="Additional notes shown on the invoice"
          rows={3}
        />
        <TextAreaField
          label="Terms & Conditions"
          value={meta.terms}
          onChange={(event) =>
            dispatch({
              type: "updateMeta",
              patch: { terms: event.target.value },
            })
          }
          placeholder="Payment terms, late fees, policies…"
          rows={3}
        />
      </div>
    </FormSection>
  )
}
