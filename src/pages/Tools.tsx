import { useMemo, useState } from 'react'
import { Search, Bell, CheckCheck, Trash2, AlertTriangle, Rocket, Server } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const pages = [
  { name: 'Overview', description: 'Dashboard metrics and recent activity', path: '/' },
  { name: 'Infrastructure', description: 'Servers, CPU, memory and disk usage', path: '/infrastructure' },
  { name: 'Deployments', description: 'Deployment history and release status', path: '/deployments' },
  { name: 'Incidents', description: 'Incident tracking and resolution', path: '/incidents' },
  { name: 'Analytics', description: 'Reports, trends and service reliability', path: '/analytics' },
  { name: 'Settings', description: 'Profile and dashboard preferences', path: '/settings' },
]

type Notification = {
  id: number
  title: string
  message: string
  type: 'incident' | 'deployment' | 'infrastructure'
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, title: 'Critical incident reported', message: 'API Gateway response time is above threshold.', type: 'incident', time: '5 minutes ago', read: false },
  { id: 2, title: 'Deployment successful', message: 'Frontend v2.4.1 was deployed successfully.', type: 'deployment', time: '25 minutes ago', read: false },
  { id: 3, title: 'High CPU usage', message: 'Server api-prod-02 reached 91% CPU utilization.', type: 'infrastructure', time: '1 hour ago', read: false },
  { id: 4, title: 'Deployment failed', message: 'Payment service deployment failed in staging.', type: 'deployment', time: '3 hours ago', read: true },
]

const storageKey = 'pulseboard-notifications-center'

export default function Tools() {
  const [query, setQuery] = useState('')
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) as Notification[] : initialNotifications
    } catch {
      return initialNotifications
    }
  })

  const results = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return pages
    return pages.filter((page) =>
      `${page.name} ${page.description}`.toLowerCase().includes(value)
    )
  }, [query])

  const unread = notifications.filter((item) => !item.read).length

  const updateNotifications = (next: Notification[]) => {
    setNotifications(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  const markAllRead = () => {
    updateNotifications(notifications.map((item) => ({ ...item, read: true })))
  }

  const clearNotifications = () => updateNotifications([])

  const markRead = (id: number) => {
    updateNotifications(notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    ))
  }

  const iconFor = (type: Notification['type']) => {
    if (type === 'incident') return <AlertTriangle className="h-5 w-5 text-red-500" />
    if (type === 'deployment') return <Rocket className="h-5 w-5 text-blue-500" />
    return <Server className="h-5 w-5 text-amber-500" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Search & Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find dashboard sections and manage your alerts.
        </p>
      </div>

      <Card className="space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Search PulseBoard</h2>
        </div>
        <Input
          placeholder="Search overview, infrastructure, deployments..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="divide-y divide-border">
          {results.map((page) => (
            <a
              key={page.path}
              href={page.path}
              className="block rounded-lg px-3 py-3 transition-colors hover:bg-muted"
            >
              <p className="text-sm font-medium">{page.name}</p>
              <p className="text-xs text-muted-foreground">{page.description}</p>
            </a>
          ))}
          {results.length === 0 && (
            <p className="py-5 text-center text-sm text-muted-foreground">
              No matching pages found.
            </p>
          )}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-semibold">Notification Center</h2>
              <p className="text-sm text-muted-foreground">
                {unread} unread notification{unread === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={markAllRead}>
              <CheckCheck className="mr-2 h-4 w-4" /> Mark all read
            </Button>
            <Button size="sm" variant="outline" onClick={clearNotifications}>
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {notifications.map((item) => (
            <div key={item.id} className="flex items-start gap-3 py-4">
              <div className="mt-1">{iconFor(item.type)}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  {!item.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
              </div>
              {!item.read && (
                <Button size="sm" variant="ghost" onClick={() => markRead(item.id)}>
                  Mark read
                </Button>
              )}
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              You're all caught up. No notifications.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
