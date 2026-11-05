import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  RefreshCw,
  Server,
} from 'lucide-react'

const API = 'http://127.0.0.1:8000/api/metrics'

type Metrics = {
  timestamp: string
  hostname: string
  platform: string
  cpu: {
    usage_percent: number
    logical_cores: number
    physical_cores: number | null
  }
  memory: {
    total_bytes: number
    used_bytes: number
    available_bytes: number
    usage_percent: number
  }
  disk: {
    total_bytes: number
    used_bytes: number
    free_bytes: number
    usage_percent: number
  }
  network: {
    bytes_sent: number
    bytes_received: number
  }
  system: {
    uptime_seconds: number
    process_count: number
  }
}

type HistoryPoint = {
  time: string
  cpu: number
  memory: number
}

function formatBytes(bytes: number) {
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`
}

function formatRate(bytes: number) {
  if (bytes < 1024) return `${bytes.toFixed(0)} B/s`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB/s`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB/s`
}

function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${days}d ${hours}h ${minutes}m`
}

function MetricCard({
  title,
  value,
  detail,
  icon,
  percentage,
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactNode
  percentage?: number
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <span className="text-primary">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      {percentage !== undefined && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default function LiveSystemMonitor() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [networkRate, setNetworkRate] = useState({ sent: 0, received: 0 })
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    let active = true
    let previousNetwork: Metrics['network'] | null = null
    let previousTime = 0

    const fetchMetrics = async () => {
      try {
        const response = await fetch(API)
        if (!response.ok) throw new Error(`API returned ${response.status}`)

        const data: Metrics = await response.json()
        if (!active) return

        const now = Date.now()

        if (previousNetwork && previousTime) {
          const elapsed = (now - previousTime) / 1000
          if (elapsed > 0) {
            setNetworkRate({
              sent: Math.max(0, (data.network.bytes_sent - previousNetwork.bytes_sent) / elapsed),
              received: Math.max(0, (data.network.bytes_received - previousNetwork.bytes_received) / elapsed),
            })
          }
        }

        previousNetwork = data.network
        previousTime = now

        setMetrics(data)
        setLastUpdated(new Date(data.timestamp).toLocaleTimeString())
        setError('')
        setHistory((current) => [
          ...current.slice(-29),
          {
            time: new Date(data.timestamp).toLocaleTimeString(),
            cpu: data.cpu.usage_percent,
            memory: data.memory.usage_percent,
          },
        ])
      } catch {
        if (active) setError('Cannot connect to the monitoring API. Make sure your Python server is running on port 8000.')
      }
    }

    fetchMetrics()
    const timer = window.setInterval(fetchMetrics, 2000)

    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Live System Monitor</h1>
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
              LIVE
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time hardware metrics from your MacBook.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="h-4 w-4" />
          Refreshes every 2 seconds
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {!metrics && !error && (
        <div className="rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">
          Connecting to your MacBook...
        </div>
      )}

      {metrics && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card p-4 text-sm">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span className="font-medium">{metrics.hostname}</span>
              <span className="text-muted-foreground">· {metrics.platform}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="CPU Usage"
              value={`${metrics.cpu.usage_percent.toFixed(1)}%`}
              detail={`${metrics.cpu.logical_cores} logical cores`}
              icon={<Cpu className="h-5 w-5" />}
              percentage={metrics.cpu.usage_percent}
            />
            <MetricCard
              title="Memory Usage"
              value={`${metrics.memory.usage_percent.toFixed(1)}%`}
              detail={`${formatBytes(metrics.memory.used_bytes)} used of ${formatBytes(metrics.memory.total_bytes)}`}
              icon={<MemoryStick className="h-5 w-5" />}
              percentage={metrics.memory.usage_percent}
            />
            <MetricCard
              title="Disk Usage"
              value={`${metrics.disk.usage_percent.toFixed(1)}%`}
              detail={`${formatBytes(metrics.disk.free_bytes)} free`}
              icon={<HardDrive className="h-5 w-5" />}
              percentage={metrics.disk.usage_percent}
            />
            <MetricCard
              title="Running Processes"
              value={metrics.system.process_count.toString()}
              detail={`${formatUptime(metrics.system.uptime_seconds)} system uptime`}
              icon={<Activity className="h-5 w-5" />}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold">CPU & Memory History</h2>
              <p className="mb-5 mt-1 text-xs text-muted-foreground">
                Live readings collected every 2 seconds
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="memoryFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} minTickGap={30} />
                    <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpu" name="CPU" stroke="#3b82f6" fill="url(#cpuFill)" />
                    <Area type="monotone" dataKey="memory" name="Memory" stroke="#a855f7" fill="url(#memoryFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold">Network Activity</h2>
              <p className="mb-5 mt-1 text-xs text-muted-foreground">
                Transfer rates calculated from real network counters
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Download</p>
                  <p className="mt-2 text-xl font-semibold">{formatRate(networkRate.received)}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Upload</p>
                  <p className="mt-2 text-xl font-semibold">{formatRate(networkRate.sent)}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Total received</p>
                  <p className="mt-1 font-semibold">{formatBytes(metrics.network.bytes_received)}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Total sent</p>
                  <p className="mt-1 font-semibold">{formatBytes(metrics.network.bytes_sent)}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <Network className="h-4 w-4 text-primary" />
                Network counters are cumulative since system startup.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
