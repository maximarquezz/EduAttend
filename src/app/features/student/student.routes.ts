import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './dashboard/student-dashboard.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { StudentSubjectsComponent } from './subjects/student-subjects.component';

export const STUDENT_ROUTES: Routes = [
  { path: 'attendance-history', component: AttendanceHistoryComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: 'subjects', component: StudentSubjectsComponent },
];
