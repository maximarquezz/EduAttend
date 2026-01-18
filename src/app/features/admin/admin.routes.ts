import { Routes } from '@angular/router';
import { AttendanceOverviewComponent } from './attendance-overview/attendance-overview.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { RegisterRequestsComponent } from './register-requests/register-requests.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'attendance-overview', component: AttendanceOverviewComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'register-requests', component: RegisterRequestsComponent },
];
