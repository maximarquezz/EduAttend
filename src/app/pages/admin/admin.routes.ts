import { Routes } from '@angular/router';
import { AttendanceOverviewComponent } from './attendance-overview/attendance-overview.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { RegisterRequestsComponent } from './register-requests/register-requests.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    data: {
      title: 'Dashboard',
      description: 'Estadísticas sobre tus asistencias.',
    },
  },
  {
    path: 'attendance-overview',
    component: AttendanceOverviewComponent,
    data: {
      title: 'Asistencias',
      description: 'Observa las asistencias de cualquier materia.',
    },
  },
  {
    path: 'register-requests',
    component: RegisterRequestsComponent,
    data: {
      title: 'Solicitudes de Registro',
      description: 'Acepta o rechaza solicitudes de registro.',
    },
  },
];
