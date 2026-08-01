"use client"

import * as React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { parseInvoiceJson } from "@/lib/invoice/json"
import { DownloadIcon, UploadIcon } from "lucide-react"

export function JsonImportDialog() {
  const { dispatch } = useInvoice()
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleImport() {
    try {
      const invoice = parseInvoiceJson(text)
      dispatch({ type: "load", invoice })
      setOpen(false)
      setText("")
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid invoice data.")
    }
  }

  function handleFile(file: File | undefined | null) {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setText(String(reader.result))
      setError(null)
    }
    reader.onerror = () => {
      setError("Could not read the file.")
    }
    reader.readAsText(file)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) {
          setError(null)
        }
      }}
    >
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <UploadIcon data-icon="inline-start" />
        Import JSON
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import invoice from JSON</DialogTitle>
          <DialogDescription>
            Paste exported invoice JSON or choose a .json file. Your current
            invoice will be replaced.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(event) => {
                handleFile(event.target.files?.[0])
                event.target.value = ""
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <DownloadIcon data-icon="inline-start" className="rotate-180" />
              Choose file
            </Button>
          </div>
          <Textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              setError(null)
            }}
            placeholder='{"meta": {…}, "company": {…}, …}'
            rows={8}
            className="font-mono text-xs"
            aria-label="Paste invoice JSON here"
          />
          {error ? (
            <p className="text-xs text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <DialogFooter showCloseButton>
          <Button type="button" onClick={handleImport} disabled={!text.trim()}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
