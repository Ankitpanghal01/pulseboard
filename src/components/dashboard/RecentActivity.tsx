import { CheckCircle2, GitCommit, Rocket, ShieldAlert } from 'lucide-react'

const activities = [
  {
    title: 'Deployment completed',
    detail: 'api-gateway · v2.4.1',
    time: '5 minutes ago',
    icon: Rocket,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'New commit pushed',
    detail: 'frontend-app · main',
    time: '18 minutes ago',
    icon: GitCommit,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Service health restored',
    detail: 'notification-worker',
    time: '42 minutes ago',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'High memory usage detected',
    detail: 'payment-service · Production',
    time: '1 hour ago',
    icon: ShieldAlert,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
]

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#121925] sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">Recent activity</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Latest workspace events</p>
        </div>
        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-500">LIVE DEMO</span>
      </div>

      <div className="mt-5 space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.title} className="flex items-start gap-3">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${activity.bg} ${activity.color}`}>
                <Icon size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.title}</p>
                <p className="mt-1 truncate text-xs text-slate-400">{activity.detail}</p>
              </div>
              <span className="shrink-0 pt-0.5 text-[10px] text-slate-400">{activity.time}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
