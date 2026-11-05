import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  HardDrive,
  MemoryStick,
  Search,
  Server,
} from 'lucide-react'
import {
  servers,
  type ServerInfo,
  type ServerStatus,
} from '@/data/servers'

type StatusFilter = 'All' | ServerStatus
type EnvironmentFilter = 'All' | 'Production' | 'Staging' | 'Development'

function StatusBadge({ status }: { status: ServerStatus }) {
  const styles = {
    Healthy: 'bg-emerald-500/10 text-emerald-500',
    Warning: 'bg-amber-500/10 text-amber-500',
    Critical: 'bg-red-500/10 text-red-500',
  }

  const dots = {
    Healthy: 'bg-emerald-500',
    Warning: 'bg-amber-500',
    Critical: 'bg-red-500',
  }

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold ${styles[status]}`}>
      <span className={`size-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  )
}

function ResourceBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  const color =
    value >= 85 ? 'bg-red-500' : value >= 70 ? 'bg-amber-500' : 'bg-emerald-500'

  return (
    <div className="min-w-[100px]">
      <div className="mb-1.5 flex justify-between text-[11px]">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function ServerRow({ server }: { server: ServerInfo }) {
  return (
    <tr className="border-t border-slate-100 transition hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.025]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Server size={17} />
          </div>
          <div>
            <p className="whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-white">{server.name}</p>
            <p className="mt-1 text-xs text-slate-400">{server.id}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        <p className="font-mono text-xs text-slate-600 dark:text-slate-300">{server.ip}</p>
        <p className="mt-1 text-xs text-slate-400">{server.region}</p>
      </td>
      <td className="px-5 py-4">
        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
          {server.environment}
        </span>
      </td>
      <td className="px-5 py-4"><StatusBadge status={server.status} /></td>
      <td className="min-w-[145px] px-5 py-4"><ResourceBar label="CPU" value={server.cpu} /></td>
      <td className="min-w-[145px] px-5 py-4"><ResourceBar label="Memory" value={server.memory} /></td>
      <td className="min-w-[145px] px-5 py-4"><ResourceBar label="Disk" value={server.disk} /></td>
      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{server.uptime}</td>
    </tr>
  )
}

export default function Infrastructure() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [environment, setEnvironment] = useState<EnvironmentFilter>('All')

  const filteredServers = useMemo(() => {
    return servers.filter((server) => {
      const query = search.toLowerCase()
      const matchesSearch =
        server.name.toLowerCase().includes(query) ||
        server.ip.includes(query) ||
        server.id.toLowerCase().includes(query)

      const matchesStatus = status === 'All' || server.status === status
      const matchesEnvironment =
        environment === 'All' || server.environment === environment

      return matchesSearch && matchesStatus && matchesEnvironment
    })
  }, [search, status, environment])

  const healthy = servers.filter((server) => server.status === 'Healthy').length
  const warning = servers.filter((server) => server.status === 'Warning').length
  const critical = servers.filter((server) => server.status === 'Critical').length

  const summary = [
    { label: 'Total Servers', value: servers.length, icon: Server, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Healthy', value: healthy, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Warnings', value: warning, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Critical', value: critical, icon: Activity, color: 'text-red-500', bg: 'bg-red-500/10' },
  ]

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Resource management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Infrastructure
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor your servers, resource utilization and system health.
          </p>
        </div>
        <span className="flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-500 sm:self-auto">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          Monitoring active
        </span>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925]">
              <div className="flex items-center justify-between">
                <div className={`flex size-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={21} />
                </div>
                <span className="text-xs text-slate-400">Current</span>
              </div>
              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            </article>
          )
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Resource utilization overview</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Average utilization across all servers</p>
          </div>
          <Activity size={20} className="text-blue-500" />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            { label: 'Average CPU', value: 50, icon: Cpu, color: 'text-blue-500' },
            { label: 'Average Memory', value: 62, icon: MemoryStick, color: 'text-violet-500' },
            { label: 'Average Disk', value: 57, icon: HardDrive, color: 'text-emerald-500' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.035]">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={item.color} />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.label}</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{item.value}%</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div className={`h-full rounded-full ${item.color.replace('text-', 'bg-')}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#121925]">
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Server inventory</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredServers.length} of {servers.length} servers
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
              <Search size={17} className="shrink-0 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search server name, IP or ID..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-[#121925] dark:text-white"
            >
              <option value="All">All statuses</option>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>

            <select
              value={environment}
              onChange={(event) => setEnvironment(event.target.value as EnvironmentFilter)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-[#121925] dark:text-white"
            >
              <option value="All">All environments</option>
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-50 dark:bg-white/[0.035]">
              <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <th className="px-5 py-3">Server</th>
                <th className="px-5 py-3">IP / Region</th>
                <th className="px-5 py-3">Environment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">CPU</th>
                <th className="px-5 py-3">Memory</th>
                <th className="px-5 py-3">Disk</th>
                <th className="px-5 py-3">Uptime</th>
              </tr>
            </thead>
            <tbody>
              {filteredServers.map((server) => (
                <ServerRow key={server.id} server={server} />
              ))}
            </tbody>
          </table>

          {filteredServers.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Server size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-white">No servers found</p>
              <p className="mt-1 text-xs text-slate-400">Try changing your search or filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setStatus('All')
                  setEnvironment('All')
                }}
                className="mt-4 text-xs font-semibold text-blue-500 hover:text-blue-600"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <p className="pb-2 text-center text-[11px] text-slate-400">
        Simulated server data · Frontend prototype · No live server connection
      </p>
    </div>
  )
}
