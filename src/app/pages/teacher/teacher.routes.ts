import { TeacherDashboardComponent } from './dashboard/teacher-dashboard.component';
import { Routes } from "@angular/router";
import { AttendanceListComponent } from "./attendance-list/attendance-list.component";
import { EditAttendanceComponent } from './edit-attendance/edit-attendance.component';
import { TeacherSubjectsComponent } from './subjects/teacher-subjects.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';

export const TEACHER_ROUTES: Routes = [
  { path: 'attendance-list', component: AttendanceListComponent },
  { path: 'dashboard', component: TeacherDashboardComponent },
  { path: 'edit-attendance', component: EditAttendanceComponent },
  { path: 'subjects', component: TeacherSubjectsComponent },
  { path: 'take-attendance', component: TakeAttendanceComponent },
];
