"use client"

import { Document, Image, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer"
import { calculateTotals } from "@/lib/invoice/calculate"
import { formatCurrency, formatDate } from "@/lib/invoice/format"
import type { Invoice } from "@/lib/invoice/types"
import {
  clientAddressLines,
  companyAddressLines,
} from "./templates/shared"

const colors = {
  ink: "#171717",
  muted: "#525252",
  faint: "#737373",
  rule: "#e5e5e5",
  white: "#ffffff",
}

function buildModernStyles(accent: string) {
  return StyleSheet.create({
    page: {
      paddingVertical: 48,
      paddingHorizontal: 44,
      fontSize: 10,
      color: colors.ink,
      fontFamily: "Helvetica",
      lineHeight: 1.45,
    },
    accentBand: {
      height: 6,
      backgroundColor: accent,
      marginTop: -48,
      marginHorizontal: -44,
      marginBottom: 28,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 28,
    },
    companyBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    companyName: {
      fontSize: 17,
      fontFamily: "Helvetica-Bold",
      color: colors.ink,
    },
    taxId: {
      fontSize: 8,
      color: colors.faint,
      marginTop: 2,
    },
    title: {
      fontSize: 28,
      fontFamily: "Helvetica-Bold",
      color: accent,
      letterSpacing: 1,
    },
    invoiceNumber: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      color: colors.ink,
      marginTop: 20,
      textAlign: "right",
    },
    metaRow: {
      flexDirection: "row",
      gap: 32,
      borderBottomWidth: 1,
      borderBottomColor: colors.rule,
      paddingBottom: 16,
      marginBottom: 20,
    },
    metaBlock: { flexGrow: 1 },
    metaLabel: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 2,
    },
    metaValue: { fontSize: 9, color: colors.ink },
    parties: {
      flexDirection: "row",
      gap: 48,
      marginBottom: 24,
    },
    partyBlock: { flexGrow: 1 },
    partyLabel: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 4,
    },
    partyName: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      color: colors.ink,
      marginBottom: 2,
    },
    partyText: { fontSize: 8, color: colors.muted },
    table: { marginBottom: 20 },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: accent,
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 4,
    },
    tableHeaderCell: {
      fontSize: 8,
      fontFamily: "Helvetica-Bold",
      color: colors.white,
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.rule,
    },
    tableCell: { fontSize: 9, color: colors.ink },
    colDesc: { flexGrow: 1 },
    colQty: { width: 44, textAlign: "right" },
    colPrice: { width: 78, textAlign: "right" },
    colAmount: { width: 88, textAlign: "right" },
    totals: {
      width: 248,
      alignSelf: "flex-end",
      marginBottom: 24,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 3,
      borderBottomWidth: 1,
      borderBottomColor: colors.rule,
    },
    totalLabel: { fontSize: 9, color: colors.muted },
    totalValue: { fontSize: 9, fontFamily: "Helvetica", color: colors.ink },
    grandTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: accent,
      borderRadius: 4,
      marginTop: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    grandLabel: {
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
      color: colors.white,
    },
    grandValue: {
      fontSize: 13,
      fontFamily: "Helvetica-Bold",
      color: colors.white,
    },
    footer: {
      marginTop: "auto",
      borderTopWidth: 1,
      borderTopColor: colors.rule,
      paddingTop: 14,
    },
    footerBlock: { marginBottom: 10 },
    footerLabel: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 3,
    },
    footerText: { fontSize: 8, color: colors.muted, lineHeight: 1.5 },
  })
}


function buildMinimalStyles(accent: string) {
  return StyleSheet.create({
    page: {
      paddingVertical: 52,
      paddingHorizontal: 52,
      fontSize: 10,
      color: colors.ink,
      fontFamily: "Helvetica",
      lineHeight: 1.45,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 26,
    },
    companyName: {
      fontSize: 15,
      fontFamily: "Helvetica-Bold",
    },
    logo: { width: 52, height: 52, objectFit: "contain", marginBottom: 8 },
    title: {
      fontSize: 20,
      color: colors.ink,
      letterSpacing: 4,
      textTransform: "uppercase",
      textAlign: "right",
    },
    invoiceNumber: {
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
      marginTop: 3,
      textAlign: "right",
    },
    metaRow: {
      flexDirection: "row",
      gap: 40,
      borderBottomWidth: 1,
      borderBottomColor: colors.rule,
      paddingBottom: 14,
      marginBottom: 22,
    },
    metaBlock: { flexGrow: 1 },
    metaLabel: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 2,
    },
    metaValue: { fontSize: 9 },
    parties: {
      flexDirection: "row",
      gap: 48,
      marginBottom: 26,
    },
    partyBlock: { flexGrow: 1 },
    partyLabel: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 5,
    },
    partyName: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      marginBottom: 2,
    },
    partyText: { fontSize: 8.5, color: colors.muted },
    table: { marginBottom: 24 },
    tableHeader: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.ink,
      paddingVertical: 6,
      paddingHorizontal: 2,
    },
    tableHeaderCell: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 7,
      paddingHorizontal: 2,
      borderBottomWidth: 1,
      borderBottomColor: colors.rule,
    },
    tableCell: { fontSize: 9 },
    colDesc: { flexGrow: 1 },
    colQty: { width: 44, textAlign: "right" },
    colPrice: { width: 78, textAlign: "right" },
    colAmount: { width: 88, textAlign: "right" },
    totals: {
      width: 240,
      alignSelf: "flex-end",
      marginBottom: 26,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.rule,
    },
    totalLabel: { fontSize: 9, color: colors.muted },
    totalValue: { fontSize: 9 },
    grandTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderTopWidth: 2,
      borderTopColor: colors.ink,
      paddingTop: 8,
      marginTop: 6,
    },
    grandLabel: {
      fontSize: 9,
      fontFamily: "Helvetica-Bold",
      letterSpacing: 1.5,
    },
    grandValue: {
      fontSize: 15,
      fontFamily: "Helvetica-Bold",
      color: accent,
    },
    footer: {
      marginTop: "auto",
      borderTopWidth: 1,
      borderTopColor: colors.rule,
      paddingTop: 14,
    },
    footerBlock: { marginBottom: 10 },
    footerLabel: {
      fontSize: 7,
      color: colors.faint,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 3,
    },
    footerText: { fontSize: 8.5, color: colors.muted, lineHeight: 1.5 },
  })
}

