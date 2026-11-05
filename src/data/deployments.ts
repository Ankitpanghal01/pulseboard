export type DeploymentStatus = 'Successful' | 'Failed' | 'In Progress'
export type DeploymentEnvironment = 'Production' | 'Staging' | 'Development'

export interface Deployment {
  id: string
  application: string
  version: string
  environment: DeploymentEnvironment
  status: DeploymentStatus
  branch: string
  commit: string
  author: string
  duration: string
  deployedAt: string
}

export const initialDeployments: Deployment[] = [
  { id: 'DEP-1042', application: 'api-gateway', version: 'v2.4.1', environment: 'Production', status: 'Successful', branch: 'main', commit: 'a83f2c1', author: 'Ankit Kumar', duration: '2m 34s', deployedAt: '5 min ago' },
  { id: 'DEP-1041', application: 'frontend-app', version: 'v1.8.0', environment: 'Production', status: 'Successful', branch: 'main', commit: 'b92d4e8', author: 'Sarah Chen', duration: '1m 52s', deployedAt: '28 min ago' },
  { id: 'DEP-1040', application: 'payment-service', version: 'v3.1.2', environment: 'Production', status: 'Failed', branch: 'release/3.1', commit: 'c14a9f2', author: 'James Wilson', duration: '3m 12s', deployedAt: '1 hour ago' },
  { id: 'DEP-1039', application: 'auth-service', version: 'v2.2.0', environment: 'Staging', status: 'Successful', branch: 'develop', commit: 'd72e6a1', author: 'Ankit Kumar', duration: '1m 46s', deployedAt: '2 hours ago' },
  { id: 'DEP-1038', application: 'notification-worker', version: 'v1.5.3', environment: 'Staging', status: 'In Progress', branch: 'develop', commit: 'e91b3c4', author: 'Emily Davis', duration: 'Running', deployedAt: '3 hours ago' },
  { id: 'DEP-1037', application: 'analytics-engine', version: 'v1.2.0', environment: 'Development', status: 'Successful', branch: 'feature/analytics', commit: 'f53c8d2', author: 'Michael Lee', duration: '2m 08s', deployedAt: '5 hours ago' },
  { id: 'DEP-1036', application: 'api-gateway', version: 'v2.4.0', environment: 'Production', status: 'Successful', branch: 'main', commit: 'a11d9c3', author: 'Ankit Kumar', duration: '2m 29s', deployedAt: 'Yesterday' },
  { id: 'DEP-1035', application: 'frontend-app', version: 'v1.7.9', environment: 'Staging', status: 'Failed', branch: 'develop', commit: 'b22e8f1', author: 'Sarah Chen', duration: '1m 18s', deployedAt: 'Yesterday' },
]
