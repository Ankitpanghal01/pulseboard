import { NavLink } from 'react-router-dom'
import { Activity, ChevronLeft, X } from 'lucide-react'
import { navigation, secondaryNavigation } from '@/data/navigation'

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onClose,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-white/10 dark:bg-[#10151f] lg:translate-x-0 ${
          collapsed ? 'lg:w-[84px]' : 'lg:w-[260px]'
        } ${mobileOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full w-[260px]'}`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-200 px-5 dark:border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Activity size={22} />
            </div>
            <div className={`${collapsed ? 'lg:hidden' : ''}`}>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Pulse<span className="text-blue-500">Board</span>
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                DevOps Command Center
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X size={19} />
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 lg:block"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 ${collapsed ? 'lg:text-center lg:px-0' : ''}`}>
            {collapsed ? <span className="lg:hidden">Workspace</span> : 'Workspace'}
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon size={19} className="shrink-0" />
                  <span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <p className={`mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 ${collapsed ? 'lg:text-center lg:px-0' : ''}`}>
            {collapsed ? <span className="lg:hidden">Preferences</span> : 'Preferences'}
          </p>

          <nav className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon size={19} className="shrink-0" />
                  <span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-slate-200 p-4 dark:border-white/10">
          <div className={`flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/5 ${collapsed ? 'lg:justify-center lg:p-2' : ''}`}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white">
              AK
            </div>
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">Admin User</p>
              <p className="truncate text-[10px] text-slate-400">Workspace Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
