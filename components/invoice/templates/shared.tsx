import type { ClientInfo, CompanyInfo } from "@/lib/invoice/types"

export function companyAddressLines(company: CompanyInfo): string[] {
  const lines: string[] = []
  if (company.address) {
    lines.push(company.address)
  }
  const cityState = [company.city, company.state].filter(Boolean).join(", ")
  const zipCountry = [company.zip, company.country].filter(Boolean).join(", ")
  if (cityState) {
    lines.push(zipCountry ? `${cityState} ${zipCountry}` : cityState)
  } else if (zipCountry) {
    lines.push(zipCountry)
  }
  return lines
}

export function clientAddressLines(client: ClientInfo): string[] {
  const lines: string[] = []
  if (client.company) {
    lines.push(client.company)
  }
  if (client.address) {
    lines.push(client.address)
  }
  const cityState = [client.city, client.state].filter(Boolean).join(", ")
  const zipCountry = [client.zip, client.country].filter(Boolean).join(", ")
  if (cityState) {
    lines.push(zipCountry ? `${cityState} ${zipCountry}` : cityState)
  } else if (zipCountry) {
    lines.push(zipCountry)
  }
  return lines
}

export function hasCompanyInfo(company: CompanyInfo): boolean {
  return Boolean(
    company.name ||
    company.address ||
    company.city ||
    company.state ||
    company.zip ||
    company.country ||
    company.email ||
    company.phone
  )
}

export function hasClientInfo(client: ClientInfo): boolean {
  return Boolean(
    client.name ||
    client.company ||
    client.address ||
    client.city ||
    client.state ||
    client.zip ||
    client.country ||
    client.email ||
    client.phone
  )
}
