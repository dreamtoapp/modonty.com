export interface AdminRoute {
  route: string; // e.g. "/admin/applications"
  label: string; // translation key used with getTranslations('admin')
}

// Central source of truth for admin routes used by:
// - permissions checks / accessible routes
// - user permissions management UI
// - (optionally) sidebar navigation
export const ADMIN_ROUTES: AdminRoute[] = [
  { route: '/admin', label: 'dashboard' },
  { route: '/admin/organizational-structure', label: 'organizationalStructure' },
  { route: '/admin/general-plan', label: 'generalPlan' },
  { route: '/admin/phase-1-requirements', label: 'phase1Requirements' },
  { route: '/admin/hiring-plan', label: 'hiringPlan' },
  { route: '/admin/applications', label: 'applications' },
  { route: '/admin/applications/interviews', label: 'interviews' },
  { route: '/admin/staff', label: 'staffManagement' },
  { route: '/admin/contact-messages', label: 'contactMessages' },
  { route: '/admin/accounting', label: 'accounting' },
  { route: '/admin/costs', label: 'costs' },
  { route: '/admin/source-of-income', label: 'sourceOfIncome' },
  { route: '/admin/modonty', label: 'modonty' },
  { route: '/admin/bmc', label: 'bmc' },
  { route: '/admin/bmc/canvas', label: 'bmcCanvas' },
  { route: '/admin/bmc/canvas/edit', label: 'bmcCanvasEdit' },
  { route: '/admin/subscriptions', label: 'subscriptions' },
  { route: '/admin/customers', label: 'customers' },
  { route: '/admin/tasks', label: 'tasks' },
  { route: '/admin/tasks/my-tasks', label: 'myTasks' },
  { route: '/admin/my-time', label: 'myTime' },
  { route: '/admin/notes', label: 'administrativeNotes' },
  { route: '/admin/contracts', label: 'contracts' },
  { route: '/admin/reports', label: 'reports' },
  { route: '/admin/settings', label: 'settings' },
  { route: '/admin/users', label: 'users' },
  { route: '/admin/clockify-users', label: 'users' },
];