type PdfStyles =
  | ReturnType<typeof buildModernStyles>
  | ReturnType<typeof buildMinimalStyles>

interface PdfPageProps {
  invoice: Invoice
}

interface LayoutProps extends PdfPageProps {
  styles: PdfStyles
}

function PdfLogo({ dataUrl }: { dataUrl: string }) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      src={dataUrl}
      style={{ width: 56, height: 56, objectFit: "contain" }}
    />
  )
}

function MetaBlock({
  styles,
  label,
  value,
}: {
  styles: PdfStyles
  label: string
  value: string
}) {
  return (
    <View style={styles.metaBlock}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value || "—"}</Text>
    </View>
  )
}

function TotalsRows({
  styles,
  invoice,
  totals,
}: {
  styles: PdfStyles
  invoice: Invoice
  totals: ReturnType<typeof calculateTotals>
}) {
  const { meta } = invoice
  return (
    <>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Subtotal</Text>
        <Text style={styles.totalValue}>
          {formatCurrency(totals.subtotal, meta.currency)}
        </Text>
      </View>
      {totals.discountAmount > 0 ? (
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            {invoice.totals.discountType === "percent"
              ? `Discount (${invoice.totals.discount}%)`
              : "Discount"}
          </Text>
          <Text style={styles.totalValue}>
            −{formatCurrency(totals.discountAmount, meta.currency)}
          </Text>
        </View>
      ) : null}
      {totals.taxAmount > 0 ? (
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax ({invoice.totals.taxRate}%)</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(totals.taxAmount, meta.currency)}
          </Text>
        </View>
      ) : null}
      {totals.shipping > 0 ? (
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(totals.shipping, meta.currency)}
          </Text>
        </View>
      ) : null}
    </>
  )
}

function FooterNotes({
  styles,
  invoice,
}: {
  styles: PdfStyles
  invoice: Invoice
}) {
  const { meta } = invoice
  if (!meta.notes && !meta.terms) {
    return null
  }
  return (
    <View style={styles.footer}>
      {meta.notes ? (
        <View style={styles.footerBlock}>
          <Text style={styles.footerLabel}>Notes</Text>
          <Text style={styles.footerText}>{meta.notes}</Text>
        </View>
      ) : null}
      {meta.terms ? (
        <View style={styles.footerBlock}>
          <Text style={styles.footerLabel}>Terms & Conditions</Text>
          <Text style={styles.footerText}>{meta.terms}</Text>
        </View>
      ) : null}
    </View>
  )
}

function ItemsTable({
  styles,
  invoice,
}: LayoutProps) {
  const { items, meta } = invoice
  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.colDesc]}>Description</Text>
        <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
        <Text style={[styles.tableHeaderCell, styles.colPrice]}>Unit Price</Text>
        <Text style={[styles.tableHeaderCell, styles.colAmount]}>Amount</Text>
      </View>
      {items.map((item) => (
        <View key={item.id} style={styles.tableRow} wrap={false}>
          <Text style={[styles.tableCell, styles.colDesc]}>
            {item.description || "Line item"}
          </Text>
          <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
          <Text style={[styles.tableCell, styles.colPrice]}>
            {formatCurrency(item.unitPrice, meta.currency)}
          </Text>
          <Text style={[styles.tableCell, styles.colAmount]}>
            {formatCurrency(item.quantity * item.unitPrice, meta.currency)}
          </Text>
        </View>
      ))}
    </View>
  )
}

function PartyBlock({
  styles,
  label,
  name,
  lines,
  email,
  phone,
}: {
  styles: PdfStyles
  label: string
  name: string
  lines: string[]
  email?: string
  phone?: string
}) {
  return (
    <View style={styles.partyBlock}>
      <Text style={styles.partyLabel}>{label}</Text>
      <Text style={styles.partyName}>{name}</Text>
      {lines.map((line) => (
        <Text key={line} style={styles.partyText}>
          {line}
        </Text>
      ))}
      {email ? <Text style={styles.partyText}>{email}</Text> : null}
      {phone ? <Text style={styles.partyText}>{phone}</Text> : null}
    </View>
  )
}

