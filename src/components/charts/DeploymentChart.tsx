import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { day: 'Mon', successful: 8, failed: 1 },
  { day: 'Tue', successful: 12, failed: 2 },
  { day: 'Wed', successful: 9, failed: 1 },
  { day: 'Thu', successful: 14, failed: 2 },
  { day: 'Fri', successful: 11, failed: 1 },
  { day: 'Sat', successful: 6, failed: 0 },
  { day: 'Sun', successful: 10, failed: 1 },
]

export default function DeploymentChart() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
      <div>
        <h2 className="font-semibold text-slate-900 dark:text-white">Deployment activity</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Successful and failed deployments this week</p>
      </div>

      <div className="mt-5 flex gap-5">
        <div>
          <p className="text-xs text-slate-400">Successful</p>
          <p className="mt-1 text-xl font-bold text-emerald-500">70</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Failed</p>
          <p className="mt-1 text-xl font-bold text-red-500">8</p>
        </div>
      </div>

      <div className="mt-5 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={5} margin={{ top: 8, right: 5, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ background: '#111827', border: '1px solid #334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
            />
            <Bar dataKey="successful" name="Successful" fill="#10b981" radius={[5, 5, 0, 0]} />
            <Bar dataKey="failed" name="Failed" fill="#ef4444" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
