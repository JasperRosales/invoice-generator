import { formatCurrency, formatDate } from "@/lib/invoice/format"
import type { CalculatedTotals, Invoice } from "@/lib/invoice/types"
import { clientAddressLines, companyAddressLines } from "./shared"

interface ModernTemplateProps {
  invoice: Invoice
  totals: CalculatedTotals
}

export function ModernTemplate({ invoice, totals }: ModernTemplateProps) {
  const { meta, company, client, items } = invoice
  const accent = invoice.settings.accentColor

  return (
    <div className="flex min-h-[1000px] w-full flex-col bg-white text-neutral-900">
      <div className="h-2 w-full" style={{ backgroundColor: accent }} />

      <div className="flex flex-1 flex-col gap-8 p-10">
        <header className="flex items-start justify-between gap-8">
          <div className="flex items-center gap-4">
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={company.logo}
                alt=""
                className="max-h-16 max-w-32 object-contain"
              />
            ) : null}
            <div>
              {company.name ? (
                <p className="font-heading text-xl font-semibold">
                  {company.name}
                </p>
              ) : null}
              {company.taxId ? (
                <p className="mt-1 text-xs text-neutral-500">
                  Tax ID: {company.taxId}
                </p>
              ) : null}
            </div>
          </div>
          <div className="text-right">
            <p
              className="font-heading text-3xl leading-none font-bold tracking-tight"
              style={{ color: accent }}
            >
              INVOICE
            </p>
            <p className="mt-2 text-sm font-medium">{meta.invoiceNumber}</p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs sm:grid-cols-4">
          <Meta label="Invoice Date" value={formatDate(meta.issueDate)} />
          <Meta label="Due Date" value={formatDate(meta.dueDate)} />
          <Meta label="PO Number" value={meta.poNumber || "—"} />
          <Meta label="Currency" value={meta.currency} />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Party label="From">
            <p className="text-sm font-semibold">
              {company.name || "Your Company"}
            </p>
            <div className="mt-1 flex flex-col gap-0.5 text-xs text-neutral-600">
              {companyAddressLines(company).map((line) => (
                <span key={line}>{line}</span>
              ))}
              {company.email ? <span>{company.email}</span> : null}
              {company.phone ? <span>{company.phone}</span> : null}
            </div>
          </Party>
          <Party label="Bill To">
            <p className="text-sm font-semibold">
              {client.name || "Client Name"}
            </p>
            <div className="mt-1 flex flex-col gap-0.5 text-xs text-neutral-600">
              {clientAddressLines(client).map((line) => (
                <span key={line}>{line}</span>
              ))}
              {client.email ? <span>{client.email}</span> : null}
              {client.phone ? <span>{client.phone}</span> : null}
            </div>
          </Party>
        </div>

        <div className="overflow-hidden rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ backgroundColor: accent }}>
                <th className="px-4 py-2.5 text-left font-medium text-white">
                  Description
                </th>
                <th className="w-16 px-4 py-2.5 text-right font-medium text-white">
                  Qty
                </th>
                <th className="w-32 px-4 py-2.5 text-right font-medium text-white">
                  Unit Price
                </th>
                <th className="w-36 px-4 py-2.5 text-right font-medium text-white">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 1 ? "bg-neutral-50" : undefined}
                >
                  <td className="border-b border-neutral-200 px-4 py-3">
                    {item.description || (
                      <span className="text-neutral-400">Line item</span>
                    )}
                  </td>
                  <td className="border-b border-neutral-200 px-4 py-3 text-right tabular-nums">
                    {item.quantity}
                  </td>
                  <td className="border-b border-neutral-200 px-4 py-3 text-right tabular-nums">
                    {formatCurrency(item.unitPrice, meta.currency)}
                  </td>
                  <td className="border-b border-neutral-200 px-4 py-3 text-right font-medium tabular-nums">
                    {formatCurrency(
                      item.quantity * item.unitPrice,
                      meta.currency
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="border-b border-neutral-200 px-4 py-6 text-center text-neutral-400"
                  >
                    No line items added yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-auto flex flex-col items-end gap-6">
          <TotalsBox invoice={invoice} totals={totals} accent={accent} />

          {meta.notes || meta.terms ? (
            <div className="w-full space-y-4">
              {meta.notes ? (
                <div>
                  <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                    Notes
                  </p>
                  <p className="mt-1 text-xs whitespace-pre-wrap text-neutral-600">
                    {meta.notes}
                  </p>
                </div>
              ) : null}
              {meta.terms ? (
                <div>
                  <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                    Terms & Conditions
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
      <p className="font-semibold tracking-wide text-neutral-500 uppercase">
        {label}
      </p>
      <p className="mt-0.5 font-medium text-neutral-900">{value || "—"}</p>
    </div>
  )
}

function Party({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
        {label}
      </p>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

function TotalsBox({
  invoice,
  totals,
  accent,
}: {
  invoice: Invoice
  totals: CalculatedTotals
  accent: string
}) {
  const { meta } = invoice
  return (
    <div className="w-72">
      <Row
        label="Subtotal"
        value={formatCurrency(totals.subtotal, meta.currency)}
      />
      {totals.discountAmount > 0 ? (
        <Row
          label={
            invoice.totals.discountType === "percent"
              ? `Discount (${invoice.totals.discount}%)`
              : "Discount"
          }
          value={`−${formatCurrency(totals.discountAmount, meta.currency)}`}
        />
      ) : null}
      {totals.taxAmount > 0 ? (
        <Row
          label={`Tax (${invoice.totals.taxRate}%)`}
          value={formatCurrency(totals.taxAmount, meta.currency)}
        />
      ) : null}
      {totals.shipping > 0 ? (
        <Row
          label="Shipping"
          value={formatCurrency(totals.shipping, meta.currency)}
        />
      ) : null}
      <div
        className="mt-2 flex items-center justify-between rounded-lg px-3 py-2.5"
        style={{ backgroundColor: accent }}
      >
        <span className="text-sm font-semibold text-white">Total Due</span>
        <span className="text-base font-bold text-white tabular-nums">
          {formatCurrency(totals.total, meta.currency)}
        </span>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 py-1.5 text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  )
}
