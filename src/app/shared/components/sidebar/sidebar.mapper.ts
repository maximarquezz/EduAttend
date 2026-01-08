import { SidebarMenuItem } from './sidebar.model';

export function mapSidebarMenu(role: string): SidebarMenuItem[] {
  switch (role) {
    case 'estudiante':
      return [
        {
          label: 'Dashboard',
          icon: 'home',
          route: '/private/student/dashboard',
        },
        {
          label: 'Materias',
          icon: 'menu_book',
          route: '/private/student/subjects',
        },
        {
          label: 'Asistencias',
          icon: 'event_available',
          route: '/private/student/attendance-history',
        },
      ];

    case 'profesor':
      return [
        {
          label: 'Dashboard',
          icon: 'home',
          route: '/private/teacher/dashboard',
        },
        {
          label: 'Materias',
          icon: 'groups',
          route: '/private/teacher/subjects',
        },
        {
          label: 'Asistencias',
          icon: 'assignment_turned_in',
          route: '/private/teacher/attendance-list',
        },
      ];

    case 'administrador':
      return [
        { label: 'Dashboard', icon: 'home', route: '/private/admin/dashboard' },
        {
          label: 'Asistencias',
          icon: 'assignment_turned_in',
          route: '/private/admin/attendance-overview',
        },
        {
          label: 'Inasistencias',
          icon: 'event_busy',
          route: '/private/admin/justify-absence',
        },
        {
          label: 'Solicitudes',
          icon: 'assignment_ind',
          route: '/private/admin/user-management',
        },
        {
          label: 'Usuarios',
          icon: 'groups',
          route: '/private/admin/user-list',
        },
      ];

    default:
      return [];
  }
}
