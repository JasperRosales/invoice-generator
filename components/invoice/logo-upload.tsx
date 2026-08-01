"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ImagePlusIcon, Trash2Icon } from "lucide-react"

const MAX_LOGO_SIZE = 2 * 1024 * 1024

interface LogoUploadProps {
  value: string | null
  onChange: (dataUrl: string | null) => void
}

function LogoUpload({ value, onChange }: LogoUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [error, setError] = React.useState<string | null>(null)

  function handleFile(file: File | undefined | null) {
    setError(null)
    if (!file) {
      return
    }
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }
    if (file.size > MAX_LOGO_SIZE) {
      setError("Image must be 2 MB or smaller.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      onChange(String(reader.result))
    }
    reader.onerror = () => {
      setError("Could not read the image file.")
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">
        Company Logo
      </span>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative size-16 overflow-hidden rounded-lg border border-border bg-white ring-1 ring-foreground/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Company logo"
              className="size-full object-contain p-1"
            />
          </div>
        ) : (
          <div className="flex size-16 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground">
            <ImagePlusIcon className="size-6" />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              {value ? "Replace" : "Upload"}
            </Button>
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onChange(null)}
                aria-label="Remove logo"
              >
                <Trash2Icon />
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            PNG, JPG or SVG up to 2 MB
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-label="Upload company logo"
        onChange={(event) => {
          handleFile(event.target.files?.[0])
          event.target.value = ""
        }}
      />
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { LogoUpload }
