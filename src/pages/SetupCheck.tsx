

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, CheckCircle2, Moon, Sun } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from '@/utils/cn'

const checks = [
  'React + TypeScript + Vite',
  'Tailwind CSS v4',
  'React Router DOM',
  'Framer Motion',
  'Recharts',
  'Lucide React icons',
  "Path alias '@/'",
]

const sampleData = [
  { time: '10:00', cpu: 32 },
  { time: '10:05', cpu: 41 },
  { time: '10:10', cpu: 38 },
  { time: '10:15', cpu: 56 },
  { time: '10:20', cpu: 49 },
  { time: '10:25', cpu: 63 },
  { time: '10:30', cpu: 58 },
  { time: '10:35', cpu: 71 },
]

export default function SetupCheck() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

  function toggleTheme() {
    const next = !isDark
    document.documentElement.classList.toggle('dark', next)
    setIsDark(next)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'w-full max-w-md rounded-xl border p-6 shadow-lg',
          'border-slate-200 bg-slate-50',
          'dark:border-white/10 dark:bg-[#121722]',
        )}
      >
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="size-5 text-emerald-500" />
            <h1 className="text-lg font-semibold tracking-tight">PulseBoard</h1>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </header>

        <ul className="mb-6 space-y-2 text-sm">
          {checks.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="size-4 text-emerald-500" />
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleData}>
              <defs>
                <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="cpu"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#cpuFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.section>
    </main>
  )
}
