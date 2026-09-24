"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Info,
  AlertTriangle,
  Play,
  CheckCircle,
  ChevronDown,
  AlertCircle,
  Eye,
  Trash2,
  FolderKanban,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect, type OptionType } from "@/components/ui/MultiSelect"
import { DatePicker } from "@/components/ui/date-picker"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COMPONENT_OPTIONS: OptionType[] = [
  { label: "Next.js 16", value: "nextjs" },
  { label: "React 19", value: "react" },
  { label: "Tailwind CSS v4", value: "tailwind" },
  { label: "shadcn/ui", value: "shadcn" },
  { label: "TanStack Query", value: "query" },
]

const FAQ_ITEMS = [
  { q: "How do I switch layout theme modes?", a: "Navigate to Settings > Preferences, or toggle the theme switch in the dashboard top navigation bar." },
  { q: "How is form validation handled?", a: "Forms are powered by React Hook Form with Zod schemas for robust type-safe validation on both client and server." },
  { q: "How does authentication work?", a: "Better-Auth manages secure HTTP-only cookies with session replication, social OAuth (Google), and role-based guards." },
]

interface ProjectItem {
  id: string
  name: string
  category: string
  ownerName: string
  ownerEmail: string
  status: "active" | "review" | "paused"
  progress: number
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "PRJ-101",
    name: "Universal Next-Node Portal",
    category: "Web Application",
    ownerName: "Alex Morgan",
    ownerEmail: "alex@example.com",
    status: "active",
    progress: 82,
  },
  {
    id: "PRJ-102",
    name: "Payment Gateway Core API",
    category: "Infrastructure",
    ownerName: "Sarah Connor",
    ownerEmail: "sarah@example.com",
    status: "review",
    progress: 45,
  },
  {
    id: "PRJ-103",
    name: "Customer Portal & CRM",
    category: "Mobile & Web",
    ownerName: "David Chen",
    ownerEmail: "david@example.com",
    status: "paused",
    progress: 15,
  },
]

