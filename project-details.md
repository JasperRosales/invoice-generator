# Invoice Generator

## Overview

Build a modern, privacy-first invoice generator that enables freelancers, small businesses, and independent professionals to create professional invoices without requiring an account or server-side storage.

The application should provide a fast and intuitive experience for creating, previewing, printing, and exporting invoices. All invoice processing should occur entirely within the user's browser, ensuring complete control over their data.

---

## Target Audience

* Freelancers
* Small Businesses
* Agencies
* Consultants
* Contractors

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Forms & Validation

* React Hook Form
* Zod

### PDF Generation

* react-pdf or html2pdf.js

### Deployment

* Vercel

---

## Features

### Invoice Information

* Invoice Number
* Invoice Date
* Due Date
* Purchase Order Number (Optional)
* Currency Selection
* Notes
* Terms & Conditions

### Company Information

* Business Name
* Business Address
* Contact Information
* Tax Identification Number (Optional)
* Company Logo Upload

### Client Information

* Client Name
* Company Name
* Billing Address
* Email Address
* Phone Number (Optional)

### Invoice Items

* Unlimited Line Items
* Product or Service Description
* Quantity
* Unit Price
* Automatic Line Totals
* Reorder and Remove Items

### Calculations

* Automatic Subtotal
* Tax Calculation
* Discount Support
* Shipping & Additional Fees
* Grand Total

### Export

* Live Invoice Preview
* Print-Friendly Layout
* Export as PDF
* Export Invoice Data as JSON
* Import Invoice Data from JSON

### User Experience

* Responsive Design
* Light & Dark Mode
* Keyboard-Friendly Forms
* Accessible Components
* Multiple Invoice Templates

---

## Nice-to-Have

* Multiple Brand Color Themes
* Custom Fonts
* Invoice Template Gallery
* QR Code for Payments
* Signature Upload
* Multi-language Support
* Automatic Invoice Number Suggestions
* Recently Used Company Information (Current Session Only)

---

## Privacy & Data Handling

This application is designed with privacy as a core principle.

* No user accounts are required.
* No database should be used.
* No server-side storage should be implemented.
* No analytics or user tracking should be included.
* Invoice data should never be automatically saved to Local Storage, Session Storage, IndexedDB, cookies, or any other persistent browser storage.
* All invoice data should exist only in memory during the current browser session.
* Closing or refreshing the browser should clear any unsaved information.

Users are responsible for saving their work by exporting the invoice as a PDF or JSON file before leaving the application.

---

## Security Considerations

* Process all invoice data entirely within the browser.
* Never transmit invoice data to external services.
* Validate all user input before rendering or exporting.
* Sanitize uploaded company logos before display.
* Prevent HTML or script injection within invoice fields.
* Keep all generated documents local to the user's device.

---

## Goal

Create a fast, secure, and privacy-focused invoice generator that enables users to produce professional invoices without requiring an account, cloud storage, or any persistent data collection. The application should demonstrate modern frontend development practices while respecting user privacy by ensuring all sensitive information remains under the user's control.
