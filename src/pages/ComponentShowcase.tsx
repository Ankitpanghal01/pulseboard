import { useState } from 'react'
import { Moon, Sun, Activity, Server, Rocket, AlertTriangle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'

const sampleMetrics = [
  { label: 'Total servers', value: '24', detail: '22 online', icon: Server },
  { label: 'Deployments', value: '12', detail: 'Last 24 hours', icon: Rocket },
  { label: 'Open incidents', value: '03', detail: '2 need attention', icon: AlertTriangle },
]

const sampleServers = [
  { name: 'api-server-01', region: 'Mumbai, IN', cpu: 42, memory: 68, status: 'Online' },
  { name: 'web-server-02', region: 'Singapore, SG', cpu: 76, memory: 82, status: 'Warning' },
  { name: 'db-server-01', region: 'Frankfurt, DE', cpu: 28, memory: 51, status: 'Online' },
]

export default function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="size-7 text-emerald-500" />
            <div>
              <h1 className="text-2xl font-bold">PulseBoard</h1>
              <p className="text-sm text-slate-500">Design System Preview · Phase 2</p>
            </div>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            Toggle theme
          </Button>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Infrastructure overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleMetrics.map(metric => {
              const Icon = metric.icon
              return (
                <Card key={metric.label}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardDescription>{metric.label}</CardDescription>
                      <Icon className="size-5 text-emerald-500" />
                    </div>
                    <CardTitle className="text-3xl">{metric.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500">{metric.detail}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Server health · Sample data</h2>
          <Card>
            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {sampleServers.map(server => (
                <div key={server.name} className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-medium">{server.name}</p>
                    <p className="text-sm text-slate-500">{server.region}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span>CPU: {server.cpu}%</span>
                    <span>RAM: {server.memory}%</span>
                    <Badge variant={server.status === 'Online' ? 'success' : 'warning'} dot>
                      {server.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Button variants</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => showToast('Primary button clicked!')}>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Status badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>Warning</Badge>
            <Badge variant="danger" dot>Offline</Badge>
            <Badge variant="info">Deploying</Badge>
            <Badge variant="neutral">Unknown</Badge>
          </div>
        </section>

        <section className="max-w-md space-y-3">
          <h2 className="text-lg font-semibold">Input component</h2>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <p className="text-sm text-slate-500">
            Preview: {name || 'Your name will appear here'}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Interactions</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button onClick={() => showToast('Everything is working!', 'success')}>Success toast</Button>
            <Button variant="outline" onClick={() => showToast('Something needs attention.', 'error')}>Error toast</Button>
            <Button variant="outline" onClick={() => showToast('Here is some information.', 'info')}>Info toast</Button>
          </div>
        </section>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Welcome to PulseBoard"
        >
          <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
            Your reusable modal component is working correctly.
          </p>
          <Button block onClick={() => setModalOpen(false)}>Got it</Button>
        </Modal>
      </div>
    </main>
  )
}
