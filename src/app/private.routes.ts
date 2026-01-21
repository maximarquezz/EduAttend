import { Routes } from '@angular/router';
import { STUDENT_ROUTES } from './pages/student/student.routes';
import { TEACHER_ROUTES } from './pages/teacher/teacher.routes';
import { ADMIN_ROUTES } from './pages/admin/admin.routes';
import { StudentLayoutComponent } from './shared/layouts/student-layout.component';
import { TeacherLayoutComponent } from './shared/layouts/teacher-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: 'student',
    component: StudentLayoutComponent,
    children: STUDENT_ROUTES,
    data: {
      title: 'Estudiante',
    },
  },
  {
    path: 'teacher',
    component: TeacherLayoutComponent,
    children: TEACHER_ROUTES,
    data: {
      title: 'Profesor',
    },
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: ADMIN_ROUTES,
    data: {
      title: 'Administrador',
    },
  },
];
