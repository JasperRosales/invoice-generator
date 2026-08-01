"use client"

import { FormSection } from "@/components/invoice/form-section"
import { Field } from "@/components/invoice/field"
import { useInvoice } from "@/components/invoice/invoice-provider"
import type { ClientInfo } from "@/lib/invoice/types"
import { UsersIcon } from "lucide-react"

const FIELDS: {
  key: keyof ClientInfo
  label: string
  placeholder: string
  type?: "email"
}[] = [
  { key: "name", label: "Client Name", placeholder: "Jane Doe" },
  {
    key: "company",
    label: "Company Name (Optional)",
    placeholder: "Widgets Co.",
  },
  { key: "address", label: "Billing Address", placeholder: "Street address" },
  { key: "city", label: "City", placeholder: "City" },
  { key: "state", label: "State / Province", placeholder: "State" },
  { key: "zip", label: "Postal Code", placeholder: "Zip" },
  { key: "country", label: "Country", placeholder: "Country" },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "jane@widgets.co",
  },
  { key: "phone", label: "Phone (Optional)", placeholder: "+1 (555) 000-0000" },
] as const

export function ClientForm() {
  const { invoice, dispatch } = useInvoice()
  const { client } = invoice

  return (
    <FormSection
      title="Client"
      description="Who is being billed"
      icon={<UsersIcon />}
    >
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map((field) => (
          <Field
            key={field.key}
            label={field.label}
            type={field.type ?? "text"}
            placeholder={field.placeholder}
            value={client[field.key]}
            onChange={(event) =>
              dispatch({
                type: "updateClient",
                patch: { [field.key]: event.target.value },
              })
            }
            containerClassName={
              field.key === "name" ||
              field.key === "company" ||
              field.key === "address"
                ? "col-span-2"
                : undefined
            }
          />
        ))}
      </div>
    </FormSection>
  )
}
