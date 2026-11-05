import { useMemo, useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ClipboardList,
  Plus,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react'
import {
  initialIncidents,
  incidentAssignees,
  type Incident,
  type IncidentSeverity,
  type IncidentStatus,
} from '@/data/incidents'

type SeverityFilter = 'All' | IncidentSeverity
type StatusFilter = 'All' | IncidentStatus

function SeverityBadge({ severity }: { severity: IncidentSeverity }) {
  const styles = {
    Critical: 'bg-red-500/10 text-red-500',
    High: 'bg-orange-500/10 text-orange-500',
    Medium: 'bg-amber-500/10 text-amber-500',
    Low: 'bg-blue-500/10 text-blue-500',
  }

  return (
    <span className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${styles[severity]}`}>
      {severity}
    </span>
  )
}

function StatusBadge({ status }: { status: IncidentStatus }) {
  const styles = {
    Open: 'bg-red-500/10 text-red-500',
    Investigating: 'bg-amber-500/10 text-amber-500',
    Resolved: 'bg-emerald-500/10 text-emerald-500',
  }

  return (
    <span className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  )
}

export default function Incidents() {
  const [items, setItems] = useState(initialIncidents)
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState<SeverityFilter>('All')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [selected, setSelected] = useState<Incident | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [notice, setNotice] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newService, setNewService] = useState('api-gateway')
  const [newSeverity, setNewSeverity] = useState<IncidentSeverity>('Medium')
  const [newAssignee, setNewAssignee] = useState('Unassigned')

  const counts = {
    total: items.length,
    critical: items.filter((item) => item.severity === 'Critical' && item.status !== 'Resolved').length,
    investigating: items.filter((item) => item.status === 'Investigating').length,
    resolved: items.filter((item) => item.status === 'Resolved').length,
  }

  const filtered = useMemo(() => items.filter((item) => {
    const query = search.toLowerCase()
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.assignee.toLowerCase().includes(query)

    return (
      matchesSearch &&
      (severity === 'All' || item.severity === severity) &&
      (status === 'All' || item.status === status)
    )
  }), [items, search, severity, status])

  function updateIncident(id: string, changes: Partial<Incident>) {
    setItems((current) => current.map((item) =>
      item.id === id
        ? { ...item, ...changes, updatedAt: 'Just now' }
        : item,
    ))

    setSelected((current) =>
      current?.id === id
        ? { ...current, ...changes, updatedAt: 'Just now' }
        : current,
    )
  }

  function createIncident() {
    if (!newTitle.trim() || !newDescription.trim()) return

    const nextNumber = Math.max(
      ...items.map((item) => Number(item.id.replace('INC-', ''))),
      2000,
    ) + 1

    const incident: Incident = {
      id: `INC-${nextNumber}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      service: newService,
      severity: newSeverity,
      status: 'Open',
      assignee: newAssignee,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    }

    setItems((current) => [incident, ...current])
    setShowCreate(false)
    setNewTitle('')
    setNewDescription('')
    setNewSeverity('Medium')
    setNewAssignee('Unassigned')
    setNotice(`${incident.id} has been created.`)
  }

  const summary = [
    { label: 'Total Incidents', value: counts.total, icon: ClipboardList, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Critical Active', value: counts.critical, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Investigating', value: counts.investigating, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Resolved', value: counts.resolved, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ]

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Reliability management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Incident Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Detect, investigate and resolve infrastructure incidents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:self-auto"
        >
          <Plus size={17} />
          Create Incident
        </button>
      </section>

      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          <span className="flex items-center gap-2"><CheckCircle2 size={16} />{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925]">
              <div className="flex items-center justify-between">
                <div className={`flex size-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={21} />
                </div>
                <Clock3 size={17} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            </article>
          )
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#121925]">
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Incident queue</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Showing {filtered.length} of {items.length} incidents
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
              <Search size={17} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search incident, ID, service or assignee..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>

            <select
              value={severity}
              onChange={(event) => setSeverity(event.target.value as SeverityFilter)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-[#121925] dark:text-white"
            >
              <option value="All">All severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-[#121925] dark:text-white"
            >
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="Investigating">Investigating</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 dark:bg-white/[0.035]">
              <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <th className="px-5 py-3">Incident</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Assignee</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.025]">
                  <td className="px-5 py-4">
                    <p className="max-w-[240px] text-sm font-semibold text-slate-800 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.id}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{item.service}</td>
                  <td className="px-5 py-4"><SeverityBadge severity={item.severity} /></td>
                  <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{item.assignee}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">{item.createdAt}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="whitespace-nowrap rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-500 hover:text-blue-500 dark:border-white/10 dark:text-slate-300"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-14 text-center">
              <AlertCircle size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-white">No incidents found</p>
              <p className="mt-1 text-xs text-slate-400">Try changing your search or filters.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); setSeverity('All'); setStatus('All') }}
                className="mt-4 text-xs font-semibold text-blue-500"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <p className="pb-2 text-center text-[11px] text-slate-400">
        Simulated incident data · Frontend prototype · No live alert connection
      </p>

      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowCreate(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-incident-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#151d2b]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 id="create-incident-title" className="text-lg font-bold text-slate-900 dark:text-white">Create incident</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Add an incident to your demo workspace.</p>
              </div>
              <button type="button" onClick={() => setShowCreate(false)} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Incident title</span>
                <input
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="e.g. API response time increased"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#0b0f17] dark:text-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Description</span>
                <textarea
                  value={newDescription}
                  onChange={(event) => setNewDescription(event.target.value)}
                  rows={3}
                  placeholder="Describe what happened..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#0b0f17] dark:text-white"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Service</span>
                  <select value={newService} onChange={(event) => setNewService(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white">
                    <option value="api-gateway">api-gateway</option>
                    <option value="payment-service">payment-service</option>
                    <option value="auth-service">auth-service</option>
                    <option value="database-primary">database-primary</option>
                    <option value="notification-worker">notification-worker</option>
                    <option value="frontend-app">frontend-app</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Severity</span>
                  <select value={newSeverity} onChange={(event) => setNewSeverity(event.target.value as IncidentSeverity)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white">
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Assign to</span>
                <select value={newAssignee} onChange={(event) => setNewAssignee(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white">
                  {incidentAssignees.map((person) => <option key={person} value={person}>{person}</option>)}
                </select>
              </label>

              <button
                type="button"
                disabled={!newTitle.trim() || !newDescription.trim()}
                onClick={createIncident}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                Create incident
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="incident-details-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#151d2b]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{selected.id}</p>
                <h2 id="incident-details-title" className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{selected.title}</h2>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close details" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <SeverityBadge severity={selected.severity} />
              <StatusBadge status={selected.status} />
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Description</p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{selected.description}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] text-slate-400">Service</p>
                <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-white">{selected.service}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] text-slate-400">Created</p>
                <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-white">{selected.createdAt}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Assigned to</span>
                <select
                  value={selected.assignee}
                  onChange={(event) => updateIncident(selected.id, { assignee: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white"
                >
                  {incidentAssignees.map((person) => <option key={person} value={person}>{person}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Update status</span>
                <select
                  value={selected.status}
                  onChange={(event) => updateIncident(selected.id, { status: event.target.value as IncidentStatus })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white"
                >
                  <option value="Open">Open</option>
                  <option value="Investigating">Investigating</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
