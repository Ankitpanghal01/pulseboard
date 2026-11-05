import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Server,
  ShieldAlert,
  Zap,
} from 'lucide-react'
import TrafficChart from '@/components/charts/TrafficChart'
import DeploymentChart from '@/components/charts/DeploymentChart'
import RecentActivity from '@/components/dashboard/RecentActivity'

const metrics = [
  {
    label: 'Total Servers',
    value: '24',
    detail: '2 added this month',
    trend: '+8.2%',
    positive: true,
    icon: Server,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Healthy Services',
    value: '21/24',
    detail: '87.5% operational',
    trend: '+2.4%',
    positive: true,
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Active Incidents',
    value: '03',
    detail: '2 require attention',
    trend: '-12.5%',
    positive: true,
    icon: ShieldAlert,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    label: 'Avg. Response Time',
    value: '124ms',
    detail: 'Across monitored APIs',
    trend: '-5.3%',
    positive: true,
    icon: Zap,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
]

const services = [
  { name: 'API Gateway', environment: 'Production', status: 'Operational', color: 'bg-emerald-500', uptime: '99.98%' },
  { name: 'Authentication Service', environment: 'Production', status: 'Operational', color: 'bg-emerald-500', uptime: '99.95%' },
  { name: 'Payment Service', environment: 'Production', status: 'Degraded', color: 'bg-amber-500', uptime: '97.42%' },
  { name: 'Notification Worker', environment: 'Staging', status: 'Operational', color: 'bg-emerald-500', uptime: '99.91%' },
]

const resources = [
  { label: 'CPU utilization', value: 64, color: 'bg-blue-500' },
  { label: 'Memory utilization', value: 78, color: 'bg-violet-500' },
  { label: 'Storage utilization', value: 42, color: 'bg-emerald-500' },
]

export default function Overview() {
  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            System overview
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Good morning, Admin <span>👋</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening across your infrastructure today.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 sm:self-auto">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          All systems monitored
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925]">
              <div className="flex items-center justify-between">
                <div className={`flex size-11 items-center justify-center rounded-xl ${metric.bg} ${metric.color}`}>
                  <Icon size={21} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {metric.trend}
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{metric.value}</p>
              <p className="mt-2 text-xs text-slate-400">{metric.detail}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <TrafficChart />
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Infrastructure resources</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Current average utilization</p>
            </div>
            <Activity size={20} className="text-blue-500" />
          </div>

          <div className="mt-8 space-y-7">
            {resources.map((resource) => (
              <div key={resource.label}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{resource.label}</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{resource.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className={`h-full rounded-full ${resource.color}`} style={{ width: `${resource.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-blue-500/10 bg-blue-500/5 p-4">
            <p className="text-xs font-semibold text-blue-500">Resource insight</p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Memory usage is currently the highest utilized resource. Consider reviewing memory-intensive services.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <DeploymentChart />
        <RecentActivity />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Service health</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Current status of monitored services</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-500">
            3 of 4 operational
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-4 dark:border-white/5">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`size-2.5 shrink-0 rounded-full ${service.color}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">{service.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{service.environment}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-xs font-semibold ${service.status === 'Degraded' ? 'text-amber-500' : 'text-emerald-500'}`}>{service.status}</p>
                <p className="mt-1 text-xs text-slate-400">{service.uptime}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="flex items-center justify-center gap-2 pb-2 text-center text-[11px] text-slate-400">
        <Clock3 size={13} />
        Demo data · Last updated just now · No live infrastructure connected
      </p>
    </div>
  )
}
