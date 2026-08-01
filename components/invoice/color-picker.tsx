"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ACCENT_COLORS } from "@/lib/invoice/templates"
import { CheckIcon } from "lucide-react"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="justify-start gap-2">
            <span
              aria-hidden
              className="size-4 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: value }}
            />
            <span className="font-mono text-xs uppercase">{value}</span>
          </Button>
        }
      />
      <PopoverContent className="w-60">
        <div className="grid grid-cols-5 gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Use accent color ${color}`}
              onClick={() => onChange(color)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full ring-1 ring-black/10 transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50",
                value.toLowerCase() === color.toLowerCase() &&
                  "ring-2 ring-foreground ring-offset-2"
              )}
              style={{ backgroundColor: color }}
            >
              {value.toLowerCase() === color.toLowerCase() ? (
                <CheckIcon className="size-4 text-white" />
              ) : null}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <label
            htmlFor="custom-accent-color"
            className="flex-1 text-xs text-muted-foreground"
          >
            Custom color
          </label>
          <input
            id="custom-accent-color"
            type="color"
            value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#c2410c"}
            onChange={(event) => onChange(event.target.value)}
            className="size-7 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
            aria-label="Custom accent color"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker }
