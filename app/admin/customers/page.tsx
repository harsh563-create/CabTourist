"use client"

import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
import { CustomersTable } from "@/components/admin/customers-table"
import { CustomerForm } from "@/components/admin/customer-form"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  CUSTOMER_TIERS,
  CUSTOMERS,
  type Customer,
  type CustomerTier,
} from "@/lib/admin-data"

const FILTERS: { id: CustomerTier | "all"; label: string }[] = [
  { id: "all", label: "All" },
  ...CUSTOMER_TIERS.map((t) => ({ id: t as CustomerTier, label: t })),
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS)
  const [filter, setFilter] = useState<CustomerTier | "all">("all")
  const [query, setQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [deleting, setDeleting] = useState<Customer | null>(null)

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesTier = filter === "all" || c.tier === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      return matchesTier && matchesQuery
    })
  }, [customers, filter, query])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (customer: Customer) => {
    setEditing(customer)
    setFormOpen(true)
  }

  const handleSave = (data: Omit<Customer, "id"> & { id?: string }) => {
    if (data.id) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === data.id ? ({ ...data, id: data.id } as Customer) : c
        )
      )
    } else {
      const id = `U-${Date.now().toString().slice(-4)}`
      setCustomers((prev) => [{ ...data, id } as Customer, ...prev])
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (!deleting) return
    setCustomers((prev) => prev.filter((c) => c.id !== deleting.id))
    setDeleting(null)
  }

  return (
    <>
      <AdminTopbar title="Customers" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Customer accounts
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {customers.length} customers
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email or ID"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search customers"
              />
            </div>
            <Button
              onClick={openCreate}
              className="bg-leather font-semibold text-primary-foreground hover:bg-leather/90"
            >
              <Plus className="size-4" />
              Add customer
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-md border px-3.5 py-1.5 font-sans text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-leather bg-leather text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="px-0 py-2 sm:px-2">
            {filtered.length > 0 ? (
              <CustomersTable
                customers={filtered}
                onEdit={openEdit}
                onDelete={(id) =>
                  setDeleting(customers.find((c) => c.id === id) ?? null)
                }
              />
            ) : (
              <p className="py-12 text-center font-sans text-sm text-muted-foreground">
                No customers match your filters.
              </p>
            )}
          </div>
        </div>
      </main>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit customer" : "Add customer"}</DialogTitle>
          </DialogHeader>
          <CustomerForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete customer"
        description={`Are you sure you want to delete "${deleting?.name}"? This action cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
