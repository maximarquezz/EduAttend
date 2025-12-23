import { Routes } from '@angular/router';
import { STUDENT_ROUTES } from './features/student/student.routes';
import { TEACHER_ROUTES } from './features/teacher/teacher.routes';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { StudentLayoutComponent } from './shared/layouts/student-layout.component';
import { TeacherLayoutComponent } from './shared/layouts/teacher-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: 'student',
    component: StudentLayoutComponent,
    children: STUDENT_ROUTES,
  },
  {
    path: 'teacher',
    component: TeacherLayoutComponent,
    children: TEACHER_ROUTES,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: ADMIN_ROUTES,
  },
];
