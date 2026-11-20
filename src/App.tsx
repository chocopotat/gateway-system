import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"

type IconName = "grid" | "users" | "home" | "card" | "car" | "visitor" | "gate" | "activity" | "report" | "user" | "bell" | "shield" | "settings" | "search" | "chevron" | "menu" | "plus" | "arrowIn" | "arrowOut" | "check" | "close" | "clock" | "wifi" | "lock" | "more" | "download" | "filter" | "scan" | "logout" | "refresh"

const iconPaths: Record<IconName, ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v11h14V10M9 21v-6h6v6" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  car: (
    <>
      <path d="m5 17-2-1v-5l2-1 2-5h10l2 5 2 1v5l-2 1" />
      <path d="M5 10h14M7 17v2M17 17v2" />
      <circle cx="7" cy="14" r="1" />
      <circle cx="17" cy="14" r="1" />
    </>
  ),
  visitor: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M3 21v-2a6 6 0 0 1 12 0v2M19 8v6M16 11h6" />
    </>
  ),
  gate: (
    <>
      <path d="M4 21V5l8-2 8 2v16M8 21V8h8v13M12 8v13" />
    </>
  ),
  activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
  report: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1-2.8 2.8-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.3 1.8V22h-4v-.6A2 2 0 0 0 8.2 19.6a2 2 0 0 0-2.2.4l-.1.1-2.8-2.8.1-.1a2 2 0 0 0 .4-2.2A2 2 0 0 0 1.8 13H1V9h.8a2 2 0 0 0 1.8-1.2 2 2 0 0 0-.4-2.2l-.1-.1 2.8-2.8.1.1a2 2 0 0 0 2.2.4A2 2 0 0 0 9.5 1.4V1h4v.4a2 2 0 0 0 1.3 1.8 2 2 0 0 0 2.2-.4l.1-.1 2.8 2.8-.1.1a2 2 0 0 0-.4 2.2A2 2 0 0 0 21.2 9h.8v4h-.8a2 2 0 0 0-1.8 2Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  menu: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrowIn: (
    <>
      <path d="M12 3v13M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  arrowOut: (
    <>
      <path d="M12 21V8M7 13l5-5 5 5" />
      <path d="M5 3h14" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r=".5" fill="currentColor" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8z" />,
  scan: (
    <>
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
      <path d="M8 12h8" />
    </>
  ),
  logout: (
    <>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="m14 16 4-4-4-4M18 12H9" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 1 0-2.3 5.7" />
      <path d="M20 4v7h-7" />
    </>
  ),
}

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

type DemoStatus = "ready" | "loading" | "error"

type NavItem = {
  name: string
  icon: IconName
}
type NavGroup = {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  { label: "Overview", items: [{ name: "Dashboard", icon: "grid" }] },
  {
    label: "Management",
    items: [
      { name: "Residents", icon: "users" },
      { name: "Houses", icon: "home" },
      { name: "Access Cards", icon: "card" },
      { name: "Vehicles", icon: "car" },
      { name: "Visitors", icon: "visitor" },
    ],
  },
  {
    label: "Operations",
    items: [
      { name: "Barcode Scanner", icon: "scan" },
      { name: "Digital Passes", icon: "card" },
      { name: "Gates", icon: "gate" },
      { name: "Access Logs", icon: "activity" },
      { name: "Reports", icon: "report" },
    ],
  },
  {
    label: "System",
    items: [
      { name: "User Management", icon: "user" },
      { name: "Audit Logs", icon: "shield" },
      { name: "Settings", icon: "settings" },
    ],
  },
]

const navItems = navGroups.flatMap((group) => group.items)

type MobileNavItem = {
  name: string
  icon: IconName
  label: string
}

const mobileNav: MobileNavItem[] = [
  { name: "Dashboard", icon: "grid", label: "Home" },
  { name: "Visitors", icon: "visitor", label: "Visitors" },
  { name: "Barcode Scanner", icon: "scan", label: "Scan" },
  { name: "Digital Passes", icon: "card", label: "Passes" },
  { name: "Settings", icon: "settings", label: "Settings" },
]

type AccessRecord = {
  id: number
  time: string
  name: string
  initials: string
  house: string
  type: string
  action: string
  gate: string
  status: string
  color: string
}

type Visitor = {
  id: number
  name: string
  initials: string
  detail: string
  time: string
  status: string
  plate: string
}

type Pass = {
  id: string
  name: string
  type: string
  house: string
  seed: number
  status: string
}

type RecordItem = {
  id: string
  name: string
  detail: string
  meta: string
  status: string
  initials: string
}

type VisitorInput = {
  name: string
  detail: string
  plate: string
}

type AuthSession = {
  name: string
  pass?: Pass
}

type Prefs = {
  email: boolean
  desktop: boolean
  weekly: boolean
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?"

const timeNow = () => new Date().toLocaleTimeString("en-GB")

const accessSeed: AccessRecord[] = [
  {
    id: 1,
    time: "10:42:18",
    name: "Budi Santoso",
    initials: "BS",
    house: "A-12",
    type: "Resident",
    action: "Tap In",
    gate: "Gate Utama",
    status: "Granted",
    color: "bg-sky-100 text-sky-800",
  },
  {
    id: 2,
    time: "10:38:04",
    name: "Andi Wijaya",
    initials: "AW",
    house: "A-12",
    type: "Visitor",
    action: "Entry",
    gate: "Gate Utama",
    status: "Granted",
    color: "bg-violet-100 text-violet-800",
  },
  {
    id: 3,
    time: "10:31:56",
    name: "Siti Rahma",
    initials: "SR",
    house: "C-08",
    type: "Resident",
    action: "Tap Out",
    gate: "Gate Keluar",
    status: "Granted",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: 4,
    time: "10:28:42",
    name: "Unknown Card",
    initials: "?",
    house: "-",
    type: "Unknown",
    action: "Tap In",
    gate: "Gate VIP",
    status: "Denied",
    color: "bg-rose-100 text-rose-800",
  },
  {
    id: 5,
    time: "10:24:11",
    name: "Rizky Pratama",
    initials: "RP",
    house: "B-04",
    type: "Resident",
    action: "Tap In",
    gate: "Gate Utama",
    status: "Granted",
    color: "bg-blue-100 text-blue-800",
  },
]

const visitorSeed: Visitor[] = [
  {
    id: 1,
    name: "Andi Wijaya",
    initials: "AW",
    detail: "A-12, hosted by Budi Santoso",
    time: "10:38",
    status: "Inside",
    plate: "B 1843 KZS",
  },
  {
    id: 2,
    name: "Maya Kusuma",
    initials: "MK",
    detail: "C-08, hosted by Siti Rahma",
    time: "10:26",
    status: "Waiting",
    plate: "D 2201 MA",
  },
  {
    id: 3,
    name: "Fajar Hidayat",
    initials: "FH",
    detail: "B-04, hosted by Rizky Pratama",
    time: "10:12",
    status: "Approved",
    plate: "B 9127 FHI",
  },
]

const passSeed: Pass[] = [
  {
    id: "RES-A12-00248",
    name: "Budi Santoso",
    type: "Resident",
    house: "A-12",
    seed: 4,
    status: "Active",
  },
  {
    id: "VIS-A12-001",
    name: "Andi Wijaya",
    type: "Visitor",
    house: "A-12",
    seed: 8,
    status: "Approved",
  },
]

const mk = (
  id: string,
  name: string,
  detail: string,
  meta: string,
  status: string,
): RecordItem => ({
  id,
  name,
  detail,
  meta,
  status,
  initials: initialsOf(name),
})

const recordSets: Record<string, RecordItem[]> = {
  Residents: [
    mk(
      "R-01",
      "Budi Santoso",
      "House A-12, registered Oct 2024",
      "A-12",
      "Active",
    ),
    mk(
      "R-02",
      "Siti Rahma",
      "House C-08, registered Jan 2025",
      "C-08",
      "Active",
    ),
    mk(
      "R-03",
      "Rizky Pratama",
      "House B-04, registered Mar 2025",
      "B-04",
      "Active",
    ),
  ],
  Houses: [
    mk(
      "H-01",
      "House A-12",
      "Occupied by Budi Santoso",
      "2 residents",
      "Active",
    ),
    mk("H-02", "House C-08", "Occupied by Siti Rahma", "3 residents", "Active"),
    mk(
      "H-03",
      "House B-04",
      "Occupied by Rizky Pratama",
      "2 residents",
      "Active",
    ),
  ],
  "Access Cards": [
    mk("C-01", "RES-A12-00248", "Assigned to Budi Santoso", "A-12", "Active"),
    mk("C-02", "RES-C08-00114", "Assigned to Siti Rahma", "C-08", "Active"),
    mk("C-03", "VIS-A12-00091", "Sample visitor pass", "A-12", "Waiting"),
  ],
  Vehicles: [
    mk("V-01", "B 1843 KZS", "Registered to Andi Wijaya", "A-12", "Active"),
    mk("V-02", "D 2201 MA", "Registered to Maya Kusuma", "C-08", "Active"),
    mk("V-03", "B 9127 FHI", "Registered to Fajar Hidayat", "B-04", "Active"),
  ],
  Gates: [
    mk(
      "GATE-01",
      "Gate Utama",
      "Main entrance, 192.168.1.101",
      "Main entrance",
      "Online",
    ),
    mk(
      "GATE-02",
      "Gate Keluar",
      "Exit lane, 192.168.1.102",
      "Exit lane",
      "Online",
    ),
    mk(
      "GATE-03",
      "Gate VIP",
      "North wing, 192.168.1.103",
      "North wing",
      "Maintenance",
    ),
  ],
  "Access Logs": accessSeed.map((r) =>
    mk(
      String(r.id),
      r.name,
      `${r.action}, ${r.gate}, ${r.time}`,
      r.house,
      r.status,
    ),
  ),
  Reports: [
    mk(
      "REP-01",
      "Daily access summary",
      "Sample report, generated today",
      "CSV",
      "Ready",
    ),
    mk(
      "REP-02",
      "Visitor movement log",
      "Sample report, generated yesterday",
      "CSV",
      "Ready",
    ),
    mk(
      "REP-03",
      "Gate exception report",
      "Sample report, generated this week",
      "CSV",
      "Ready",
    ),
  ],
  "User Management": [
    mk(
      "U-01",
      "Dimas Prakoso",
      "Administrator, demo account",
      "Admin",
      "Active",
    ),
    mk(
      "U-02",
      "Rani Setiawan",
      "Gate operator, demo account",
      "Operator",
      "Active",
    ),
    mk(
      "U-03",
      "Bagas Nugroho",
      "Gate operator, demo account",
      "Operator",
      "Waiting",
    ),
  ],
  "Audit Logs": [
    mk(
      "A-01",
      "Gate override recorded",
      "Gate VIP, sample entry",
      "09:58",
      "Recorded",
    ),
    mk(
      "A-02",
      "Visitor pass issued",
      "Andi Wijaya, sample entry",
      "09:41",
      "Recorded",
    ),
    mk(
      "A-03",
      "Denied card reviewed",
      "Unknown Card, sample entry",
      "09:12",
      "Recorded",
    ),
  ],
}

function StatusBadge({ status }: { status: string }) {
  const ok = [
    "Granted",
    "Online",
    "Inside",
    "Approved",
    "Active",
    "Ready",
    "Recorded",
    "Issued",
  ].includes(status)
  const warn = ["Waiting", "Maintenance", "Pending"].includes(status)
  return (
    <span
      className={`status ${
        ok ? "status-ok" : warn ? "status-warn" : "status-bad"
      }`}
    >
      {status}
    </span>
  )
}

function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div
      className="space-y-3 p-4 sm:p-5"
      role="status"
      aria-label="Loading sample data"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-line p-4"
        >
          <div className="skeleton h-10 w-10 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="skeleton w-1/3" />
            <div className="skeleton w-1/2" />
          </div>
          <div className="skeleton hidden w-16 sm:block" />
        </div>
      ))}
    </div>
  )
}

