"use client"

import { FormSection } from "@/components/invoice/form-section"
import { useInvoice } from "@/components/invoice/invoice-provider"
import { NumberInput } from "@/components/invoice/number-input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReceiptIcon } from "lucide-react"

export function TotalsForm() {
  const { invoice, dispatch } = useInvoice()
  const { totals } = invoice

  return (
    <FormSection
      title="Tax, Discount & Fees"
      description="Extra amounts applied to the subtotal"
      icon={<ReceiptIcon />}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Tax Rate (%)
          </span>
          <NumberInput
            value={totals.taxRate}
            onValueChange={(taxRate) =>
              dispatch({ type: "updateTotals", patch: { taxRate } })
            }
            className="text-right"
            aria-label="Tax rate percent"
          />
          <p className="text-xs text-muted-foreground">
            Applied after discounts
          </p>
        </div>

        <div className="col-span-2 flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Discount
          </span>
          <div className="flex gap-2">
            <NumberInput
              value={totals.discount}
              onValueChange={(discount) =>
                dispatch({ type: "updateTotals", patch: { discount } })
              }
              className="text-right"
              aria-label="Discount amount"
            />
            <div className="flex rounded-lg border border-input bg-muted/40 p-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 rounded-md text-xs",
                  totals.discountType === "percent" && "bg-background shadow-sm"
                )}
                onClick={() =>
                  dispatch({
                    type: "updateTotals",
                    patch: { discountType: "percent" },
                  })
                }
              >
                %
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 rounded-md text-xs",
                  totals.discountType === "flat" && "bg-background shadow-sm"
                )}
                onClick={() =>
                  dispatch({
                    type: "updateTotals",
                    patch: { discountType: "flat" },
                  })
                }
              >
                {invoice.meta.currency}
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Shipping & Additional Fees
          </span>
          <NumberInput
            value={totals.shipping}
            onValueChange={(shipping) =>
              dispatch({ type: "updateTotals", patch: { shipping } })
            }
            className="text-right"
            aria-label="Shipping and additional fees"
          />
        </div>
      </div>
    </FormSection>
  )
}
