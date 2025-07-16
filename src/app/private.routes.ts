import { Routes } from '@angular/router';
import { STUDENT_ROUTES } from './pages/student/student.routes';
import { TEACHER_ROUTES } from './pages/teacher/teacher.routes';
import { ADMIN_ROUTES } from './pages/admin/admin.routes';

export const PRIVATE_ROUTES: Routes = [
  {
    path: 'student',
    children: STUDENT_ROUTES
  },
  {
    path: 'teacher',
    children: TEACHER_ROUTES
  },
  {
    path: 'admin',
    children: ADMIN_ROUTES
  }
];
