"use client"

import * as React from "react"

import { JsonImportDialog } from "@/components/invoice/json-import-dialog"
import { useInvoice } from "@/components/invoice/invoice-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { downloadJson } from "@/lib/invoice/json"
import {
  FileJsonIcon,
  FileDownIcon,
  LoaderCircleIcon,
  PrinterIcon,
  RotateCcwIcon,
} from "lucide-react"

function DownloadPdfButton() {
  const { invoice } = useInvoice()
  const [pending, setPending] = React.useState(false)

  async function handleDownload() {
    if (pending) {
      return
    }
    setPending(true)
    try {
      const { downloadInvoicePdf } =
        await import("@/components/invoice/invoice-pdf")
      await downloadInvoicePdf(invoice)
    } catch (error) {
      console.error("PDF export failed", error)
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      onClick={handleDownload}
      disabled={pending}
    >
      {pending ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <FileDownIcon data-icon="inline-start" />
      )}
      {pending ? "Preparing…" : "Download PDF"}
    </Button>
  )
}

function ResetButton() {
  const { dispatch } = useInvoice()

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="sm" />}>
        <RotateCcwIcon data-icon="inline-start" />
        Reset
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset invoice?</DialogTitle>
          <DialogDescription>
            This clears everything you&apos;ve entered and loads a fresh sample
            invoice. There is no undo and nothing is saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button
            type="button"
            variant="destructive"
            onClick={() => dispatch({ type: "reset" })}
          >
            Reset invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function Toolbar() {
  const { invoice } = useInvoice()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => window.print()}
        title="Print or save as PDF via the browser dialog"
      >
        <PrinterIcon data-icon="inline-start" />
        Print
      </Button>
      <DownloadPdfButton />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => downloadJson(invoice)}
        title="Download the invoice data as a JSON file"
      >
        <FileJsonIcon data-icon="inline-start" />
        Export JSON
      </Button>
      <JsonImportDialog />
      <ResetButton />
    </div>
  )
}