function BootScreen({ onDone }: { onDone: () => void }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-rail-deep p-6 text-white">
      <div
        className="w-full max-w-xs text-center"
        role="status"
        aria-live="polite"
      >
        <div className="boot-mark mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal-300 text-rail">
          <Icon name="shield" size={30} />
        </div>
        <p className="mt-6 font-display text-xl font-bold tracking-tight">
          GATEWAY
        </p>
        <p className="mt-1 text-[11px] text-teal-300">Residence security</p>
        <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="boot-progress h-full rounded-full bg-teal-300" />
        </div>
        <p className="mt-4 text-[11px] leading-5 text-slate-400">
          Preparing the Griya Harmoni demo workspace.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-5 text-[11px] font-semibold text-slate-300 underline"
        >
          Skip intro
        </button>
      </div>
    </main>
  )
}

function EmptyState({
  title,
  text,
  action,
}: {
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <div className="grid place-items-center px-5 py-14 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-canvas text-muted">
        <Icon name="search" size={20} />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 max-w-xs text-xs leading-5 text-muted">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="grid place-items-center px-5 py-14 text-center"
      role="alert"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-700">
        <Icon name="shield" size={20} />
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">
        Sample feed unavailable
      </p>
      <p className="mt-1 max-w-xs text-xs leading-5 text-muted">
        The demo is offline. Reconnect to load the sample records again.
      </p>
      <button onClick={onRetry} className="btn btn-secondary mt-4">
        <Icon name="refresh" size={15} /> Reconnect
      </button>
    </div>
  )
}

function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
        ) ?? [],
      )
    focusables()[0]?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation()
        closeRef.current()
        return
      }
      if (event.key !== "Tab") return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = oldOverflow
      previous?.focus()
    }
  }, [open])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/55 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="modal-title"
            className="font-display text-lg font-bold text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="icon-btn -mr-2 -mt-2"
            aria-label="Close dialog"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
        {footer && (
          <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div>
        )}
      </div>
    </div>
  )
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  const id = useId()
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">
        {label}
      </span>
      <input
        id={id}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="input"
      />
    </label>
  )
}

