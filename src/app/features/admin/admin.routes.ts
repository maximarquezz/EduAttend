import { Routes } from "@angular/router";
import { AttendanceOverviewComponent } from "./attendance-overview/attendance-overview.component";
import { AdminDashboardComponent } from "./dashboard/admin-dashboard.component";
import { EditAttendanceComponent } from "../teacher/edit-attendance/edit-attendance.component";
import { JustifyAbsenceComponent } from "./justify-absence/justify-absence.component";
import { AbsenceReportsComponent } from "./reports/absence-reports/absence-reports.component";
import { GenerateReportComponent } from "./reports/generate-report/generate-report.component";
import { TakeAttendanceComponent } from "../teacher/take-attendance/take-attendance.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserListComponent } from "./user-list/user-list.component";

export const ADMIN_ROUTES: Routes = [
  { path: 'attendance-overview', component: AttendanceOverviewComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'edit-attendance', component: EditAttendanceComponent },
  { path: 'justify-absence', component: JustifyAbsenceComponent },
  { path: 'absence-reports', component: AbsenceReportsComponent },
  { path: 'generate-report', component: GenerateReportComponent },
  { path: 'take-attendance', component: TakeAttendanceComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'user-list', component: UserListComponent },
];
