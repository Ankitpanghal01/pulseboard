import { useMemo, useState } from 'react'
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock3,
  GitBranch,
  GitCommit,
  History,
  LoaderCircle,
  Rocket,
  Search,
  RotateCcw,
  X,
} from 'lucide-react'
import {
  initialDeployments,
  type Deployment,
  type DeploymentEnvironment,
  type DeploymentStatus,
} from '@/data/deployments'

type StatusFilter = 'All' | DeploymentStatus
type EnvironmentFilter = 'All' | DeploymentEnvironment

function StatusBadge({ status }: { status: DeploymentStatus }) {
  const styles = {
    Successful: 'bg-emerald-500/10 text-emerald-500',
    Failed: 'bg-red-500/10 text-red-500',
    'In Progress': 'bg-blue-500/10 text-blue-500',
  }

  const Icon = status === 'Successful'
    ? CheckCircle2
    : status === 'Failed'
      ? AlertCircle
      : LoaderCircle

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${styles[status]}`}>
      <Icon size={13} className={status === 'In Progress' ? 'animate-spin' : ''} />
      {status}
    </span>
  )
}

export default function Deployments() {
  const [items, setItems] = useState(initialDeployments)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [environment, setEnvironment] = useState<EnvironmentFilter>('All')
  const [selected, setSelected] = useState<Deployment | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [app, setApp] = useState('api-gateway')
  const [version, setVersion] = useState('v2.5.0')
  const [target, setTarget] = useState<DeploymentEnvironment>('Staging')
  const [notice, setNotice] = useState('')

  const successful = items.filter((item) => item.status === 'Successful').length
  const failed = items.filter((item) => item.status === 'Failed').length
  const running = items.filter((item) => item.status === 'In Progress').length

  const filtered = useMemo(() => items.filter((item) => {
    const query = search.toLowerCase()
    const matchesSearch =
      item.application.toLowerCase().includes(query) ||
      item.version.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query)

    return (
      matchesSearch &&
      (status === 'All' || item.status === status) &&
      (environment === 'All' || item.environment === environment)
    )
  }), [items, search, status, environment])

  function createDeployment() {
    const nextNumber = Math.max(
      ...items.map((item) => Number(item.id.replace('DEP-', ''))),
      1000,
    ) + 1

    const newDeployment: Deployment = {
      id: `DEP-${nextNumber}`,
      application: app,
      version,
      environment: target,
      status: 'In Progress',
      branch: target === 'Production' ? 'main' : 'develop',
      commit: Math.random().toString(16).slice(2, 9),
      author: 'Ankit Kumar',
      duration: 'Running',
      deployedAt: 'Just now',
    }

    setItems((current) => [newDeployment, ...current])
    setShowCreate(false)
    setNotice(`${newDeployment.id} started successfully.`)

    // Simulate a deployment finishing after a short delay.
    setTimeout(() => {
      setItems((current) => current.map((item) =>
        item.id === newDeployment.id
          ? { ...item, status: 'Successful', duration: '2m 18s' }
          : item,
      ))
      setNotice(`${newDeployment.id} completed successfully.`)
    }, 8000)
  }

  function simulateRollback(deployment: Deployment) {
    const rollback: Deployment = {
      ...deployment,
      id: `DEP-${Math.max(...items.map((item) => Number(item.id.replace('DEP-', '')))) + 1}`,
      version: `${deployment.version} (rollback)`,
      status: 'Successful',
      duration: '1m 42s',
      deployedAt: 'Just now',
      author: 'Ankit Kumar',
    }

    setItems((current) => [rollback, ...current])
    setSelected(null)
    setNotice(`Simulated rollback created: ${rollback.id}`)
  }

  const cards = [
    { label: 'Total Deployments', value: items.length, icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Successful', value: successful, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Failed', value: failed, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'In Progress', value: running, icon: Clock3, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Release management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Deployments
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Track releases, monitor deployment status and manage application versions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:self-auto"
        >
          <Rocket size={17} />
          Simulate Deployment
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
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925]">
              <div className="flex items-center justify-between">
                <div className={`flex size-11 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>
                  <Icon size={21} />
                </div>
                <Activity size={17} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
            </article>
          )
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#121925]">
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Deployment history</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Showing {filtered.length} of {items.length} deployments
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
              <Search size={17} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search application, version, ID or author..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-[#121925] dark:text-white"
            >
              <option value="All">All statuses</option>
              <option value="Successful">Successful</option>
              <option value="Failed">Failed</option>
              <option value="In Progress">In Progress</option>
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
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50 dark:bg-white/[0.035]">
              <tr className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <th className="px-5 py-3">Deployment</th>
                <th className="px-5 py-3">Environment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Branch / Commit</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Deployed</th>
                <th className="px-5 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.025]">
                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-white">{item.application}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.id} · {item.version}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">{item.environment}</span>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-5 py-4">
                    <p className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"><GitBranch size={13} />{item.branch}</p>
                    <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-slate-400"><GitCommit size={12} />{item.commit}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{item.author}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{item.duration}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500 dark:text-slate-400">{item.deployedAt}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="whitespace-nowrap rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-500 hover:text-blue-500 dark:border-white/10 dark:text-slate-300"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-14 text-center">
              <History size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-white">No deployments found</p>
              <p className="mt-1 text-xs text-slate-400">Try another search or filter.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); setStatus('All'); setEnvironment('All') }}
                className="mt-4 text-xs font-semibold text-blue-500"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <p className="pb-2 text-center text-[11px] text-slate-400">
        Simulated deployment history · No actual application or server is modified
      </p>

      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowCreate(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deployment-dialog-title"
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#151d2b]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 id="deployment-dialog-title" className="text-lg font-bold text-slate-900 dark:text-white">New deployment</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Configure your simulated release.</p>
              </div>
              <button type="button" onClick={() => setShowCreate(false)} aria-label="Close dialog" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Application</span>
                <select value={app} onChange={(event) => setApp(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white">
                  <option value="api-gateway">api-gateway</option>
                  <option value="frontend-app">frontend-app</option>
                  <option value="payment-service">payment-service</option>
                  <option value="auth-service">auth-service</option>
                  <option value="notification-worker">notification-worker</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Version</span>
                <input value={version} onChange={(event) => setVersion(event.target.value)} placeholder="e.g. v2.5.0" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#0b0f17] dark:text-white" />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">Target environment</span>
                <select value={target} onChange={(event) => setTarget(event.target.value as DeploymentEnvironment)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none dark:border-white/10 dark:bg-[#0b0f17] dark:text-white">
                  <option value="Development">Development</option>
                  <option value="Staging">Staging</option>
                  <option value="Production">Production</option>
                </select>
              </label>

              <div className="rounded-xl bg-amber-500/10 p-3 text-xs leading-5 text-amber-600 dark:text-amber-400">
                Demo mode: this action only updates local React state. It does not deploy real code.
              </div>

              <button type="button" disabled={!version.trim()} onClick={createDeployment} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                <Rocket size={16} />
                Start simulated deployment
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
            aria-labelledby="deployment-details-title"
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#151d2b]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{selected.id}</p>
                <h2 id="deployment-details-title" className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{selected.application}</h2>
                <p className="mt-1 text-xs text-slate-400">{selected.version}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close details" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5"><StatusBadge status={selected.status} /></div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ['Environment', selected.environment],
                ['Branch', selected.branch],
                ['Commit', selected.commit],
                ['Author', selected.author],
                ['Duration', selected.duration],
                ['Deployed', selected.deployedAt],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setSelected(null)} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                Close
              </button>
              {selected.status === 'Successful' && (
                <button type="button" onClick={() => simulateRollback(selected)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-3 py-3 text-sm font-semibold text-white hover:bg-amber-600">
                  <RotateCcw size={15} />
                  Simulate rollback
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
