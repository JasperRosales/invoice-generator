"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { parseAmount, round2 } from "@/lib/invoice/format"

interface NumberInputProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "type"
> {
  value: number
  onValueChange: (value: number) => void
  className?: string
  min?: number
}

function NumberInput({
  value,
  onValueChange,
  className,
  min = 0,
  ...props
}: NumberInputProps) {
  const [text, setText] = React.useState<string>(() => String(value))
  const focusedRef = React.useRef(false)

  React.useEffect(() => {
    if (!focusedRef.current) {
      setText(String(round2(value)))
    }
  }, [value])

  return (
    <Input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={text}
      onFocus={() => {
        focusedRef.current = true
      }}
      onBlur={(event) => {
        focusedRef.current = false
        const parsed = parseAmount(event.currentTarget.value)
        const clamped = min !== undefined ? Math.max(min, parsed) : parsed
        setText(String(round2(clamped)))
        onValueChange(clamped)
      }}
      onChange={(event) => {
        const raw = event.currentTarget.value
        setText(raw)
        if (/^-?\d*\.?\d*$/.test(raw)) {
          onValueChange(parseAmount(raw))
        }
      }}
      className={cn("tabular-nums", className)}
      {...props}
    />
  )
}

export { NumberInput }
