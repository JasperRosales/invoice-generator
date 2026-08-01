# Invoice Generator

A fast, privacy-first invoice generator for freelancers, small businesses, and
independent professionals. Create professional invoices entirely in the browser —
no account, no database, no server-side storage.

## Features

- **Invoice details** — number, issue & due dates, PO number, currency, notes, terms
- **Company & client info** — addresses, contact details, tax ID, logo upload
- **Line items** — unlimited rows, auto totals, reorder and remove
- **Calculations** — subtotal, tax rate, percent or flat discount, shipping fees
- **Two templates** — Modern and Minimal, with a customizable accent color
- **Live preview** — the invoice updates as you type
- **Export** — print-friendly layout, PDF download, JSON export, JSON import
- **Responsive** — works on desktop and mobile, with light & dark mode

## Privacy

All invoice data is processed in the browser and kept only in memory. Nothing is
saved to storage, cookies, or any server — refreshing or closing the tab discards
your work. Export a PDF or JSON file to save your invoice.


## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4 with shadcn/ui (Base UI)
- Zod for data validation
- react-pdf for PDF generation
