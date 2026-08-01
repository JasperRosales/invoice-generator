import type { InvoiceTemplateId } from "./types"

export interface TemplateDefinition {
  id: InvoiceTemplateId
  name: string
  description: string
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean, color-blocked header with a contemporary feel.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and uncluttered with a monochrome palette.",
  },
]

export function getTemplate(id: InvoiceTemplateId): TemplateDefinition {
  return TEMPLATES.find((template) => template.id === id) ?? TEMPLATES[0]
}

export const ACCENT_COLORS = [
  "#c2410c",
  "#be123c",
  "#7c3aed",
  "#2563eb",
  "#0d9488",
  "#16a34a",
  "#d97706",
  "#334155",
  "#dc2626",
  "#db2777",
]
