export type ServerStatus = 'Healthy' | 'Warning' | 'Critical'
export type ServerEnvironment = 'Production' | 'Staging' | 'Development'

export interface ServerInfo {
  id: string
  name: string
  ip: string
  region: string
  environment: ServerEnvironment
  status: ServerStatus
  cpu: number
  memory: number
  disk: number
  uptime: string
  os: string
}

export const servers: ServerInfo[] = [
  { id: 'SRV-001', name: 'api-gateway-01', ip: '10.0.1.12', region: 'Mumbai, IN', environment: 'Production', status: 'Healthy', cpu: 42, memory: 58, disk: 46, uptime: '42 days', os: 'Ubuntu 24.04' },
  { id: 'SRV-002', name: 'auth-service-01', ip: '10.0.1.15', region: 'Mumbai, IN', environment: 'Production', status: 'Healthy', cpu: 36, memory: 61, disk: 52, uptime: '28 days', os: 'Ubuntu 22.04' },
  { id: 'SRV-003', name: 'payment-node-01', ip: '10.0.1.21', region: 'Singapore, SG', environment: 'Production', status: 'Warning', cpu: 86, memory: 82, disk: 67, uptime: '16 days', os: 'Ubuntu 24.04' },
  { id: 'SRV-004', name: 'database-primary', ip: '10.0.1.25', region: 'Mumbai, IN', environment: 'Production', status: 'Healthy', cpu: 54, memory: 72, disk: 74, uptime: '65 days', os: 'Debian 12' },
  { id: 'SRV-005', name: 'worker-queue-01', ip: '10.0.2.10', region: 'Bangalore, IN', environment: 'Staging', status: 'Critical', cpu: 96, memory: 94, disk: 88, uptime: '3 days', os: 'Ubuntu 22.04' },
  { id: 'SRV-006', name: 'notification-01', ip: '10.0.2.14', region: 'Bangalore, IN', environment: 'Staging', status: 'Healthy', cpu: 29, memory: 43, disk: 38, uptime: '19 days', os: 'Ubuntu 24.04' },
  { id: 'SRV-007', name: 'frontend-node-01', ip: '10.0.3.11', region: 'Mumbai, IN', environment: 'Development', status: 'Healthy', cpu: 24, memory: 39, disk: 31, uptime: '12 days', os: 'Ubuntu 24.04' },
  { id: 'SRV-008', name: 'cache-redis-01', ip: '10.0.1.30', region: 'Singapore, SG', environment: 'Production', status: 'Warning', cpu: 71, memory: 89, disk: 58, uptime: '34 days', os: 'Debian 12' },
  { id: 'SRV-009', name: 'logging-node-01', ip: '10.0.2.18', region: 'Bangalore, IN', environment: 'Staging', status: 'Healthy', cpu: 33, memory: 48, disk: 55, uptime: '21 days', os: 'Ubuntu 22.04' },
  { id: 'SRV-010', name: 'ml-inference-01', ip: '10.0.3.20', region: 'Mumbai, IN', environment: 'Development', status: 'Healthy', cpu: 62, memory: 67, disk: 43, uptime: '8 days', os: 'Ubuntu 24.04' },
  { id: 'SRV-011', name: 'backup-node-01', ip: '10.0.1.40', region: 'Singapore, SG', environment: 'Production', status: 'Healthy', cpu: 18, memory: 35, disk: 79, uptime: '51 days', os: 'Debian 12' },
  { id: 'SRV-012', name: 'monitoring-01', ip: '10.0.2.22', region: 'Bangalore, IN', environment: 'Staging', status: 'Healthy', cpu: 45, memory: 54, disk: 49, uptime: '31 days', os: 'Ubuntu 24.04' },
]
