"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface FieldProps extends React.ComponentProps<"input"> {
  label: string
  hint?: string
  containerClassName?: string
}

function Field({
  label,
  hint,
  id,
  containerClassName,
  className,
  ...props
}: FieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <Label htmlFor={inputId} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input id={inputId} className={className} {...props} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

interface TextAreaFieldProps extends React.ComponentProps<"textarea"> {
  label: string
  hint?: string
  containerClassName?: string
}

function TextAreaField({
  label,
  hint,
  id,
  containerClassName,
  ...props
}: TextAreaFieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <Label htmlFor={inputId} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Textarea id={inputId} {...props} />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export { Field, TextAreaField }
