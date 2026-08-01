"use client"

import { FormSection } from "@/components/invoice/form-section"
import { useInvoice } from "@/components/invoice/invoice-provider"
import { NumberInput } from "@/components/invoice/number-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/invoice/format"
import type { InvoiceItem } from "@/lib/invoice/types"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react"

export function ItemsForm() {
  const { invoice, dispatch } = useInvoice()
  const { items, meta } = invoice

  function updateItem(
    id: string,
    patch: { description?: string; quantity?: number; unitPrice?: number }
  ) {
    dispatch({ type: "updateItem", id, patch })
  }

  function move(id: string, direction: -1 | 1) {
    dispatch({ type: "moveItem", id, direction })
  }

  return (
    <FormSection
      title="Line Items"
      description="Products or services being billed"
      icon={<ShoppingCartIcon />}
      rightSlot={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => dispatch({ type: "addItem" })}
        >
          <PlusIcon data-icon="inline-start" />
          Add item
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="hidden grid-cols-[1fr_64px_96px_120px_auto] items-center gap-2 px-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase sm:grid">
          <span>Description</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Unit Price</span>
          <span className="text-right">Amount</span>
          <span className="sr-only">Actions</span>
        </div>

        {items.map((item, index) => (
          <ItemRow
            key={item.id}
            item={item}
            index={index}
            currency={meta.currency}
            isFirst={index === 0}
            isLast={index === items.length - 1}
            onUpdate={updateItem}
            onMove={move}
            onRemove={(id) => dispatch({ type: "removeItem", id })}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-1 w-full"
          onClick={() => dispatch({ type: "addItem" })}
        >
          <PlusIcon data-icon="inline-start" />
          Add another line item
        </Button>
      </div>
    </FormSection>
  )
}

interface ItemRowProps {
  item: InvoiceItem
  index: number
  currency: string
  isFirst: boolean
  isLast: boolean
  onUpdate: (
    id: string,
    patch: { description?: string; quantity?: number; unitPrice?: number }
  ) => void
  onMove: (id: string, direction: -1 | 1) => void
  onRemove: (id: string) => void
}

function ItemRow({
  item,
  index,
  currency,
  isFirst,
  isLast,
  onUpdate,
  onMove,
  onRemove,
}: ItemRowProps) {
  const amount = formatCurrency(item.quantity * item.unitPrice, currency)
  const number = index + 1

  return (
    <div className="rounded-lg border border-border bg-background p-2 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
      <div className="hidden items-center gap-2 sm:grid sm:grid-cols-[1fr_64px_96px_120px_auto]">
        <Input
          value={item.description}
          onChange={(event) =>
            onUpdate(item.id, { description: event.target.value })
          }
          placeholder="Product or service"
          aria-label={`Item ${number} description`}
        />
        <NumberInput
          value={item.quantity}
          onValueChange={(quantity) => onUpdate(item.id, { quantity })}
          aria-label={`Item ${number} quantity`}
          className="text-right"
        />
        <NumberInput
          value={item.unitPrice}
          onValueChange={(unitPrice) => onUpdate(item.id, { unitPrice })}
          aria-label={`Item ${number} unit price`}
          className="text-right"
        />
        <span className="text-right text-sm font-medium tabular-nums">
          {amount}
        </span>
        <ItemActions
          number={number}
          isFirst={isFirst}
          isLast={isLast}
          onMove={() => onMove(item.id, -1)}
          onMoveDown={() => onMove(item.id, 1)}
          onRemove={() => onRemove(item.id)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:hidden">
        <div className="flex items-center gap-2">
          <Input
            value={item.description}
            onChange={(event) =>
              onUpdate(item.id, { description: event.target.value })
            }
            placeholder="Product or service"
            aria-label={`Item ${number} description`}
          />
          <ItemActions
            number={number}
            isFirst={isFirst}
            isLast={isLast}
            onMove={() => onMove(item.id, -1)}
            onMoveDown={() => onMove(item.id, 1)}
            onRemove={() => onRemove(item.id)}
          />
        </div>
        <div className="grid grid-cols-[1fr_1fr_1.2fr] items-end gap-2">
          <div className="flex flex-col gap-1">
            <MiniLabel>Qty</MiniLabel>
            <NumberInput
              value={item.quantity}
              onValueChange={(quantity) => onUpdate(item.id, { quantity })}
              aria-label={`Item ${number} quantity`}
              className="text-right"
            />
          </div>
          <div className="flex flex-col gap-1">
            <MiniLabel>Unit Price</MiniLabel>
            <NumberInput
              value={item.unitPrice}
              onValueChange={(unitPrice) => onUpdate(item.id, { unitPrice })}
              aria-label={`Item ${number} unit price`}
              className="text-right"
            />
          </div>
          <div className="flex flex-col gap-1">
            <MiniLabel>Amount</MiniLabel>
            <div className="flex h-8 items-center justify-end rounded-lg bg-muted/40 px-2 text-sm font-medium tabular-nums">
              {amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </span>
  )
}

function ItemActions({
  number,
  isFirst,
  isLast,
  onMove,
  onMoveDown,
  onRemove,
}: {
  number: number
  isFirst: boolean
  isLast: boolean
  onMove: () => void
  onMoveDown: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        disabled={isFirst}
        onClick={onMove}
        aria-label={`Move item ${number} up`}
      >
        <ArrowUpIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        disabled={isLast}
        onClick={onMoveDown}
        aria-label={`Move item ${number} down`}
      >
        <ArrowDownIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="text-destructive hover:bg-destructive/10"
        onClick={onRemove}
        aria-label={`Remove item ${number}`}
      >
        <Trash2Icon />
      </Button>
    </div>
  )
}
