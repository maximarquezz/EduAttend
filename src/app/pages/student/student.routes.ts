import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './dashboard/student-dashboard.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { StudentSubjectsComponent } from './subjects/student-subjects.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: StudentDashboardComponent,
    data: {
      title: 'Dashboard',
      description: 'Estadísticas sobre tus asistencias.',
    },
  },
  {
    path: 'subjects',
    component: StudentSubjectsComponent,
    data: {
      title: 'Materias',
      description: 'Inscríbete a materias y sigue tus asistencias.',
    },
  },
  {
    path: 'attendance-history',
    component: AttendanceHistoryComponent,
    data: {
      title: 'Historial de Asistencias',
      description: 'Verifica tu historial de asistencias en orden cronológico.',
    },
  },
];
