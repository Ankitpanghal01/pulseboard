import { useEffect, useState } from 'react'
import { Bell, Monitor, User, Save, RotateCcw, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Input from '@/components/ui/Input'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()

  const [profile, setProfile] = useState({
    name: 'Ankit Kumar',
    email: 'ankit@example.com',
    workspace: 'PulseBoard Workspace',
  })

  const [notifications, setNotifications] = useState({
    deployments: true,
    incidents: true,
    infrastructure: false,
    weeklyReports: true,
  })

  const [refreshInterval, setRefreshInterval] = useState('30')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('pulseboard-profile')
      const savedNotifications = localStorage.getItem('pulseboard-notifications')
      const savedRefresh = localStorage.getItem('pulseboard-refresh')

      if (savedProfile) setProfile((current) => ({ ...current, ...JSON.parse(savedProfile) }))
      if (savedNotifications) setNotifications((current) => ({ ...current, ...JSON.parse(savedNotifications) }))
      if (savedRefresh) setRefreshInterval(savedRefresh)
    } catch {
      console.warn('Could not load saved PulseBoard preferences.')
    }
  }, [])

  const updateProfile = (key: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('pulseboard-profile', JSON.stringify(profile))
    localStorage.setItem('pulseboard-notifications', JSON.stringify(notifications))
    localStorage.setItem('pulseboard-refresh', refreshInterval)
    setSaved(true)
  }

  const handleReset = () => {
    setProfile({
      name: 'Ankit Kumar',
      email: 'ankit@example.com',
      workspace: 'PulseBoard Workspace',
    })
    setNotifications({
      deployments: true,
      incidents: true,
      infrastructure: false,
      weeklyReports: true,
    })
    setRefreshInterval('30')
    setSaved(false)
  }

  const notificationItems = [
    { key: 'deployments' as const, title: 'Deployment updates', description: 'Get notified when deployments succeed or fail.' },
    { key: 'incidents' as const, title: 'Incident alerts', description: 'Receive alerts about new and unresolved incidents.' },
    { key: 'infrastructure' as const, title: 'Infrastructure alerts', description: 'Get notified about server resource thresholds.' },
    { key: 'weeklyReports' as const, title: 'Weekly reports', description: 'Receive a weekly summary of platform performance.' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile and dashboard preferences.
        </p>
      </div>

      <Card className="p-5">
        <div className="mb-5 flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold">Profile & Workspace</h2>
            <p className="text-sm text-muted-foreground">Your account information</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full name"
            value={profile.name}
            onChange={(event) => updateProfile('name', event.target.value)}
          />
          <Input
            label="Email address"
            type="email"
            value={profile.email}
            onChange={(event) => updateProfile('email', event.target.value)}
          />
          <div className="md:col-span-2">
            <Input
              label="Workspace name"
              value={profile.workspace}
              onChange={(event) => updateProfile('workspace', event.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-5 flex items-center gap-3">
          {theme === 'dark' ? (
            <Moon className="h-5 w-5 text-primary" />
          ) : (
            <Sun className="h-5 w-5 text-primary" />
          )}
          <div>
            <h2 className="font-semibold">Appearance</h2>
            <p className="text-sm text-muted-foreground">Choose your dashboard theme</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={theme === 'light' ? 'default' : 'outline'}
            onClick={() => theme !== 'light' && toggleTheme()}
          >
            <Sun className="mr-2 h-4 w-4" /> Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            onClick={() => theme !== 'dark' && toggleTheme()}
          >
            <Moon className="mr-2 h-4 w-4" /> Dark
          </Button>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-5 flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">Choose which updates you receive</p>
          </div>
        </div>

        <div className="divide-y divide-border">
          {notificationItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications[item.key]}
                onClick={() => toggleNotification(item.key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  notifications[item.key] ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    notifications[item.key] ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-5 flex items-center gap-3">
          <Monitor className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold">Monitoring Preferences</h2>
            <p className="text-sm text-muted-foreground">Configure dashboard refresh settings</p>
          </div>
        </div>

        <label className="mb-2 block text-sm font-medium" htmlFor="refresh">
          Dashboard refresh interval
        </label>
        <select
          id="refresh"
          value={refreshInterval}
          onChange={(event) => {
            setRefreshInterval(event.target.value)
            setSaved(false)
          }}
          className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="15">Every 15 seconds</option>
          <option value="30">Every 30 seconds</option>
          <option value="60">Every minute</option>
          <option value="300">Every 5 minutes</option>
        </select>
        <p className="mt-2 text-xs text-muted-foreground">
          This preference is saved for the prototype; it does not connect to a live monitoring service.
        </p>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save changes
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        {saved && (
          <span className="text-sm font-medium text-emerald-500">
            Settings saved successfully!
          </span>
        )}
      </div>
    </div>
  )
}