function downloadFile(name: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = name
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function exportCsv(name: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n")
  downloadFile(name, csv, "text/csv;charset=utf-8")
}

function qrCells(seed: number) {
  return Array.from({ length: 121 }, (_, i) => {
    const row = Math.floor(i / 11)
    const col = i % 11
    const finder =
      (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3)
    return finder || (i * 7 + seed * 13 + row * col) % 5 < 2
  })
}

function QrCode({
  seed = 0,
  size = "md",
}: {
  seed?: number
  size?: "sm" | "md" | "lg"
}) {
  const dimensions =
    size === "lg" ? "h-48 w-48" : size === "sm" ? "h-16 w-16" : "h-24 w-24"
  return (
    <div
      className={`${dimensions} grid grid-cols-11 gap-[2px] rounded-lg bg-white p-2 ring-1 ring-line`}
      role="img"
      aria-label="Sample access code"
    >
      {qrCells(seed).map((dark, i) => (
        <span key={i} className={dark ? "bg-ink" : "bg-transparent"} />
      ))}
    </div>
  )
}

function passSvg(pass: Pass) {
  const safeId = pass.id.replace(/[^A-Za-z0-9-]/g, "")
  const rects = qrCells(pass.seed)
    .map((dark, i) =>
      dark
        ? `<rect x="${4 + (i % 11) * 8}" y="${4 + Math.floor(i / 11) * 8}" width="7" height="7" fill="#14212c"/>`
        : "",
    )
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="120" viewBox="0 0 100 120"><rect width="100" height="120" fill="#ffffff"/>${rects}<text x="50" y="106" font-family="sans-serif" font-size="6" text-anchor="middle" fill="#14212c">${safeId}</text></svg>`
}

function MobileNav({
  current,
  onNavigate,
}: {
  current: string
  onNavigate: (name: string) => void
}) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="grid grid-cols-5">
        {mobileNav.map((item) => {
          const active = current === item.name
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onNavigate(item.name)}
              aria-current={active ? "page" : undefined}
              className="flex min-h-16 flex-col items-center justify-center gap-1 px-1 py-2"
            >
              <Icon
                name={item.icon}
                size={19}
                className={active ? "text-accent" : "text-muted"}
              />
              <span
                className={`text-[10px] font-semibold ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function Sidebar({
  current,
  onNavigate,
  open,
  onClose,
  demoStatus,
  offline,
  onReload,
  onToggleOffline,
}: {
  current: string
  onNavigate: (name: string) => void
  open: boolean
  onClose: () => void
  demoStatus: DemoStatus
  offline: boolean
  onReload: () => void
  onToggleOffline: () => void
}) {
  const navRef = useRef<HTMLElement>(null)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    navRef.current?.querySelector<HTMLElement>("button")?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const demoLabel =
    demoStatus === "loading"
      ? "Loading sample data"
      : offline
        ? "Offline"
        : "Sample data ready"

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/55 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}
      <aside
        id="app-sidebar"
        className={`rail fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-rail text-slate-200 transition-transform duration-300 lg:visible lg:translate-x-0 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center gap-3 border-b border-white/10 px-5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-300 text-rail">
            <Icon name="shield" size={20} />
          </div>
          <div className="min-w-0">
            <div className="font-display text-base font-bold leading-tight text-white">
              GATEWAY
            </div>
            <div className="text-[10px] text-teal-300">Residence security</div>
          </div>
        </div>

        <nav
          ref={navRef}
          className="scrollbar-none flex-1 overflow-y-auto px-3 py-5"
          aria-label="Main navigation"
        >
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="rail-label mb-2 px-3">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = current === item.name
                  return (
                    <button
                      key={item.name}
                      type="button"
                      aria-current={active ? "page" : undefined}
                      onClick={() => onNavigate(item.name)}
                      className="rail-item"
                    >
                      <Icon
                        name={item.icon}
                        size={18}
                        className={active ? "text-teal-300" : "text-slate-400"}
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {item.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setDemoOpen(!demoOpen)}
            aria-expanded={demoOpen}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-white/6"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md bg-white/8 text-teal-300">
              <Icon name="shield" size={15} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-white">
                Demo workspace
              </span>
              <span className="block text-[10px] text-slate-400">
                {demoLabel}
              </span>
            </span>
            <Icon
              name="chevron"
              size={14}
              className={`text-slate-400 transition ${
                demoOpen ? "rotate-90" : ""
              }`}
            />
          </button>
          {demoOpen && (
            <div className="mt-2 rounded-lg bg-white/5 p-3">
              <p className="text-[11px] leading-4 text-slate-400">
                Records and figures here are sample data.
              </p>
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={onReload}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-2 text-[11px] font-semibold text-slate-200 hover:bg-white/10"
                >
                  <Icon name="refresh" size={14} /> Reload sample data
                </button>
                <button
                  type="button"
                  onClick={onToggleOffline}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-2 text-[11px] font-semibold text-slate-200 hover:bg-white/10"
                >
                  <Icon name="wifi" size={14} />{" "}
                  {offline ? "Reconnect" : "Simulate offline"}
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function Header({
  current,
  currentUser,
  visitors,
  menuOpen,
  onMenu,
  onNavigate,
  onLogout,
}: {
  current: string
  currentUser: string
  visitors: Visitor[]
  menuOpen: boolean
  onMenu: () => void
  onNavigate: (name: string) => void
  onLogout: () => void
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const waiting = visitors.filter((visitor) => visitor.status === "Waiting")
  const notices = [
    ...waiting.map((visitor) => ({
      id: visitor.id,
      title: "Visitor approval required",
      text: `${visitor.name} is waiting at the front gate.`,
      target: "Visitors",
    })),
    {
      id: "gate-vip",
      title: "Gate VIP needs attention",
      text: "Device GATE-03 is marked for maintenance.",
      target: "Gates",
    },
  ]
  const results = navItems
    .filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .slice(0, 6)
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform)
  const userInitials = currentUser
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        if (window.innerWidth < 768) {
          onMenu()
          return
        }
        searchInputRef.current?.focus()
        setSearchOpen(true)
      }
      if (event.key === "Escape") {
        setSearchOpen(false)
        setMobileSearchOpen(false)
        setNotifOpen(false)
        setProfileOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!searchOpen && !notifOpen && !profileOpen) return
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (searchOpen && !searchRef.current?.contains(target))
        setSearchOpen(false)
      if (notifOpen && !notifRef.current?.contains(target)) setNotifOpen(false)
      if (profileOpen && !profileRef.current?.contains(target))
        setProfileOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [searchOpen, notifOpen, profileOpen])

  useEffect(() => {
    if (!mobileSearchOpen) return
    const previous = document.activeElement as HTMLElement | null
    const focusables = () =>
      Array.from(
        mobileSearchRef.current?.querySelectorAll<HTMLElement>(
          "input, button",
        ) ?? [],
      )
    focusables()[0]?.focus()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = oldOverflow
      document.removeEventListener("keydown", onKey)
      previous?.focus()
    }
  }, [mobileSearchOpen])

  const go = (name: string) => {
    onNavigate(name)
    setQuery("")
    setSearchOpen(false)
    setMobileSearchOpen(false)
    setNotifOpen(false)
    setProfileOpen(false)
  }

  return (
    <header
      className={`sticky top-0 border-b border-line bg-white ${
        mobileSearchOpen ? "z-[90]" : "z-30"
      }`}
    >
      <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="app-sidebar"
          className="icon-btn lg:hidden"
        >
          <Icon name="menu" />
        </button>
        <div className="hidden min-w-0 items-center gap-2 text-sm text-muted sm:flex">
          <span>Gateway</span>
          <Icon name="chevron" size={13} />
          <span className="truncate font-semibold text-ink">{current}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div ref={searchRef} className="relative hidden md:block">
            <div className="relative">
              <Icon
                name="search"
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault()
                    setActiveIndex((index) =>
                      results.length ? (index + 1) % results.length : 0,
                    )
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault()
                    setActiveIndex((index) =>
                      results.length
                        ? (index - 1 + results.length) % results.length
                        : 0,
                    )
                  } else if (event.key === "Enter" && results[activeIndex]) {
                    go(results[activeIndex].name)
                  }
                }}
                className="input w-56 pl-9 pr-16"
                placeholder="Search pages"
                aria-label="Search pages"
                aria-controls="page-search-results"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-line bg-canvas px-1.5 py-0.5 text-[10px] text-muted">
                {isMac ? "⌘ K" : "Ctrl K"}
              </kbd>
            </div>
            {searchOpen && (
              <div
                id="page-search-results"
                role="listbox"
                className="absolute right-0 top-[calc(100%+8px)] w-72 rounded-xl border border-line bg-white p-2 shadow-lg"
              >
                <p className="px-2 py-1 text-[11px] font-semibold text-muted">
                  Pages
                </p>
                {results.length ? (
                  results.map((item, i) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => go(item.name)}
                      role="option"
                      aria-selected={activeIndex === i}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-medium text-ink ${
                        activeIndex === i
                          ? "bg-accent-soft"
                          : "hover:bg-accent-soft"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        size={16}
                        className="text-accent"
                      />{" "}
                      {item.name}
                    </button>
                  ))
                ) : (
                  <p className="px-2 py-3 text-xs text-muted">
                    No matching pages.
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileSearchOpen(true)}
            aria-label="Search pages"
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search-sheet"
            className="icon-btn md:hidden"
          >
            <Icon name="search" size={18} />
          </button>

          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              aria-expanded={notifOpen}
              aria-haspopup="menu"
              aria-controls="notifications-menu"
              aria-label="Notifications"
              className="icon-btn relative"
            >
              <Icon name="bell" size={19} />
            </button>
            {notifOpen && (
              <div
                id="notifications-menu"
                role="menu"
                className="absolute right-0 top-[calc(100%+8px)] w-80 rounded-xl border border-line bg-white p-3 shadow-lg"
              >
                <div className="flex items-center justify-between px-1 pb-2">
                  <p className="text-sm font-bold text-ink">Notifications</p>
                  <span className="text-[10px] text-muted">Sample alerts</span>
                </div>
                {notices.map((notice) => (
                  <button
                    key={notice.id}
                    type="button"
                    role="menuitem"
                    onClick={() => go(notice.target)}
                    className="block w-full rounded-lg p-3 text-left transition hover:bg-canvas"
                  >
                    <span className="block text-xs font-semibold text-ink">
                      {notice.title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-4 text-muted">
                      {notice.text}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden h-7 w-px bg-line sm:block" />

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              aria-controls="profile-menu"
              className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-canvas"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-accent">
                {userInitials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-xs font-semibold text-ink">
                  {currentUser}
                </span>
                <span className="block text-[10px] text-muted">
                  Administrator
                </span>
              </span>
              <Icon name="chevron" size={14} className="rotate-90 text-muted" />
            </button>
            {profileOpen && (
              <div
                id="profile-menu"
                role="menu"
                className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl border border-line bg-white p-2 shadow-lg"
              >
                <div className="border-b border-line px-2 py-2">
                  <p className="text-xs font-semibold text-ink">
                    {currentUser}
                  </p>
                  <p className="text-[11px] text-muted">Demo account</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  role="menuitem"
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-xs font-semibold text-ink hover:bg-canvas"
                >
                  <Icon name="logout" size={15} className="text-muted" /> Sign
                  out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          id="mobile-search-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Search pages"
          className="fixed inset-0 z-[70] bg-white p-4 md:hidden"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Icon
                name="search"
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault()
                    setActiveIndex((index) =>
                      results.length ? (index + 1) % results.length : 0,
                    )
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault()
                    setActiveIndex((index) =>
                      results.length
                        ? (index - 1 + results.length) % results.length
                        : 0,
                    )
                  } else if (event.key === "Enter" && results[activeIndex]) {
                    go(results[activeIndex].name)
                  }
                }}
                className="input pl-9"
                placeholder="Search pages"
                aria-label="Search pages"
                role="combobox"
                aria-expanded="true"
                aria-controls="mobile-search-results"
                aria-activedescendant={
                  results[activeIndex]
                    ? `mobile-search-option-${activeIndex}`
                    : undefined
                }
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
              className="icon-btn"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
          <p className="mt-6 section-title">Pages</p>
          <div
            id="mobile-search-results"
            role="listbox"
            className="mt-2 space-y-1"
          >
            {results.length ? (
              results.map((item, i) => (
                <button
                  key={item.name}
                  id={`mobile-search-option-${i}`}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === i}
                  onClick={() => go(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${
                    activeIndex === i
                      ? "bg-accent-soft text-accent"
                      : "text-ink hover:bg-canvas"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.name}
                </button>
              ))
            ) : (
              <p className="py-4 text-xs text-muted">No matching pages.</p>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

function AuthInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string
  placeholder: string
  type?: string
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">
        {label}
      </span>
      <input
        id={id}
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="input"
      />
    </label>
  )
}

function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: (session: AuthSession) => void
}) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [method, setMethod] = useState<"credentials" | "barcode">("credentials")
  const [role, setRole] = useState<"Resident" | "Visitor">("Resident")
  const [registered, setRegistered] = useState(false)
  const [fullName, setFullName] = useState("")
  const [account, setAccount] = useState("")
  const [house, setHouse] = useState("")
  const [password, setPassword] = useState("")
  const [registeredPass, setRegisteredPass] = useState<Pass | null>(null)
  const [registeredName, setRegisteredName] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (mode === "register") {
      const now = Date.now()
      const name = fullName.trim() || `New ${role}`
      const pass: Pass = {
        id: `${
          role === "Resident" ? "RES" : "VIS"
        }-${house.trim() || "A-12"}-${String(now).slice(-4)}`,
        name,
        type: role,
        house: house.trim() || "A-12",
        seed: now % 1000,
        status: role === "Resident" ? "Active" : "Approved",
      }
      setRegisteredPass(pass)
      setRegisteredName(name)
      setRegistered(true)
    } else {
      onAuthenticated({ name: account.trim() || "Dimas" })
    }
  }

  if (registered)
    return (
      <main className="grid min-h-dvh place-items-center bg-rail-deep p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl sm:p-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <Icon name="check" size={24} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-ink">
            Registration complete
          </h1>
          <p className="mt-2 text-xs leading-5 text-muted">
            Your sample {role.toLowerCase()} pass is ready for this prototype.
          </p>
          <div className="mx-auto mt-6 w-fit">
            <QrCode seed={registeredPass?.seed ?? 0} size="lg" />
          </div>
          <div className="mx-auto mt-4 w-fit rounded-lg bg-canvas px-4 py-2.5 font-mono text-xs font-bold tracking-wide text-ink">
            {registeredPass?.id}
          </div>
          <p className="demo-note mt-3">Sample code, not a live credential.</p>
          <button
            type="button"
            onClick={() =>
              onAuthenticated({
                name: registeredName,
                pass: registeredPass ?? undefined,
              })
            }
            className="btn btn-primary mt-6 w-full"
          >
            Continue to dashboard
          </button>
        </div>
      </main>
    )

  return (
    <main className="grid min-h-dvh place-items-center bg-rail-deep p-4 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-[.85fr_1.15fr]">
        <section className="relative hidden flex-col justify-between bg-rail p-10 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-300 text-rail">
              <Icon name="shield" size={21} />
            </div>
            <div>
              <div className="font-display text-base font-bold">GATEWAY</div>
              <div className="text-[10px] text-teal-300">
                Residence security
              </div>
            </div>
          </div>
          <div className="my-12">
            <h2 className="font-display text-3xl font-bold leading-tight">
              One identity for every gate.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Residents, visitors, and gate operators work from the same access
              record in this prototype.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold text-white">
              Prototype environment
            </p>
            <p className="mt-1 text-[11px] leading-4 text-slate-400">
              All records shown here are sample data. No live gate device is
              connected.
            </p>
          </div>
        </section>

        <section className="p-6 sm:p-9">
          <div className="mb-7 flex items-center gap-3 lg:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-rail text-teal-300">
              <Icon name="shield" size={19} />
            </div>
            <div className="font-display font-bold text-ink">GATEWAY</div>
          </div>

          <div
            className="flex rounded-lg bg-canvas p-1"
            role="group"
            aria-label="Authentication mode"
          >
            <button
              type="button"
              onClick={() => setMode("login")}
              aria-pressed={mode === "login"}
              className={`flex-1 rounded-md py-2.5 text-xs font-semibold transition ${
                mode === "login" ? "bg-white text-ink shadow-sm" : "text-muted"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              aria-pressed={mode === "register"}
              className={`flex-1 rounded-md py-2.5 text-xs font-semibold transition ${
                mode === "register"
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted"
              }`}
            >
              Create account
            </button>
          </div>

          <h1 className="mt-7 font-display text-2xl font-bold text-ink">
            {mode === "login"
              ? "Enter the GATEWAY workspace"
              : "Register your access"}
          </h1>
          <p className="mt-1 text-xs text-muted">
            {mode === "login"
              ? "Sign in to review sample gate activity and visitor requests."
              : "Create a sample resident or visitor identity."}
          </p>

          {mode === "register" && (
            <div className="mt-5 grid grid-cols-2 gap-2">
              {(["Resident", "Visitor"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  aria-pressed={role === value}
                  className={`rounded-xl border p-3 text-left transition ${
                    role === value
                      ? "border-accent bg-accent-soft"
                      : "border-line hover:border-slate-300"
                  }`}
                >
                  <Icon
                    name={value === "Resident" ? "home" : "visitor"}
                    size={17}
                    className={role === value ? "text-accent" : "text-muted"}
                  />
                  <span className="mt-2 block text-xs font-semibold text-ink">
                    {value}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted">
                    {value === "Resident"
                      ? "Permanent access"
                      : "Time-limited pass"}
                  </span>
                </button>
              ))}
            </div>
          )}

          {mode === "login" && (
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setMethod("credentials")}
                aria-pressed={method === "credentials"}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                  method === "credentials"
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line text-muted"
                }`}
              >
                <Icon name="user" size={14} className="mr-1.5 inline" />{" "}
                Username
              </button>
              <button
                type="button"
                onClick={() => setMethod("barcode")}
                aria-pressed={method === "barcode"}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition ${
                  method === "barcode"
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line text-muted"
                }`}
              >
                <Icon name="scan" size={14} className="mr-1.5 inline" /> Scan
                barcode
              </button>
            </div>
          )}

          <form onSubmit={submit} className="mt-5">
            {method === "barcode" && mode === "login" ? (
              <div className="rounded-xl border border-dashed border-accent bg-accent-soft/60 p-5 text-center">
                <div className="scanner-frame mx-auto">
                  <Icon name="scan" size={28} />
                  <span className="scan-line" />
                </div>
                <p className="mt-4 text-xs font-semibold text-ink">
                  Place the sample pass in the frame
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  This simulates a barcode scan.
                </p>
                <button type="submit" className="btn btn-primary mt-5 w-full">
                  <Icon name="scan" size={15} /> Simulate scan
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {mode === "register" && (
                  <>
                    <AuthInput
                      label="Full name"
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={setFullName}
                    />
                    <AuthInput
                      label={
                        role === "Resident"
                          ? "House number"
                          : "Destination house"
                      }
                      placeholder="A-12"
                      value={house}
                      onChange={setHouse}
                    />
                  </>
                )}
                <AuthInput
                  label={
                    mode === "login" ? "Username or email" : "Email address"
                  }
                  placeholder={
                    mode === "login" ? "admin@example.com" : "name@example.com"
                  }
                  value={account}
                  onChange={setAccount}
                />
                <AuthInput
                  label="Password"
                  placeholder="Your password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
                <button type="submit" className="btn btn-primary mt-2 w-full">
                  {mode === "login" ? "Sign in" : `Register as ${role}`}
                </button>
              </div>
            )}
          </form>
          <p className="demo-note mt-6 text-center leading-4">
            Prototype sign in. No credentials are stored or sent.
          </p>
        </section>
      </div>
    </main>
  )
}

function AddVisitorModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean
  onClose: () => void
  onAdd: (input: VisitorInput) => void
}) {
  const [name, setName] = useState("")
  const [detail, setDetail] = useState("")
  const [plate, setPlate] = useState("")

  useEffect(() => {
    if (!open) {
      setName("")
      setDetail("")
      setPlate("")
    }
  }, [open])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onAdd({ name: name.trim(), detail: detail.trim(), plate: plate.trim() })
    onClose()
  }

  return (
    <Modal
      open={open}
      title="Add visitor"
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            form="add-visitor-form"
            className="btn btn-primary"
          >
            Add visitor
          </button>
        </>
      }
    >
      <form id="add-visitor-form" onSubmit={submit} className="space-y-4">
        <TextField
          label="Full name"
          value={name}
          onChange={setName}
          placeholder="Enter a name"
        />
        <TextField
          label="Host and house"
          value={detail}
          onChange={setDetail}
          placeholder="A-12, hosted by Budi Santoso"
        />
        <TextField
          label="License plate"
          value={plate}
          onChange={setPlate}
          placeholder="B 1234 ABC"
        />
      </form>
    </Modal>
  )
}

function MetricCard({
  label,
  value,
  sub,
  icon,
  tone,
}: {
  label: string
  value: string
  sub: string
  icon: IconName
  tone: string
}) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted">{label}</p>
          <p className="mt-2 font-display text-[28px] font-bold leading-none text-ink">
            {value}
          </p>
          <p className="mt-2 text-[11px] text-muted">{sub}</p>
        </div>
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tone}`}
        >
          <Icon name={icon} size={18} />
        </div>
      </div>
    </div>
  )
}

const chartSets = {
  "24 hours": {
    bars: [
      42, 50, 34, 62, 78, 55, 68, 88, 72, 58, 83, 69, 92, 75, 65, 84, 96, 74,
      82, 62, 70, 90, 78, 86,
    ],
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "Now"],
    entry: "312",
    exit: "284",
  },
  "7 days": {
    bars: [58, 72, 64, 88, 79, 46, 53],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    entry: "2,104",
    exit: "1,988",
  },
  "30 days": {
    bars: [54, 61, 49, 66, 73, 58, 70, 82, 64, 77],
    labels: [
      "Day 1",
      "Day 5",
      "Day 10",
      "Day 15",
      "Day 20",
      "Day 25",
      "Day 30",
    ],
    entry: "8,972",
    exit: "8,540",
  },
}

type ChartRange = keyof typeof chartSets

function ActivityChart() {
  const [range, setRange] = useState<ChartRange>("24 hours")
  const data = chartSets[range]
  const peak = data.bars.indexOf(Math.max(...data.bars))

  return (
    <div className="card col-span-12 p-4 sm:p-5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-title">Access activity</p>
          <p className="section-sub">
            Sample entry and exit traffic, last {range.toLowerCase()}
          </p>
        </div>
        <div
          className="flex rounded-lg bg-canvas p-1"
          role="group"
          aria-label="Chart time range"
        >
          {(Object.keys(chartSets) as ChartRange[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRange(value)}
              aria-pressed={range === value}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                range === value ? "bg-white text-ink shadow-sm" : "text-muted"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div
        className="mt-6 overflow-x-auto pb-1"
        role="region"
        tabIndex={0}
        aria-label="Access activity chart, scroll horizontally for more"
      >
        <div
          className={`pt-5 ${
            range === "24 hours" ? "min-w-[480px] sm:min-w-0" : ""
          }`}
        >
          <div
            className="flex h-44 items-end gap-1 sm:gap-2"
            role="img"
            aria-label={`Sample ${range} access activity. Entry ${data.entry}, exit ${data.exit}. Peak at position ${peak + 1}.`}
          >
            {data.bars.map((height, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className={`mx-auto w-full max-w-8 rounded-t-sm transition-colors duration-200 group-hover:bg-accent ${
                    i === peak ? "bg-accent" : "bg-slate-200"
                  }`}
                  style={{ height: `${height}%` }}
                />
                {i === peak && (
                  <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-rail px-2 py-1 text-[10px] font-semibold text-white">
                    Peak
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-muted">
            {data.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-5 border-t border-line pt-4 text-xs text-muted">
        <span>
          Entry{" "}
          <strong className="ml-1 font-bold text-ink">{data.entry}</strong>
        </span>
        <span>
          Exit <strong className="ml-1 font-bold text-ink">{data.exit}</strong>
        </span>
      </div>
    </div>
  )
}

function OccupancyCard() {
  return (
    <div className="card col-span-12 p-4 sm:p-5 md:col-span-6 xl:col-span-4">
      <p className="section-title">Current occupancy</p>
      <p className="section-sub">Sample snapshot of the residential area</p>
      <div
        className="mx-auto mt-5 grid h-36 w-36 place-items-center rounded-full p-3"
        role="img"
        aria-label="85 residents and 12 visitors inside, 88 percent occupied"
        style={{
          background: "conic-gradient(#0f766e 0 88%, #e7e5de 88% 100%)",
        }}
      >
        <div className="grid h-full w-full place-items-center rounded-full bg-white text-center">
          <div>
            <div className="font-display text-3xl font-bold text-ink">85</div>
            <div className="text-[10px] font-semibold text-muted">Inside</div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-accent-soft p-3 text-center">
          <div className="text-lg font-bold text-accent">85</div>
          <div className="text-[10px] font-semibold text-accent">Residents</div>
        </div>
        <div className="rounded-lg bg-canvas p-3 text-center">
          <div className="text-lg font-bold text-muted">12</div>
          <div className="text-[10px] font-semibold text-muted">Visitors</div>
        </div>
      </div>
    </div>
  )
}

function GatesPanel({
  onOpen,
  onViewAll,
}: {
  onOpen: (name: string) => void
  onViewAll: () => void
}) {
  const gates = [
    {
      name: "Gate Utama",
      id: "GATE-01",
      status: "Online",
      activity: "10:42:18",
      note: "Main entrance",
    },
    {
      name: "Gate Keluar",
      id: "GATE-02",
      status: "Online",
      activity: "10:31:56",
      note: "Exit lane",
    },
    {
      name: "Gate VIP",
      id: "GATE-03",
      status: "Maintenance",
      activity: "09:58:03",
      note: "North wing",
    },
  ]
  return (
    <div className="card col-span-12 p-4 sm:p-5 md:col-span-6 xl:col-span-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-title">Gate status</p>
          <p className="section-sub">3 sample devices</p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-accent hover:underline"
        >
          View all
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {gates.map((gate) => (
          <div
            key={gate.id}
            className="flex items-center gap-3 rounded-xl border border-line p-3"
          >
            <div
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                gate.status === "Online"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              <Icon
                name={gate.status === "Online" ? "wifi" : "settings"}
                size={17}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate text-xs font-semibold text-ink">
                  {gate.name}
                </span>
                <StatusBadge status={gate.status} />
              </div>
              <p className="mt-1 text-[10px] text-muted">
                {gate.id}, {gate.note}, last activity {gate.activity}
              </p>
            </div>
            {gate.status === "Online" && (
              <button
                type="button"
                onClick={() => onOpen(gate.name)}
                className="icon-btn shrink-0"
                aria-label={`Manual override for ${gate.name}`}
              >
                <Icon name="lock" size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function VisitorsPanel({
  visitors,
  updateStatus,
  onAdd,
}: {
  visitors: Visitor[]
  updateStatus: (id: number, status: string) => void
  onAdd: () => void
}) {
  return (
    <div className="card col-span-12 p-4 sm:p-5 md:col-span-6 xl:col-span-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-title">Visitor queue</p>
          <p className="section-sub">Today's sample visitors</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="btn btn-secondary min-h-10 px-3"
          aria-label="Add visitor"
        >
          <Icon name="plus" size={15} /> Add
        </button>
      </div>
      {visitors.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted">
          No visitors in the sample queue.
        </div>
      ) : (
        <div className="mt-4 space-y-1">
          {visitors.map((visitor) => (
            <div
              key={visitor.id}
              className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-canvas"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-canvas text-[10px] font-bold text-muted">
                {visitor.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink">
                  {visitor.name}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-muted">
                  {visitor.detail}, {visitor.time}
                </p>
              </div>
              {visitor.status === "Waiting" ? (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => updateStatus(visitor.id, "Approved")}
                    className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    aria-label={`Approve ${visitor.name}`}
                  >
                    <Icon name="check" size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(visitor.id, "Rejected")}
                    className="grid h-11 w-11 place-items-center rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                    aria-label={`Reject ${visitor.name}`}
                  >
                    <Icon name="close" size={15} />
                  </button>
                </div>
              ) : (
                <StatusBadge status={visitor.status} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AccessTable({
  rows,
  demoStatus,
  onReload,
  onNavigate,
}: {
  rows: AccessRecord[]
  demoStatus: DemoStatus
  onReload: () => void
  onNavigate: (name: string) => void
}) {
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState<AccessRecord | null>(null)
  const visible = rows.filter(
    (row) => filter === "All" || row.status === filter,
  )
  const shown = visible.slice(0, 6)

  const handleExport = () =>
    exportCsv("sample-access-events.csv", [
      ["Time", "Person", "House", "Type", "Activity", "Gate", "Status"],
      ...visible.map((row) => [
        row.time,
        row.name,
        row.house,
        row.type,
        row.action,
        row.gate,
        row.status,
      ]),
    ])

  return (
    <div className="card col-span-12 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 sm:p-5">
        <div>
          <p className="section-title">Access monitoring</p>
          <p className="section-sub">Sample events at community gates</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="access-filter" className="sr-only">
            Filter events by status
          </label>
          <select
            id="access-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="input w-auto min-h-11 py-1.5 text-xs"
          >
            <option value="All">All events</option>
            <option value="Granted">Granted</option>
            <option value="Denied">Denied</option>
          </select>
          <button
            type="button"
            onClick={handleExport}
            className="btn btn-secondary min-h-11"
          >
            <Icon name="download" size={14} /> Export
          </button>
        </div>
      </div>

      {demoStatus === "loading" ? (
        <SkeletonRows count={5} />
      ) : demoStatus === "error" ? (
        <ErrorState onRetry={onReload} />
      ) : visible.length === 0 ? (
        <EmptyState
          title="No events match this filter"
          text="Choose another status to see the sample events again."
          action={
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="btn btn-secondary"
            >
              Show all events
            </button>
          }
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-canvas text-[11px] font-semibold text-muted">
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Person</th>
                  <th className="px-5 py-3">House</th>
                  <th className="px-5 py-3">Activity</th>
                  <th className="px-5 py-3">Gate</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {shown.map((row) => (
                  <tr key={row.id} className="text-xs hover:bg-canvas">
                    <td className="px-5 py-3.5 font-mono text-[11px] text-muted">
                      {row.time}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold ${row.color}`}
                        >
                          {row.initials}
                        </span>
                        <span className="font-semibold text-ink">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-muted">
                      {row.house}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 font-semibold text-ink">
                        <Icon
                          name={
                            row.action.includes("Out") ? "arrowOut" : "arrowIn"
                          }
                          size={14}
                          className={
                            row.action.includes("Out")
                              ? "text-amber-600"
                              : "text-accent"
                          }
                        />
                        {row.action}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted">{row.gate}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => setSelected(row)}
                        className="icon-btn -my-2"
                        aria-label={`Details for ${row.name}`}
                      >
                        <Icon name="more" size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-line md:hidden">
            {shown.map((row) => (
              <div key={row.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full text-[10px] font-bold ${row.color}`}
                    >
                      {row.initials}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-ink">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-muted">
                        {row.time}, {row.gate}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={row.status} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[11px] text-muted">
                    {row.action}, house {row.house}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelected(row)}
                    className="text-xs font-semibold text-accent"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 sm:px-5">
        <span className="demo-note">
          Showing {shown.length} of {visible.length} sample events
        </span>
        <button
          type="button"
          onClick={() => onNavigate("Access Logs")}
          className="text-xs font-semibold text-accent hover:underline"
        >
          View full access log
        </button>
      </div>

      <Modal
        open={Boolean(selected)}
        title="Access event details"
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="space-y-3 text-xs">
            {[
              ["Time", selected.time],
              ["Person", selected.name],
              ["House", selected.house],
              ["Access type", selected.type],
              ["Activity", selected.action],
              ["Gate", selected.gate],
              ["Status", selected.status],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-line pb-2.5"
              >
                <span className="text-muted">{label}</span>
                <span className="text-right font-semibold text-ink">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

function Dashboard({
  currentUser,
  onGateOpen,
  onNavigate,
  visitors,
  updateVisitor,
  onAddVisitor,
  access,
  demoStatus,
  onReload,
}: {
  currentUser: string
  onGateOpen: (name: string) => void
  onNavigate: (name: string) => void
  visitors: Visitor[]
  updateVisitor: (id: number, status: string) => void
  onAddVisitor: () => void
  access: AccessRecord[]
  demoStatus: DemoStatus
  onReload: () => void
}) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const hour = time.getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
            {greeting}, {currentUser.split(/\s+/)[0]}
          </h1>
          <p className="mt-1 text-xs text-muted">
            Sample workspace for Griya Harmoni Residence.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-canvas text-muted">
            <Icon name="clock" size={16} />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-ink">
              {time.toLocaleTimeString("en-GB")}
            </div>
            <div className="text-[10px] text-muted">
              {time.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Total residents"
          value="248"
          sub="registered in sample"
          icon="users"
          tone="bg-canvas text-muted"
        />
        <MetricCard
          label="Inside area"
          value="85"
          sub="residents currently in"
          icon="home"
          tone="bg-accent-soft text-accent"
        />
        <MetricCard
          label="Visitors today"
          value="37"
          sub="12 inside the area"
          icon="visitor"
          tone="bg-canvas text-muted"
        />
        <MetricCard
          label="Access events"
          value="596"
          sub="logged in sample"
          icon="activity"
          tone="bg-canvas text-muted"
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <ActivityChart />
        <OccupancyCard />
        <GatesPanel onOpen={onGateOpen} onViewAll={() => onNavigate("Gates")} />
        <VisitorsPanel
          visitors={visitors}
          updateStatus={updateVisitor}
          onAdd={onAddVisitor}
        />
        <AccessTable
          rows={access}
          demoStatus={demoStatus}
          onReload={onReload}
          onNavigate={onNavigate}
        />
      </div>
    </main>
  )
}

function ScannerPage({ onGrant }: { onGrant: () => void }) {
  const [scanned, setScanned] = useState(false)
  const [granted, setGranted] = useState(false)

  const fields = [
    ["Access type", "Resident"],
    ["House", "A-12"],
    ["Pass ID", "RES-A12-00248"],
    ["Valid until", "31 Dec 2026"],
    ["Card status", "Active"],
  ]

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <p className="eyebrow">Access verification</p>
      <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
        Barcode scanner
      </h1>
      <p className="mt-1 text-xs text-muted">
        Sample verification flow for resident and visitor passes.
      </p>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card p-4 sm:p-6">
          <div className="mx-auto max-w-md text-center">
            <div className="scanner-large mx-auto">
              <Icon name="scan" size={42} />
              <span className="scan-line" />
            </div>
            <p className="mt-5 font-display text-base font-bold text-ink">
              Scan a resident or visitor pass
            </p>
            <p className="mt-1 text-xs text-muted">
              Start the simulated scanner to load a sample identity.
            </p>
            <button
              type="button"
              onClick={() => {
                setScanned(true)
                setGranted(false)
              }}
              className="btn btn-primary mt-5"
            >
              <Icon name="scan" size={15} /> Start scanner
            </button>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <p className="section-title">Verification result</p>
          <p className="section-sub">Sample pass check</p>
          <div aria-live="polite">
            {granted ? (
              <div className="mt-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <Icon name="check" size={26} />
                </div>
                <p className="mt-4 text-sm font-bold text-ink">
                  Access granted
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  The sample event was added to access monitoring.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setScanned(false)
                    setGranted(false)
                  }}
                  className="btn btn-secondary mt-5 w-full"
                >
                  Scan another pass
                </button>
              </div>
            ) : scanned ? (
              <div className="mt-6">
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                    <Icon name="check" size={20} />
                  </div>
                  <div>
                    <StatusBadge status="Approved" />
                    <p className="mt-1 text-sm font-bold text-ink">
                      Budi Santoso
                    </p>
                  </div>
                </div>
                <dl className="mt-5 space-y-3 text-xs">
                  {fields.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 border-b border-line pb-3"
                    >
                      <dt className="text-muted">{label}</dt>
                      <dd className="text-right font-semibold text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <button
                  type="button"
                  onClick={() => {
                    onGrant()
                    setGranted(true)
                  }}
                  className="btn btn-primary mt-5 w-full"
                >
                  Grant gate access
                </button>
              </div>
            ) : (
              <div className="grid min-h-64 place-items-center text-center">
                <div>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-canvas text-muted">
                    <Icon name="scan" size={24} />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-ink">
                    No pass scanned
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    Verification details will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function DigitalPassesPage({
  passes,
  onAddPass,
}: {
  passes: Pass[]
  onAddPass: (pass: Pass) => void
}) {
  const [adding, setAdding] = useState(false)
  const [detail, setDetail] = useState<Pass | null>(null)
  const [name, setName] = useState("")
  const [type, setType] = useState("Resident")
  const [house, setHouse] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const cleanHouse = house.trim().toUpperCase() || "A-12"
    onAddPass({
      id: `${
        type === "Resident" ? "RES" : "VIS"
      }-${cleanHouse}-${String(Date.now()).slice(-5)}`,
      name: name.trim(),
      type,
      house: cleanHouse,
      seed: Math.floor(Math.random() * 20),
      status: type === "Resident" ? "Active" : "Approved",
    })
    setName("")
    setHouse("")
    setAdding(false)
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Identity management</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
            Digital passes
          </h1>
          <p className="mt-1 text-xs text-muted">
            Sample barcodes issued after registration.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="btn btn-primary"
        >
          <Icon name="plus" size={15} /> Issue pass
        </button>
      </div>

      {passes.length === 0 ? (
        <div className="card mt-7">
          <EmptyState
            title="No passes issued"
            text="Issue a sample pass to see it listed here."
            action={
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="btn btn-primary"
              >
                Issue pass
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="card flex flex-wrap items-center gap-5 p-5"
            >
              <QrCode seed={pass.seed} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-ink">
                    {pass.name}
                  </span>
                  <StatusBadge status={pass.status} />
                </div>
                <p className="mt-1 text-[11px] text-muted">
                  {pass.type}, house {pass.house}
                </p>
                <p className="mt-4 w-fit rounded-lg bg-canvas px-3 py-2 font-mono text-[10px] font-bold text-ink">
                  {pass.id}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadFile(
                        `${pass.id}.svg`,
                        passSvg(pass),
                        "image/svg+xml",
                      )
                    }
                    className="btn btn-secondary min-h-10 px-3 text-xs"
                  >
                    <Icon name="download" size={14} /> Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetail(pass)}
                    className="btn btn-quiet min-h-10 px-3 text-xs"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={adding}
        title="Issue sample pass"
        onClose={() => setAdding(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="issue-pass-form"
              className="btn btn-primary"
            >
              Issue pass
            </button>
          </>
        }
      >
        <form id="issue-pass-form" onSubmit={submit} className="space-y-4">
          <TextField
            label="Full name"
            value={name}
            onChange={setName}
            placeholder="Enter a name"
          />
          <label className="block" htmlFor="pass-type">
            <span className="mb-1.5 block text-xs font-semibold text-ink">
              Access type
            </span>
            <select
              id="pass-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="input"
            >
              <option value="Resident">Resident</option>
              <option value="Visitor">Visitor</option>
            </select>
          </label>
          <TextField
            label="House"
            value={house}
            onChange={setHouse}
            placeholder="A-12"
          />
        </form>
      </Modal>

      <Modal
        open={Boolean(detail)}
        title="Pass details"
        onClose={() => setDetail(null)}
      >
        {detail && (
          <div className="flex flex-wrap items-center gap-5">
            <QrCode seed={detail.seed} size="sm" />
            <dl className="min-w-0 flex-1 space-y-2 text-xs">
              {[
                ["Name", detail.name],
                ["Type", detail.type],
                ["House", detail.house],
                ["Pass ID", detail.id],
                ["Status", detail.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 border-b border-line pb-2"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Modal>
    </main>
  )
}

function SettingsPage({
  prefs,
  onChange,
}: {
  prefs: Prefs
  onChange: (prefs: Prefs) => void
}) {
  const [saved, setSaved] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const save = () => {
    setSaved(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setSaved(false), 3000)
  }

  const options = [
    {
      key: "email" as const,
      title: "Email notifications",
      text: "Get a sample alert when a visitor is approved.",
    },
    {
      key: "desktop" as const,
      title: "Desktop alerts",
      text: "Show gate exceptions in this browser session.",
    },
    {
      key: "weekly" as const,
      title: "Weekly summary",
      text: "Prepare a sample access summary each week.",
    },
  ]

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <p className="eyebrow">System</p>
      <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
        Settings
      </h1>
      <p className="mt-1 text-xs text-muted">
        Demo preferences for this workspace session.
      </p>
      <div className="card mt-7 max-w-2xl p-4 sm:p-6">
        <div className="divide-y divide-line">
          {options.map((option) => (
            <label
              key={option.key}
              className="flex cursor-pointer items-center justify-between gap-4 py-4"
            >
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {option.title}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {option.text}
                </span>
              </span>
              <input
                type="checkbox"
                checked={prefs[option.key]}
                onChange={(event) =>
                  onChange({ ...prefs, [option.key]: event.target.checked })
                }
                className="h-5 w-5 shrink-0 accent-[#0f766e]"
              />
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <button type="button" onClick={save} className="btn btn-primary">
            Save preferences
          </button>
          <span role="status" className="text-xs text-muted">
            {saved
              ? "Preferences saved in this demo session."
              : "Changes stay in this demo session only."}
          </span>
        </div>
      </div>
    </main>
  )
}

function GenericPage({
  title,
  current,
  visitors,
  access,
  added,
  onAdd,
  demoStatus,
  onReload,
  onAddVisitor,
}: {
  title: string
  current: string
  visitors: Visitor[]
  access: AccessRecord[]
  added: RecordItem[]
  onAdd: (item: RecordItem) => void
  demoStatus: DemoStatus
  onReload: () => void
  onAddVisitor?: () => void
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState<RecordItem | null>(null)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState("")
  const [detail, setDetail] = useState("")
  const [meta, setMeta] = useState("")

  const visitorRecords: RecordItem[] = visitors.map((visitor) => ({
    id: String(visitor.id),
    name: visitor.name,
    detail: `${visitor.detail}, ${visitor.plate}`,
    meta: visitor.time,
    status: visitor.status,
    initials: visitor.initials,
  }))
  const base =
    current === "Visitors"
      ? visitorRecords
      : current === "Access Logs"
        ? access.map((row) =>
            mk(
              String(row.id),
              row.name,
              `${row.action}, ${row.gate}, ${row.time}`,
              row.house,
              row.status,
            ),
          )
        : (recordSets[current] ?? [])
  const all = [...added, ...base]
  const groupLabel =
    navGroups.find((group) => group.items.some((item) => item.name === current))
      ?.label ?? "Workspace"
  const statuses = Array.from(new Set(all.map((item) => item.status)))
  const visible = all.filter((item) => {
    const matchesQuery = `${item.name} ${item.detail} ${item.meta}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
    return matchesQuery && (filter === "All" || item.status === filter)
  })
  const singular = title.endsWith("s") ? title.slice(0, -1) : title

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onAdd({
      id: `NEW-${Date.now()}`,
      name: name.trim(),
      detail: detail.trim(),
      meta: meta.trim(),
      status: "Active",
      initials: initialsOf(name),
    })
    setName("")
    setDetail("")
    setMeta("")
    setAdding(false)
  }

  const handleExport = () =>
    exportCsv(`sample-${title.toLowerCase().replace(/\s+/g, "-")}.csv`, [
      ["ID", "Name", "Detail", "Meta", "Status"],
      ...visible.map((item) => [
        item.id,
        item.name,
        item.detail,
        item.meta,
        item.status,
      ]),
    ])

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{groupLabel}</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-[30px]">
            {title}
          </h1>
          <p className="mt-1 text-xs text-muted">
            Sample {title.toLowerCase()} records for Griya Harmoni Residence.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (current === "Visitors" && onAddVisitor) onAddVisitor()
            else setAdding(true)
          }}
          className="btn btn-primary"
        >
          <Icon name="plus" size={15} /> Add {singular}
        </button>
      </div>

      <div className="card mt-7 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 sm:p-5">
          <div className="relative w-full sm:w-64">
            <Icon
              name="search"
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <label htmlFor="record-search" className="sr-only">
              Search {title}
            </label>
            <input
              id="record-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="input pl-9"
              placeholder={`Search ${title.toLowerCase()}`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="record-filter" className="sr-only">
              Filter by status
            </label>
            <select
              id="record-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="input w-auto min-h-11 py-1.5 text-xs"
            >
              <option value="All">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleExport}
              className="btn btn-secondary min-h-11"
            >
              <Icon name="download" size={14} /> Export
            </button>
          </div>
        </div>

        {demoStatus === "loading" ? (
          <SkeletonRows />
        ) : demoStatus === "error" ? (
          <ErrorState onRetry={onReload} />
        ) : visible.length === 0 ? (
          <EmptyState
            title="No records found"
            text="Try another search term or status filter."
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setFilter("All")
                }}
                className="btn btn-secondary"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="divide-y divide-line px-4 sm:px-5">
            {visible.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center gap-3 py-4 sm:gap-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-canvas text-xs font-bold text-muted">
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {item.name}
                  </p>
                  <p className="mt-1 truncate text-[11px] text-muted">
                    {item.detail}
                  </p>
                </div>
                <span className="hidden text-xs text-muted sm:block">
                  {item.meta}
                </span>
                <StatusBadge status={item.status} />
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="icon-btn"
                  aria-label={`Details for ${item.name}`}
                >
                  <Icon name="more" size={17} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={adding}
        title={`Add ${singular}`}
        onClose={() => setAdding(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-record-form"
              className="btn btn-primary"
            >
              Add record
            </button>
          </>
        }
      >
        <form id="add-record-form" onSubmit={submit} className="space-y-4">
          <TextField
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Enter a name"
          />
          <TextField
            label="Detail"
            value={detail}
            onChange={setDetail}
            placeholder="Short description"
          />
          <TextField
            label="Meta"
            value={meta}
            onChange={setMeta}
            placeholder="House, time, or category"
          />
        </form>
      </Modal>

      <Modal
        open={Boolean(selected)}
        title="Record details"
        onClose={() => setSelected(null)}
      >
        {selected && (
          <dl className="space-y-3 text-xs">
            {[
              ["ID", selected.id],
              ["Name", selected.name],
              ["Detail", selected.detail],
              ["Meta", selected.meta],
              ["Status", selected.status],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-line pb-2.5"
              >
                <dt className="shrink-0 text-muted">{label}</dt>
                <dd className="text-right font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>
    </main>
  )
}

function GateModal({
  gate,
  onClose,
  onConfirm,
}: {
  gate: string | null
  onClose: () => void
  onConfirm: (gate: string) => void
}) {
  const [reason, setReason] = useState("")
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!gate) {
      setReason("")
      setOpened(false)
    }
  }, [gate])

  const confirm = () => {
    if (!gate) return
    onConfirm(gate)
    setOpened(true)
  }

  return (
    <Modal
      open={Boolean(gate)}
      title={opened ? "Gate command sent" : "Manual gate override"}
      onClose={onClose}
      footer={
        opened ? (
          <button type="button" onClick={onClose} className="btn btn-primary">
            Return to dashboard
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!reason.trim()}
              onClick={confirm}
              className="btn btn-danger"
            >
              <Icon name="lock" size={15} /> Open gate
            </button>
          </>
        )
      }
    >
      {opened ? (
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <Icon name="check" size={26} />
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">
            {gate} was opened in this demo. The sample event was added to access
            monitoring.
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs leading-5 text-muted">
            You are about to manually open{" "}
            <strong className="font-semibold text-ink">{gate}</strong>. This
            sample action will be recorded in the demo access log.
          </p>
          <label
            htmlFor="override-reason"
            className="mt-5 block text-xs font-semibold text-ink"
          >
            Reason for override
          </label>
          <textarea
            id="override-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="input mt-2 h-24 resize-none"
            placeholder="Describe the operational reason"
          />
        </>
      )}
    </Modal>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState("Dimas")
  const [current, setCurrent] = useState("Dashboard")
  const [sidebar, setSidebar] = useState(false)
  const [gate, setGate] = useState<string | null>(null)
  const [addingVisitor, setAddingVisitor] = useState(false)
  const [visitors, setVisitors] = useState<Visitor[]>(visitorSeed)
  const [passes, setPasses] = useState<Pass[]>(passSeed)
  const [access, setAccess] = useState<AccessRecord[]>(accessSeed)
  const [addedRecords, setAddedRecords] =
    useState<Record<string, RecordItem[]>>({})
  const [demoStatus, setDemoStatus] = useState<DemoStatus>("ready")
  const [offline, setOffline] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>({
    email: true,
    desktop: true,
    weekly: false,
  })
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooting(false), 1500)
    return () => window.clearTimeout(bootTimer)
  }, [])

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const reload = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setOffline(false)
    setDemoStatus("loading")
    timer.current = window.setTimeout(() => setDemoStatus("ready"), 650)
  }

  const toggleOffline = () => {
    if (timer.current) window.clearTimeout(timer.current)
    if (offline) reload()
    else {
      setOffline(true)
      setDemoStatus("error")
    }
  }

  const navigate = (name: string) => {
    setCurrent(name)
    setSidebar(false)
    window.scrollTo(0, 0)
  }

  const updateVisitor = (id: number, status: string) =>
    setVisitors((items) =>
      items.map((item) => (item.id === id ? { ...item, status } : item)),
    )

  const addVisitor = (input: VisitorInput) =>
    setVisitors((items) => [
      {
        id: Date.now(),
        name: input.name,
        initials: initialsOf(input.name),
        detail: input.detail,
        time: timeNow(),
        status: "Waiting",
        plate: input.plate,
      },
      ...items,
    ])

  const addAccess = (entry: Omit<AccessRecord, "id">) =>
    setAccess((items) => [{ ...entry, id: Date.now() }, ...items])

  const confirmGate = (name: string) =>
    addAccess({
      time: timeNow(),
      name: "Manual override",
      initials: "MO",
      house: "-",
      type: "Operator",
      action: "Override",
      gate: name,
      status: "Granted",
      color: "bg-accent-soft text-accent",
    })

  const grantAccess = () =>
    addAccess({
      time: timeNow(),
      name: "Budi Santoso",
      initials: "BS",
      house: "A-12",
      type: "Resident",
      action: "Tap In",
      gate: "Gate Utama",
      status: "Granted",
      color: "bg-sky-100 text-sky-800",
    })

  if (booting) return <BootScreen onDone={() => setBooting(false)} />

  if (!authenticated)
    return (
      <AuthScreen
        onAuthenticated={(session) => {
          if (session.pass) setPasses((items) => [session.pass!, ...items])
          setCurrentUser(session.name)
          setAuthenticated(true)
        }}
      />
    )

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Sidebar
        current={current}
        onNavigate={navigate}
        open={sidebar}
        onClose={() => setSidebar(false)}
        demoStatus={demoStatus}
        offline={offline}
        onReload={reload}
        onToggleOffline={toggleOffline}
      />
      <div id="main-content" className="min-h-dvh pb-28 lg:pb-0 lg:pl-[260px]">
        <Header
          current={current}
          currentUser={currentUser}
          visitors={visitors}
          menuOpen={sidebar}
          onMenu={() => setSidebar(true)}
          onNavigate={navigate}
          onLogout={() => setAuthenticated(false)}
        />
        {offline && (
          <div
            role="status"
            className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900 sm:px-6 lg:px-8"
          >
            Demo offline. Sample data views are paused; reconnect from the
            sidebar.
          </div>
        )}
        {current === "Dashboard" ? (
          <Dashboard
            currentUser={currentUser}
            onGateOpen={setGate}
            onNavigate={navigate}
            visitors={visitors}
            updateVisitor={updateVisitor}
            onAddVisitor={() => setAddingVisitor(true)}
            access={access}
            demoStatus={demoStatus}
            onReload={reload}
          />
        ) : current === "Barcode Scanner" ? (
          <ScannerPage onGrant={grantAccess} />
        ) : current === "Digital Passes" ? (
          <DigitalPassesPage
            passes={passes}
            onAddPass={(pass) => setPasses((items) => [pass, ...items])}
          />
        ) : current === "Settings" ? (
          <SettingsPage prefs={prefs} onChange={setPrefs} />
        ) : (
          <GenericPage
            title={current}
            current={current}
            visitors={visitors}
            access={access}
            added={addedRecords[current] ?? []}
            onAdd={(item) =>
              setAddedRecords((prev) => ({
                ...prev,
                [current]: [item, ...(prev[current] ?? [])],
              }))
            }
            demoStatus={demoStatus}
            onReload={reload}
            onAddVisitor={() => setAddingVisitor(true)}
          />
        )}
        <footer className="px-4 pb-6 pt-2 text-[11px] text-muted sm:px-6 lg:px-8">
          Gateway prototype, sample data only
        </footer>
        <MobileNav current={current} onNavigate={navigate} />
      </div>
      <AddVisitorModal
        open={addingVisitor}
        onClose={() => setAddingVisitor(false)}
        onAdd={addVisitor}
      />
      <GateModal
        gate={gate}
        onClose={() => setGate(null)}
        onConfirm={confirmGate}
      />
    </div>
  )
}
