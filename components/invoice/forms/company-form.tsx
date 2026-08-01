"use client"

import { FormSection } from "@/components/invoice/form-section"
import { Field } from "@/components/invoice/field"
import { useInvoice } from "@/components/invoice/invoice-provider"
import { LogoUpload } from "@/components/invoice/logo-upload"
import type { CompanyInfo } from "@/lib/invoice/types"
import { Building2Icon } from "lucide-react"

const FIELDS: {
  key: Exclude<keyof CompanyInfo, "logo">
  label: string
  placeholder: string
  type?: "email"
}[] = [
  { key: "name", label: "Business Name", placeholder: "Acme Inc." },
  { key: "address", label: "Business Address", placeholder: "Street address" },
  { key: "city", label: "City", placeholder: "City" },
  { key: "state", label: "State / Province", placeholder: "State" },
  { key: "zip", label: "Postal Code", placeholder: "Zip" },
  { key: "country", label: "Country", placeholder: "Country" },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "billing@acme.com",
  },
  { key: "phone", label: "Phone (Optional)", placeholder: "+1 (555) 000-0000" },
  { key: "taxId", label: "Tax ID (Optional)", placeholder: "US-12-3456789" },
] as const

export function CompanyForm() {
  const { invoice, dispatch } = useInvoice()
  const { company } = invoice

  return (
    <FormSection
      title="Your Company"
      description="The sender shown at the top of the invoice"
      icon={<Building2Icon />}
    >
      <div className="flex flex-col gap-3">
        <LogoUpload
          value={company.logo}
          onChange={(logo) =>
            dispatch({ type: "updateCompany", patch: { logo } })
          }
        />

        <div className="grid grid-cols-2 gap-3">
          {FIELDS.map((field) => (
            <Field
              key={field.key}
              label={field.label}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              value={company[field.key]}
              onChange={(event) =>
                dispatch({
                  type: "updateCompany",
                  patch: { [field.key]: event.target.value },
                })
              }
              containerClassName={
                field.key === "name" || field.key === "address"
                  ? "col-span-2"
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </FormSection>
  )
}
