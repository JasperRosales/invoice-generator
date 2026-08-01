"use client"

import { ColorPicker } from "@/components/invoice/color-picker"
import { FormSection } from "@/components/invoice/form-section"
import { useInvoice } from "@/components/invoice/invoice-provider"
import { cn } from "@/lib/utils"
import { TEMPLATES } from "@/lib/invoice/templates"
import { PaintbrushIcon } from "lucide-react"

export function SettingsForm() {
  const { invoice, dispatch } = useInvoice()
  const { settings } = invoice

  return (
    <FormSection
      title="Template & Theme"
      description="Choose how your invoice looks"
      icon={<PaintbrushIcon />}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() =>
                dispatch({
                  type: "updateSettings",
                  patch: { template: template.id },
                })
              }
              aria-pressed={settings.template === template.id}
              className={cn(
                "flex flex-col gap-1.5 rounded-lg border p-2 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                settings.template === template.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              )}
            >
              <span className="flex h-16 items-end gap-0.5 rounded-md border border-border bg-background p-1.5">
                <span
                  className="h-1/2 w-full rounded-sm"
                  style={{
                    backgroundColor:
                      template.id === "minimal"
                        ? "oklch(0.4 0 0)"
                        : settings.accentColor,
                  }}
                />
                <span className="h-3/4 w-full rounded-sm bg-muted" />
                <span className="h-full w-1/4 rounded-sm bg-muted" />
              </span>
              <span className="text-xs font-medium">{template.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-muted-foreground">
              Accent Color
            </span>
            <span className="text-xs text-muted-foreground">
              Used for headers and highlights
            </span>
          </div>
          <ColorPicker
            value={settings.accentColor}
            onChange={(accentColor) =>
              dispatch({ type: "updateSettings", patch: { accentColor } })
            }
          />
        </div>
      </div>
    </FormSection>
  )
}
