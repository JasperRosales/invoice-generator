import { formatCurrency, formatDate } from "@/lib/invoice/format"
import type { CalculatedTotals, Invoice } from "@/lib/invoice/types"
import { clientAddressLines, companyAddressLines } from "./shared"

interface MinimalTemplateProps {
  invoice: Invoice
  totals: CalculatedTotals
}

export function MinimalTemplate({ invoice, totals }: MinimalTemplateProps) {
  const { meta, company, client, items } = invoice
  const accent = invoice.settings.accentColor

  return (
    <div className="flex min-h-[1000px] w-full flex-col bg-white text-neutral-900">
      <div className="flex flex-1 flex-col gap-10 p-12">
        <header className="flex items-start justify-between">
          <div>
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo}
                alt=""
                className="mb-3 max-h-14 max-w-28 object-contain"
              />
            ) : null}
            {company.name ? (
              <p className="text-lg font-semibold tracking-tight">
                {company.name}
              </p>
            ) : null}
          </div>
          <div className="text-right">
            <p className="text-2xl font-light tracking-widest text-neutral-900 uppercase">
              Invoice
            </p>
            <p className="mt-1 text-xs font-medium">{meta.invoiceNumber}</p>
          </div>
        </header>

        <div className="border-b border-neutral-200 pb-6">
          <div className="flex flex-wrap gap-x-10 gap-y-2 text-xs">
            <Meta label="Invoice Date" value={formatDate(meta.issueDate)} />
            <Meta label="Due Date" value={formatDate(meta.dueDate)} />
            <Meta label="PO Number" value={meta.poNumber || "—"} />
            <Meta label="Currency" value={meta.currency} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
              From
            </p>
            <div className="mt-2 flex flex-col gap-0.5 text-xs text-neutral-700">
              <span className="text-sm font-medium text-neutral-900">
                {company.name || "Your Company"}
              </span>
              {companyAddressLines(company).map((line) => (
                <span key={line}>{line}</span>
              ))}
              {company.email ? <span>{company.email}</span> : null}
              {company.phone ? <span>{company.phone}</span> : null}
              {company.taxId ? <span>Tax ID: {company.taxId}</span> : null}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
              Bill To
            </p>
            <div className="mt-2 flex flex-col gap-0.5 text-xs text-neutral-700">
              <span className="text-sm font-medium text-neutral-900">
                {client.name || "Client Name"}
              </span>
              {clientAddressLines(client).map((line) => (
                <span key={line}>{line}</span>
              ))}
              {client.email ? <span>{client.email}</span> : null}
              {client.phone ? <span>{client.phone}</span> : null}
            </div>
          </div>
        </div>

        <div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                <th className="py-2 text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  Description
                </th>
                <th className="w-16 py-2 text-right text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  Qty
                </th>
                <th className="w-32 py-2 text-right text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  Unit Price
                </th>
                <th className="w-36 py-2 text-right text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-neutral-100">
                  <td className="py-3.5">
                    {item.description || (
                      <span className="text-neutral-400">Line item</span>
                    )}
                  </td>
                  <td className="py-3.5 text-right tabular-nums">
                    {item.quantity}
                  </td>
                  <td className="py-3.5 text-right tabular-nums">
                    {formatCurrency(item.unitPrice, meta.currency)}
                  </td>
                  <td className="py-3.5 text-right font-medium tabular-nums">
                    {formatCurrency(
                      item.quantity * item.unitPrice,
                      meta.currency
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-neutral-400">
                    No line items added yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-auto flex flex-col items-end gap-8">
          <div className="w-72">
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="tabular-nums">
                {formatCurrency(totals.subtotal, meta.currency)}
              </span>
            </div>
            {totals.discountAmount > 0 ? (
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-neutral-500">
                  {invoice.totals.discountType === "percent"
                    ? `Discount (${invoice.totals.discount}%)`
                    : "Discount"}
                </span>
                <span className="tabular-nums">
                  −{formatCurrency(totals.discountAmount, meta.currency)}
                </span>
              </div>
            ) : null}
            {totals.taxAmount > 0 ? (
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-neutral-500">
                  Tax ({invoice.totals.taxRate}%)
                </span>
                <span className="tabular-nums">
                  {formatCurrency(totals.taxAmount, meta.currency)}
                </span>
              </div>
            ) : null}
            {totals.shipping > 0 ? (
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-neutral-500">Shipping</span>
                <span className="tabular-nums">
                  {formatCurrency(totals.shipping, meta.currency)}
                </span>
              </div>
            ) : null}
            <div className="mt-2 flex items-center justify-between border-t border-neutral-900 pt-3">
              <span className="text-sm font-semibold tracking-wide uppercase">
                Total Due
              </span>
              <span
                className="text-xl font-semibold tabular-nums"
                style={{ color: accent }}
              >
                {formatCurrency(totals.total, meta.currency)}
              </span>
            </div>
          </div>

          {meta.notes || meta.terms ? (
            <div className="w-full space-y-4 border-t border-neutral-100 pt-6">
              {meta.notes ? (
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                    Notes
                  </p>
                  <p className="mt-1 text-xs whitespace-pre-wrap text-neutral-600">
                    {meta.notes}
                  </p>
                </div>
              ) : null}
              {meta.terms ? (
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                    Terms
                  </p>
                  <p className="mt-1 text-xs whitespace-pre-wrap text-neutral-600">
                    {meta.terms}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
        {label}
      </p>
      <p className="mt-0.5 font-medium">{value || "—"}</p>
    </div>
  )
}
