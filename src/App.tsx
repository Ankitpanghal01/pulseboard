import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Overview from '@/pages/Overview'
import Infrastructure from '@/pages/Infrastructure'
import Deployments from '@/pages/Deployments'
import Incidents from '@/pages/Incidents'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'
import Tools from '@/pages/Tools'
import LiveSystemMonitor from '@/components/dashboard/LiveSystemMonitor'
import ComponentShowcase from '@/pages/ComponentShowcase'

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/components" element={<ComponentShowcase />} />
        <Route path="/live-monitor" element={<LiveSystemMonitor />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  )
}
