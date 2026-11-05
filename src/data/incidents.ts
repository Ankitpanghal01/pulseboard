export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low'
export type IncidentStatus = 'Open' | 'Investigating' | 'Resolved'

export interface Incident {
  id: string
  title: string
  description: string
  service: string
  severity: IncidentSeverity
  status: IncidentStatus
  assignee: string
  createdAt: string
  updatedAt: string
}

export const initialIncidents: Incident[] = [
  {
    id: 'INC-2048',
    title: 'Payment service high latency',
    description: 'Response times have exceeded the 2-second threshold. Payment requests are experiencing delays.',
    service: 'payment-service',
    severity: 'Critical',
    status: 'Investigating',
    assignee: 'Ankit Kumar',
    createdAt: '10 min ago',
    updatedAt: '2 min ago',
  },
  {
    id: 'INC-2047',
    title: 'Worker queue memory saturation',
    description: 'Memory utilization reached 94% on the primary worker node.',
    service: 'worker-queue',
    severity: 'High',
    status: 'Open',
    assignee: 'Sarah Chen',
    createdAt: '32 min ago',
    updatedAt: '32 min ago',
  },
  {
    id: 'INC-2046',
    title: 'Database connection pool warning',
    description: 'Database connections are approaching the configured connection limit.',
    service: 'database-primary',
    severity: 'Medium',
    status: 'Investigating',
    assignee: 'James Wilson',
    createdAt: '1 hour ago',
    updatedAt: '15 min ago',
  },
  {
    id: 'INC-2045',
    title: 'Notification delivery delay',
    description: 'Background notification jobs were processed slower than expected.',
    service: 'notification-worker',
    severity: 'Low',
    status: 'Resolved',
    assignee: 'Emily Davis',
    createdAt: '3 hours ago',
    updatedAt: '1 hour ago',
  },
  {
    id: 'INC-2044',
    title: 'API gateway elevated error rate',
    description: 'The API gateway reported an increase in 5xx responses.',
    service: 'api-gateway',
    severity: 'High',
    status: 'Open',
    assignee: 'Ankit Kumar',
    createdAt: '5 hours ago',
    updatedAt: '5 hours ago',
  },
  {
    id: 'INC-2043',
    title: 'Staging deployment health check failed',
    description: 'The staging health check failed after a simulated release.',
    service: 'frontend-app',
    severity: 'Medium',
    status: 'Resolved',
    assignee: 'Michael Lee',
    createdAt: 'Yesterday',
    updatedAt: 'Yesterday',
  },
  {
    id: 'INC-2042',
    title: 'Cache server disk usage warning',
    description: 'Disk usage crossed the configured warning threshold.',
    service: 'cache-redis',
    severity: 'Low',
    status: 'Open',
    assignee: 'Sarah Chen',
    createdAt: 'Yesterday',
    updatedAt: 'Yesterday',
  },
]

export const incidentAssignees = [
  'Ankit Kumar',
  'Sarah Chen',
  'James Wilson',
  'Emily Davis',
  'Michael Lee',
  'Unassigned',
]
