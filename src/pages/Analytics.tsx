import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Download,
  Gauge,
  Server,
  ShieldCheck,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Range = '7d' | '30d' | '90d'

const datasets = {
  '7d': [
    { label: 'Mon', requests: 2100, uptime: 99.8, latency: 120 },
    { label: 'Tue', requests: 2800, uptime: 99.9, latency: 115 },
    { label: 'Wed', requests: 2400, uptime: 99.7, latency: 132 },
    { label: 'Thu', requests: 3400, uptime: 99.9, latency: 108 },
    { label: 'Fri', requests: 3100, uptime: 99.8, latency: 124 },
    { label: 'Sat', requests: 3900, uptime: 99.95, latency: 105 },
    { label: 'Sun', requests: 3600, uptime: 99.9, latency: 112 },
  ],
  '30d': [
    { label: 'Week 1', requests: 12500, uptime: 99.7, latency: 135 },
    { label: 'Week 2', requests: 14800, uptime: 99.8, latency: 128 },
    { label: 'Week 3', requests: 16200, uptime: 99.9, latency: 116 },
    { label: 'Week 4', requests: 18400, uptime: 99.95, latency: 110 },
  ],
  '90d': [
    { label: 'Month 1', requests: 42000, uptime: 99.6, latency: 145 },
    { label: 'Month 2', requests: 48600, uptime: 99.8, latency: 125 },
    { label: 'Month 3', requests: 55200, uptime: 99.9, latency: 112 },
  ],
}

const deploymentData = [
  { name: 'Week 1', successful: 42, failed: 5 },
  { name: 'Week 2', successful: 51, failed: 4 },
  { name: 'Week 3', successful: 46, failed: 7 },
  { name: 'Week 4', successful: 63, failed: 3 },
]

const incidentData = [
  { name: 'Critical', value: 8, color: '#ef4444' },
  { name: 'High', value: 14, color: '#f97316' },
  { name: 'Medium', value: 22, color: '#f59e0b' },
  { name: 'Low', value: 18, color: '#3b82f6' },
]

const serviceData = [
  { name: 'API Gateway', uptime: 99.99 },
  { name: 'Auth Service', uptime: 99.95 },
  { name: 'Database', uptime: 99.91 },
  { name: 'Frontend App', uptime: 99.87 },
  { name: 'Payment Service', uptime: 97.42 },
]

const tooltipStyle = {
  background: '#111827',
  border: '1px solid #334155',
  borderRadius: 12,
  color: '#fff',
  fontSize: 12,
}

export default function Analytics() {
  const [range, setRange] = useState<Range>('7d')
  const data = datasets[range]

  const averageUptime = useMemo(
    () => data.reduce((sum, item) => sum + item.uptime, 0) / data.length,
    [data],
  )

  const averageLatency = Math.round(
    data.reduce((sum, item) => sum + item.latency, 0) / data.length,
  )

  const metrics = [
    {
      label: 'Average Uptime',
      value: `${averageUptime.toFixed(2)}%`,
      change: '+0.12%',
      icon: ShieldCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Deployment Success',
      value: '96.4%',
      change: '+2.8%',
      icon: CheckCircle2,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Incident Resolution',
      value: '18 min',
      change: '-12.5%',
      icon: Clock3,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Avg. Response Time',
      value: `${averageLatency}ms`,
      change: '-5.3%',
      icon: Gauge,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
  ]

  function exportCSV() {
    const rows = [
      ['Metric', 'Value'],
      ['Date Range', range],
      ['Average Uptime', `${averageUptime.toFixed(2)}%`],
      ['Deployment Success', '96.4%'],
      ['Incident Resolution', '18 min'],
      ['Average Response Time', `${averageLatency}ms`],
      [],
      ['Period', 'Requests', 'Uptime', 'Latency'],
      ...data.map((item) => [
        item.label,
        String(item.requests),
        `${item.uptime}%`,
        `${item.latency}ms`,
      ]),
    ]

    const csv = rows.map((row) =>
      row.map((cell) => {
        const value = String(cell ?? '')
        return `"${value.replace(/"/g, '""')}"`
      }).join(','),
    ).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `pulseboard-analytics-${range}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
            Performance intelligence
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analytics & Reports
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Understand system reliability, performance and deployment trends.
          </p>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:self-auto"
        >
          <Download size={17} />
          Export CSV
        </button>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#121925]">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-white">Reporting period</p>
          <p className="mt-1 text-xs text-slate-400">Select a period to update the performance trends</p>
        </div>
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-white/5">
          {(['7d', '30d', '90d'] as Range[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                range === item
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-[#263246] dark:text-blue-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item === '7d' ? '7 Days' : item === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
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
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
                  <ArrowUpRight size={14} />
                  {metric.change}
                </span>
              </div>
              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
              <p className="mt-2 text-xs text-slate-400">Compared with previous period</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Traffic trends</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Incoming requests over the selected period</p>
            </div>
            <Activity size={20} className="text-blue-500" />
          </div>
          <div className="mt-6 h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="requests" name="Requests" stroke="#3b82f6" strokeWidth={2.5} fill="url(#analyticsTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Incident distribution</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Incidents by severity level</p>
          </div>
          <div className="relative mt-3 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incidentData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={4} stroke="none">
                  {incidentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">62</p>
              <p className="text-xs text-slate-400">Total incidents</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {incidentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.name}</span>
                <span className="ml-auto text-xs font-semibold text-slate-800 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Deployment performance</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Successful vs failed releases</p>
            </div>
            <BarChart3 size={20} className="text-blue-500" />
          </div>
          <div className="mt-5 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deploymentData} barGap={5} margin={{ top: 8, right: 5, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="successful" name="Successful" fill="#10b981" radius={[5, 5, 0, 0]} />
                <Bar dataKey="failed" name="Failed" fill="#ef4444" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex gap-5 text-xs">
            <span className="flex items-center gap-2 text-slate-500"><span className="size-2 rounded-full bg-emerald-500" />Successful</span>
            <span className="flex items-center gap-2 text-slate-500"><span className="size-2 rounded-full bg-red-500" />Failed</span>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Service reliability</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Uptime percentage by service</p>
            </div>
            <Server size={20} className="text-emerald-500" />
          </div>
          <div className="mt-6 space-y-5">
            {serviceData.map((service) => (
              <div key={service.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{service.name}</span>
                  <span className={`text-xs font-semibold ${service.uptime < 99 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {service.uptime}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full ${service.uptime < 99 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${service.uptime}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-5 dark:bg-blue-500/[0.06]">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Analytics insight</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Average response time is {averageLatency}ms for the selected period. Payment Service has the lowest uptime in this sample. Consider reviewing its recent incidents and deployment history.
            </p>
          </div>
        </div>
      </section>

      <p className="flex items-center justify-center gap-2 pb-2 text-center text-[11px] text-slate-400">
        <Clock3 size={13} />
        Sample analytics data · Reporting period: {range} · No live monitoring connection
      </p>
    </div>
  )
}
