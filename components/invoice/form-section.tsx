"use client"

import * as React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

interface FormSectionProps {
  title: string
  description?: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  rightSlot?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function FormSection({
  title,
  description,
  icon,
  defaultOpen = true,
  rightSlot,
  children,
  className,
}: FormSectionProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const sectionId = React.useId()
  const contentId = `${sectionId}-content`

  return (
    <Card size="sm" className={cn("w-full", className)}>
      <CardHeader className="flex items-center gap-3 px-4 pt-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {icon ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </span>
          ) : null}
          <span className="min-w-0 flex-1">
            <span className="block truncate font-heading text-sm leading-snug font-medium">
              {title}
            </span>
            {description ? (
              <span className="block truncate text-xs text-muted-foreground">
                {description}
              </span>
            ) : null}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        {rightSlot}
      </CardHeader>
      {open ? (
        <CardContent className="px-4 pb-4">{children}</CardContent>
      ) : null}
    </Card>
  )
}

export { FormSection }
