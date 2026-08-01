"use client"

import * as React from "react"

import { ClientForm } from "@/components/invoice/forms/client-form"
import { CompanyForm } from "@/components/invoice/forms/company-form"
import { InvoiceInfoForm } from "@/components/invoice/forms/invoice-info-form"
import { ItemsForm } from "@/components/invoice/forms/items-form"
import { SettingsForm } from "@/components/invoice/forms/settings-form"
import { TotalsForm } from "@/components/invoice/forms/totals-form"
import { InvoiceProvider } from "@/components/invoice/invoice-provider"
import { InvoicePreview } from "@/components/invoice/templates/invoice-preview"
import { ThemeToggle } from "@/components/invoice/theme-toggle"
import { Toolbar } from "@/components/invoice/toolbar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FileTextIcon, ShieldCheckIcon } from "lucide-react"

type MobileView = "edit" | "preview"

export function Workspace() {
  return (
    <InvoiceProvider>
      <WorkspaceInner />
    </InvoiceProvider>
  )
}

function WorkspaceInner() {
  const [mobileView, setMobileView] = React.useState<MobileView>("edit")

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur print:hidden">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileTextIcon className="size-4" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-sm font-medium">
                Invoice Generator
              </span>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                <ShieldCheckIcon className="size-3" />
                100% private — data never leaves your browser
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-0.5">
            <Toolbar />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="border-b bg-muted/40 lg:hidden print:hidden">
        <Tabs
          value={mobileView}
          onValueChange={(value) => setMobileView(value as MobileView)}
          className="mx-auto w-full max-w-[1600px] px-4"
        >
          <TabsList className="w-full">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <div className="grid flex-1 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] print:block">
          <div
            className={cn(
              "print:hidden",
              mobileView === "edit" ? "block" : "hidden",
              "lg:sticky lg:top-[52px] lg:block lg:h-[calc(100svh-52px)] lg:overflow-y-auto"
            )}
          >
            <div className="flex flex-col gap-4 p-4 lg:px-5 lg:py-6">
              <InvoiceInfoForm />
              <CompanyForm />
              <ClientForm />
              <ItemsForm />
              <TotalsForm />
              <SettingsForm />
            </div>
          </div>

          <div
            id="invoice-sheet-outer"
            className={cn(
              mobileView === "preview" ? "block" : "hidden",
              "lg:block"
            )}
          >
            <div className="flex min-h-svh justify-center bg-muted/40 p-4 sm:p-8 print:bg-white print:p-0">
              <div
                id="invoice-sheet"
                className="h-fit w-full max-w-[816px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 print:max-w-none print:rounded-none print:shadow-none print:ring-0"
              >
                <InvoicePreview />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t px-4 py-3 text-center text-xs text-muted-foreground print:hidden">
        Your invoice is kept in memory only. Refresh or close this tab to
        discard it — export a PDF or JSON file to save your work.
      </footer>
    </div>
  )
}
