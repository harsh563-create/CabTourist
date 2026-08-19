"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Search,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Mail,
  MailOpen,
  Trash2,
  Phone,
  User,
} from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
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
import type { ContactMessage } from "@/lib/admin-api"
import {
  fetchContactMessages,
  markMessageRead,
  deleteContactMessage,
} from "@/lib/admin-api"

function formatDate(iso?: string): string {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  const day = date.getDate()
  const month = date.toLocaleString("en-IN", { month: "short" })
  const year = date.getFullYear()
  const hour = date.getHours() % 12 || 12
  const min = String(date.getMinutes()).padStart(2, "0")
  const ampm = date.getHours() >= 12 ? "PM" : "AM"
  return `${day} ${month} ${year} ${hour}:${min} ${ampm}`
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [viewing, setViewing] = useState<ContactMessage | null>(null)
  const [deleting, setDeleting] = useState<ContactMessage | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchContactMessages()
      setMessages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return messages
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    )
  }, [messages, query])

  const unreadCount = messages.filter((m) => !m.read).length

  const handleView = async (msg: ContactMessage) => {
    setViewing(msg)
    if (!msg.read) {
      try {
        const updated = await markMessageRead(msg.id)
        setMessages((prev) =>
          prev.map((m) => (m.id === updated.id ? { ...m, read: true } : m))
        )
      } catch {
        // ignore
      }
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await deleteContactMessage(deleting.id)
      setMessages((prev) => prev.filter((m) => m.id !== deleting.id))
      setDeleting(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete")
      setDeleting(null)
    }
  }

  return (
    <>
      <AdminTopbar title="Contact Messages" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Contact messages
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {unreadCount > 0 ? (
                <span className="text-copper font-semibold">{unreadCount} unread</span>
              ) : (
                "All read"
              )}{" "}
              · {filtered.length} of {messages.length} messages
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email or subject"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search messages"
              />
            </div>
            <Button
              variant="outline"
              onClick={load}
              disabled={loading}
              className="h-9 gap-2"
            >
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="px-0 py-2 sm:px-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2 className="size-6 animate-spin text-copper" />
                <p className="font-sans text-sm text-muted-foreground">
                  Loading messages…
                </p>
              </div>
            ) : error && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load messages
                  </p>
                  <p className="mt-1 font-sans text-xs text-muted-foreground">
                    {error}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={load}>
                  Try again
                </Button>
              </div>
            ) : filtered.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="px-4 py-3 text-left font-sans text-sm font-medium text-muted-foreground">
                        From
                      </th>
                      <th className="hidden md:table-cell px-4 py-3 text-left font-sans text-sm font-medium text-muted-foreground">
                        Subject
                      </th>
                      <th className="hidden lg:table-cell px-4 py-3 text-left font-sans text-sm font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right font-sans text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((msg) => (
                      <tr
                        key={msg.id}
                        className={cn(
                          "cursor-pointer border-b border-border/40 last:border-0 transition-colors hover:bg-muted/30",
                          !msg.read && "bg-cta/5"
                        )}
                        onClick={() => handleView(msg)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "flex size-9 shrink-0 items-center justify-center rounded-full",
                                msg.read
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-copper/15 text-copper"
                              )}
                            >
                              {msg.read ? (
                                <MailOpen className="size-4" />
                              ) : (
                                <Mail className="size-4" />
                              )}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={cn(
                                  "truncate font-sans text-sm",
                                  msg.read
                                    ? "font-medium text-muted-foreground"
                                    : "font-semibold text-foreground"
                                )}
                              >
                                {msg.name}
                              </p>
                              <p className="max-w-[200px] truncate font-sans text-xs text-muted-foreground">
                                {msg.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-4 py-3">
                          <p
                            className={cn(
                              "max-w-[250px] truncate font-sans text-sm",
                              msg.read ? "text-muted-foreground" : "font-medium text-foreground"
                            )}
                          >
                            {msg.subject}
                          </p>
                        </td>
                        <td className="hidden lg:table-cell px-4 py-3 font-sans text-sm text-muted-foreground">
                          {formatDate(msg.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Delete"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeleting(msg)
                            }}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <Mail className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {messages.length === 0
                    ? "No contact messages yet."
                    : "No messages match your search."}
                </p>
              </div>
            )}
            {error && messages.length > 0 ? (
              <p className="border-t border-border/60 px-4 py-3 text-center font-sans text-xs text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </main>

      {/* View message dialog */}
      <Dialog open={viewing !== null} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewing?.subject}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper">
                  <User className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-sans font-semibold text-foreground">
                    {viewing.name}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {viewing.email}
                  </p>
                  {viewing.phone && (
                    <p className="flex items-center gap-1 font-sans text-sm text-muted-foreground">
                      <Phone className="size-3" />
                      {viewing.phone}
                    </p>
                  )}
                </div>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                {formatDate(viewing.createdAt)}
              </p>
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="whitespace-pre-wrap font-sans text-sm text-foreground">
                  {viewing.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <ConfirmDialog
        open={deleting !== null}
        title="Delete message"
        description={`Delete message from "${deleting?.name}"? This cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
