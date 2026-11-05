import { useLocation } from 'react-router-dom'
import { navigation, secondaryNavigation } from '@/data/navigation'

const descriptions: Record<string, string> = {
  Infrastructure: 'Monitor servers, containers, clusters and infrastructure resources.',
  Deployments: 'Track releases, deployment history and application delivery status.',
  Incidents: 'Review service disruptions, alerts and incident response activity.',
  Analytics: 'Explore system performance, reliability and operational trends.',
  Settings: 'Manage your workspace preferences and dashboard configuration.',
}

export default function SectionPage() {
  const location = useLocation()
  const item = [...navigation, ...secondaryNavigation].find(
    (entry) => entry.path === location.pathname,
  )
  const Icon = item?.icon

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
          PulseBoard Workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {item?.label ?? 'Dashboard'}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          {descriptions[item?.label ?? ''] ?? 'Explore your DevOps workspace.'}
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/[0.02]">
        {Icon && (
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <Icon size={27} />
          </div>
        )}
        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
          {item?.label} module is ready
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          This section will be built in a later phase. The navigation and dashboard layout are now connected.
        </p>
        <span className="mt-5 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
          Coming in a future phase
        </span>
      </div>
    </section>
  )
}
