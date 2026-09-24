"use client"

import React, { useState } from "react"
import { Activity, Search, ShieldCheck, Database, Key, CheckCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const LOG_ENTRIES = [
  { id: "LOG-9001", action: "AUTH_LOGIN", status: "SUCCESS", ip: "127.0.0.1", agent: "Mozilla/5.0 Chrome/120.0", time: "2026-09-24 12:00" },
  { id: "LOG-9002", action: "TOKEN_VERIFY", status: "SUCCESS", ip: "127.0.0.1", agent: "Better-Auth Session", time: "2026-09-24 11:45" },
  { id: "LOG-9003", action: "PROFILE_UPDATE", status: "SUCCESS", ip: "127.0.0.1", agent: "Next.js Client", time: "2026-09-24 11:30" },
  { id: "LOG-9004", action: "SCHEMA_MIGRATION", status: "SUCCESS", ip: "Server CLI", agent: "Prisma Engine", time: "2026-09-24 10:00" },
  { id: "LOG-9005", action: "DATABASE_HEALTH", status: "SUCCESS", ip: "localhost", agent: "NestJS /health", time: "2026-09-24 09:30" },
]

export default function ActivityLogPage() {
  const [search, setSearch] = useState("")

  const filtered = LOG_ENTRIES.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.ip.includes(search)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <Activity className="h-7 w-7 text-primary" />
            <span>Activity & Audit Trail</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review security events, authentication handshakes, and system operations.
          </p>
        </div>
      </div>

      <Card className="border border-border/80 shadow-xs">
        <CardHeader className="p-4 border-b border-border/60">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search audit trail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Client IP</TableHead>
                <TableHead>User Agent / Service</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs font-semibold text-primary">{log.id}</TableCell>
                  <TableCell className="font-medium text-xs text-foreground">{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{log.agent}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
