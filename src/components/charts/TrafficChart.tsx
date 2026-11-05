import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const trafficData = {
  '24h': [
    { time: '00:00', requests: 1200, errors: 32 },
    { time: '04:00', requests: 900, errors: 20 },
    { time: '08:00', requests: 2100, errors: 45 },
    { time: '12:00', requests: 3200, errors: 61 },
    { time: '16:00', requests: 2800, errors: 38 },
    { time: '20:00', requests: 3900, errors: 52 },
    { time: '23:00', requests: 3000, errors: 29 },
  ],
  '7d': [
    { time: 'Mon', requests: 1800, errors: 30 },
    { time: 'Tue', requests: 2400, errors: 44 },
    { time: 'Wed', requests: 2100, errors: 25 },
    { time: 'Thu', requests: 3200, errors: 51 },
    { time: 'Fri', requests: 2800, errors: 36 },
    { time: 'Sat', requests: 3900, errors: 58 },
    { time: 'Sun', requests: 3500, errors: 42 },
  ],
  '30d': [
    { time: 'Week 1', requests: 1700, errors: 35 },
    { time: 'Week 2', requests: 2600, errors: 42 },
    { time: 'Week 3', requests: 2200, errors: 30 },
    { time: 'Week 4', requests: 3900, errors: 54 },
  ],
}

type Range = keyof typeof trafficData

export default function TrafficChart() {
  const [range, setRange] = useState<Range>('24h')
  const data = trafficData[range]

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">Network traffic</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Incoming requests over time</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-white/5">
          {(['24h', '7d', '30d'] as Range[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                range === item
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-[#263246] dark:text-blue-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-5">
        <div>
          <p className="text-xs text-slate-400">Total requests</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">18.4K</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Error rate</p>
          <p className="mt-1 text-2xl font-bold text-emerald-500">0.8%</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Avg. latency</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">124ms</p>
        </div>
      </div>

      <div className="mt-6 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
              formatter={(value) => [Number(value).toLocaleString(), 'Requests']}
            />
            <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2.5} fill="url(#trafficGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