function ModernPage({ invoice }: PdfPageProps) {
  const totals = calculateTotals(invoice)
  const { meta, company, client } = invoice
  const styles = buildModernStyles(invoice.settings.accentColor)

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={styles.accentBand} />
      <View style={styles.header}>
        <View style={styles.companyBlock}>
          {company.logo ? <PdfLogo dataUrl={company.logo} /> : null}
          <View>
            <Text style={styles.companyName}>
              {company.name || "Your Company"}
            </Text>
            {company.taxId ? (
              <Text style={styles.taxId}>Tax ID: {company.taxId}</Text>
            ) : null}
          </View>
        </View>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.invoiceNumber}>{meta.invoiceNumber}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <MetaBlock styles={styles} label="Invoice Date" value={formatDate(meta.issueDate)} />
        <MetaBlock styles={styles} label="Due Date" value={formatDate(meta.dueDate)} />
        <MetaBlock styles={styles} label="PO Number" value={meta.poNumber || "—"} />
        <MetaBlock styles={styles} label="Currency" value={meta.currency} />
      </View>

      <View style={styles.parties}>
        <PartyBlock
          styles={styles}
          label="From"
          name={company.name || "Your Company"}
          lines={companyAddressLines(company)}
          email={company.email}
          phone={company.phone}
        />
        <PartyBlock
          styles={styles}
          label="Bill To"
          name={client.name || "Client Name"}
          lines={clientAddressLines(client)}
          email={client.email}
          phone={client.phone}
        />
      </View>

      <ItemsTable styles={styles} invoice={invoice} />

      <View style={styles.totals}>
        <TotalsRows styles={styles} invoice={invoice} totals={totals} />
        <View style={styles.grandTotal}>
          <Text style={styles.grandLabel}>Total Due</Text>
          <Text style={styles.grandValue}>
            {formatCurrency(totals.total, meta.currency)}
          </Text>
        </View>
      </View>

      <FooterNotes styles={styles} invoice={invoice} />
    </Page>
  )
}


function MinimalPage({ invoice }: PdfPageProps) {
  const totals = calculateTotals(invoice)
  const { meta, company, client } = invoice
  const styles = buildMinimalStyles(invoice.settings.accentColor)

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <View>
          {company.logo ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={company.logo} style={styles.logo} />
          ) : null}
          {company.name ? (
            <Text style={styles.companyName}>{company.name}</Text>
          ) : null}
        </View>
        <View>
          <Text style={styles.title}>Invoice</Text>
          <Text style={styles.invoiceNumber}>{meta.invoiceNumber}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <MetaBlock styles={styles} label="Invoice Date" value={formatDate(meta.issueDate)} />
        <MetaBlock styles={styles} label="Due Date" value={formatDate(meta.dueDate)} />
        <MetaBlock styles={styles} label="PO Number" value={meta.poNumber || "—"} />
        <MetaBlock styles={styles} label="Currency" value={meta.currency} />
      </View>

      <View style={styles.parties}>
        <PartyBlock
          styles={styles}
          label="From"
          name={company.name || "Your Company"}
          lines={companyAddressLines(company)}
          email={company.email}
          phone={company.phone}
        />
        <PartyBlock
          styles={styles}
          label="Bill To"
          name={client.name || "Client Name"}
          lines={clientAddressLines(client)}
          email={client.email}
          phone={client.phone}
        />
      </View>

      <ItemsTable styles={styles} invoice={invoice} />

      <View style={styles.totals}>
        <TotalsRows styles={styles} invoice={invoice} totals={totals} />
        <View style={styles.grandTotal}>
          <Text style={styles.grandLabel}>TOTAL DUE</Text>
          <Text style={styles.grandValue}>
            {formatCurrency(totals.total, meta.currency)}
          </Text>
        </View>
      </View>

      <FooterNotes styles={styles} invoice={invoice} />
    </Page>
  )
}

interface InvoicePdfDocumentProps {
  invoice: Invoice
}

export function InvoicePdfDocument({ invoice }: InvoicePdfDocumentProps) {
  const { meta, company, client } = invoice

  return (
    <Document
      title={`${meta.invoiceNumber} - Invoice`}
      author={company.name || undefined}
      subject={client.name ? `Invoice for ${client.name}` : undefined}
    >
      {invoice.settings.template === "minimal" ? (
        <MinimalPage invoice={invoice} />
      ) : (
        <ModernPage invoice={invoice} />
      )}
    </Document>
  )
}

export async function downloadInvoicePdf(invoice: Invoice): Promise<void> {
  const blob = await pdf(<InvoicePdfDocument invoice={invoice} />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  const safeName = (invoice.meta.invoiceNumber || "invoice").replace(
    /[^a-z0-9-_]+/gi,
    "-"
  )
  link.href = url
  link.download = `${safeName}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
