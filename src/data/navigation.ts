import {
  LayoutDashboard,
  Server,
  Rocket,
  AlertTriangle,
  ChartNoAxesCombined,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const navigation: NavItem[] = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'Infrastructure', path: '/infrastructure', icon: Server },
  { label: 'Deployments', path: '/deployments', icon: Rocket },
  { label: 'Incidents', path: '/incidents', icon: AlertTriangle },
  { label: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
]

export const secondaryNavigation: NavItem[] = [
  { label: 'Settings', path: '/settings', icon: Settings },
]