export const ComponentsShowcase: React.FC = () => {
  const [selectedMulti, setSelectedMulti] = useState<string[]>(["nextjs", "shadcn"])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [radioVal, setRadioVal] = useState("option-1")
  const [switchVal, setSwitchVal] = useState(true)
  const [checkboxVal, setCheckboxVal] = useState(false)
  const [selectVal, setSelectVal] = useState("standard")
  const [isLoadingDemo, setIsLoadingDemo] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const triggerLoading = () => {
    setIsLoadingDemo(true)
    setTimeout(() => setIsLoadingDemo(false), 2000)
  }

  const handleSelectAllProjects = (checked: boolean) => {
    if (checked) {
      setSelectedProjects(PROJECTS_DATA.map((p) => p.id))
    } else {
      setSelectedProjects([])
    }
  }

  const handleSelectProject = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProjects([...selectedProjects, id])
    } else {
      setSelectedProjects(selectedProjects.filter((p) => p !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <Sparkles className="h-7 w-7 text-primary" />
            <span>UI Components Catalog</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Interactive developer playground showcasing every Shadcn UI primitive and layout pattern.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit text-xs font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20">
          Shadcn + Radix System
        </Badge>
      </div>

      {/* Local Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 p-3.5 rounded-xl bg-primary text-primary-foreground shadow-lg border border-border animate-in slide-in-from-bottom-5">
          <CheckCircle className="h-4.5 w-4.5 stroke-[2.5]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Alert Callouts & Banners Section */}
      <Card className="border border-border/70 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold">Callouts & Alert Banners</CardTitle>
          <CardDescription className="text-xs">Contextual message containers for user feedback.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
            <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <span className="font-bold">Operational Success</span>
              <p className="text-muted-foreground mt-0.5">Settings have been securely committed and cached.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <span className="font-bold">Pending Synchronizations</span>
              <p className="text-muted-foreground mt-0.5">2 jobs are queued in the background worker pipeline.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
            <div>
              <span className="font-bold">Security Discrepancies</span>
              <p className="text-muted-foreground mt-0.5">API tokens require rotation in the developer console.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs">
            <Info className="h-4.5 w-4.5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <span className="font-bold">System Telemetry Logs</span>
              <p className="text-muted-foreground mt-0.5">Automated telemetry metrics are streamed every 60 seconds.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Projects Data Table */}
      <Card className="border border-border/70 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-primary" />
            <span>Comprehensive Projects Board</span>
          </CardTitle>
          <CardDescription className="text-xs">
            A rich table showcasing checkboxes, progress bars, avatars, status badges, and item actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProjects.length === PROJECTS_DATA.length}
                    onCheckedChange={handleSelectAllProjects}
                    aria-label="Select all projects"
                  />
                </TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Lead Owner</TableHead>
                <TableHead>Completeness</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROJECTS_DATA.map((project) => {
                const isSelected = selectedProjects.includes(project.id)
                return (
                  <TableRow key={project.id} data-state={isSelected ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectProject(project.id, !!checked)}
                        aria-label={`Select ${project.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground text-sm">{project.name}</div>
                        <div className="text-xs text-muted-foreground">{project.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
                          {project.ownerName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-foreground">{project.ownerName}</div>
                          <div className="text-[10px] text-muted-foreground">{project.ownerEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 w-32">
                        <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "active"
                            ? "default"
                            : project.status === "review"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs uppercase font-semibold"
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 cursor-pointer"
                          onClick={() => showToast(`Viewing ${project.name}`)}
                        >
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:bg-destructive/10 cursor-pointer"
                          onClick={() => showToast(`Deleted ${project.name}`)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3. Interactive Inputs, Selects & DatePicker */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Form Controls & Inputs</CardTitle>
            <CardDescription className="text-xs">Interactive fields with real-time feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Standard Text Input</label>
              <Input placeholder="Enter username or repository..." />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Single Select Menu</label>
              <Select value={selectVal} onValueChange={setSelectVal}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Edition</SelectItem>
                  <SelectItem value="pro">Pro Developer</SelectItem>
                  <SelectItem value="enterprise">Enterprise Tier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Multi-Select Combobox</label>
              <MultiSelect
                options={COMPONENT_OPTIONS}
                selected={selectedMulti}
                onChange={setSelectedMulti}
                placeholder="Pick technologies..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Date Picker</label>
              <DatePicker date={selectedDate} setDate={setSelectedDate} />
            </div>
          </CardContent>
        </Card>

        {/* Toggles, Checkboxes & Radios */}
        <Card className="border border-border/70 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Toggles, Radios & Switches</CardTitle>
            <CardDescription className="text-xs">Selection primitives with native accessibility.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-foreground">Real-time Push Notifications</div>
                <div className="text-[11px] text-muted-foreground">Receive instant desktop alerts when actions finish.</div>
              </div>
              <Switch checked={switchVal} onCheckedChange={setSwitchVal} />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/20">
              <Checkbox
                id="showcase-checkbox"
                checked={checkboxVal}
                onCheckedChange={(checked) => setCheckboxVal(!!checked)}
              />
              <label htmlFor="showcase-checkbox" className="text-xs font-medium cursor-pointer text-foreground">
                I agree to automatic telemetry streaming and analytics reporting.
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Radio Option Group</label>
              <RadioGroup value={radioVal} onValueChange={setRadioVal} className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2 p-2.5 rounded-md border border-border/60 bg-card">
                  <RadioGroupItem value="option-1" id="r1" />
                  <label htmlFor="r1" className="text-xs font-medium cursor-pointer text-foreground">
                    Public Visibility
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-2.5 rounded-md border border-border/60 bg-card">
                  <RadioGroupItem value="option-2" id="r2" />
                  <label htmlFor="r2" className="text-xs font-medium cursor-pointer text-foreground">
                    Private Workspace
                  </label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Buttons, Badges & Dialogs */}
      <Card className="border border-border/70 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold">Buttons, Badges & Modals</CardTitle>
          <CardDescription className="text-xs">Action variants, status pills, and overlay dialogs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Button Variants</div>
            <div className="flex flex-wrap gap-2.5">
              <Button onClick={() => showToast("Primary Clicked")}>Primary Button</Button>
              <Button variant="secondary" onClick={() => showToast("Secondary Clicked")}>Secondary</Button>
              <Button variant="outline" onClick={() => showToast("Outline Clicked")}>Outline</Button>
              <Button variant="destructive" onClick={() => showToast("Destructive Clicked")}>Destructive</Button>
              <Button variant="ghost" onClick={() => showToast("Ghost Clicked")}>Ghost</Button>
              <Button disabled={isLoadingDemo} onClick={triggerLoading}>
                {isLoadingDemo ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                    Loading…
                  </>
                ) : (
                  "Click to Load"
                )}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Badge Variants</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default Active</Badge>
              <Badge variant="secondary">Secondary Info</Badge>
              <Badge variant="outline">Outline Border</Badge>
              <Badge variant="destructive">Destructive Alert</Badge>
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">Custom Green</Badge>
              <Badge className="bg-amber-600 text-white hover:bg-amber-700">Custom Amber</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dialog / Modal Window</div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 cursor-pointer">
                  <Play className="h-4 w-4 text-primary" />
                  <span>Open Interactive Modal</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    This is an accessible Shadcn dialog modal with focus trapping and ESC support.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-3 text-sm text-muted-foreground">
                  You can embed forms, confirmations, or complex data inspectors directly into this modal.
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Dismiss</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      setDialogOpen(false)
                      showToast("Action confirmed successfully!")
                    }}
                  >
                    Confirm & Proceed
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* 5. Tabs & Accordion FAQ */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Tabs Navigation Container</CardTitle>
            <CardDescription className="text-xs">Seamless content segmentation with animated state.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="logs">Audit Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4 rounded-lg bg-muted/20 border border-border/40 mt-3 space-y-2 text-xs">
                <div className="font-semibold text-foreground">System Health: 100% Operational</div>
                <p className="text-muted-foreground">All backend microservices and databases are actively responding with sub-50ms latency.</p>
              </TabsContent>
              <TabsContent value="metrics" className="p-4 rounded-lg bg-muted/20 border border-border/40 mt-3 space-y-2 text-xs">
                <div className="font-semibold text-foreground">Memory Heap Allocation</div>
                <p className="text-muted-foreground">Heap Used: 42 MB / 128 MB RSS.</p>
              </TabsContent>
              <TabsContent value="logs" className="p-4 rounded-lg bg-muted/20 border border-border/40 mt-3 space-y-2 text-xs">
                <div className="font-semibold text-foreground">Recent Events (3 entries)</div>
                <ul className="space-y-1 text-muted-foreground list-disc pl-4">
                  <li>Session verified for user@example.com</li>
                  <li>Prisma migrations validated</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Accordion / Collapsible FAQ</CardTitle>
            <CardDescription className="text-xs">Smooth collapsible content drawers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openAccordion === idx
              return (
                <div key={idx} className="border border-border/60 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-muted-foreground border-t border-border/40 pt-2 bg-muted/10">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* 6. Skeletons & Loading States */}
      <Card className="border border-border/70 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold">Skeleton Loading Placeholders</CardTitle>
          <CardDescription className="text-xs">Smooth shimmer states for content loading hydration.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2 p-4 rounded-lg border border-border/60 bg-muted/10">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/60 bg-muted/10">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-2.5 w-3/4" />
            </div>
          </div>
          <div className="space-y-2 p-4 rounded-lg border border-border/60 bg-muted/10">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-2 w-1/2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComponentsShowcase
