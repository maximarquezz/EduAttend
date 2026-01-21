import { TeacherDashboardComponent } from './dashboard/teacher-dashboard.component';
import { Routes } from '@angular/router';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { EditAttendanceComponent } from './edit-attendance/edit-attendance.component';
import { TeacherSubjectsComponent } from './subjects/teacher-subjects.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';

export const TEACHER_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: TeacherDashboardComponent,
    data: {
      title: 'Dashboard',
      description: 'Estadísticas sobre tus asistencias.',
    },
  },
  {
    path: 'subjects',
    component: TeacherSubjectsComponent,
    data: {
      title: 'Materias',
      description: 'Gestiona las asistencias a tus materias.',
    },
  },
  {
    path: 'attendance-list',
    component: AttendanceListComponent,
    data: {
      title: 'Asistencias',
      description: 'Visualiza las asistencias en orden cronológico.',
    },
  },
  { path: 'edit-attendance', component: EditAttendanceComponent },
  { path: 'take-attendance', component: TakeAttendanceComponent },
];
