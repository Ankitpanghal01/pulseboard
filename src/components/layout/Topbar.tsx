import { useLocation } from 'react-router-dom'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { navigation, secondaryNavigation } from '@/data/navigation'

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const allItems = [...navigation, ...secondaryNavigation]
  const currentPage = allItems.find((item) => item.path === location.pathname)

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#10151f]/90 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
        >
          <Menu size={21} />
        </button>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Workspace / PulseBoard
          </p>
          <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">
            {currentPage?.label ?? 'Dashboard'}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden w-52 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 md:flex dark:border-white/10 dark:bg-white/5">
          <Search size={16} className="text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
          />
          <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-400 dark:border-white/10">
            ⌘ K
          </kbd>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#10151f]" />
        </button>

        <div className="hidden size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white sm:flex">
          AK
        </div>
      </div>
    </header>
  )
}
