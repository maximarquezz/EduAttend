import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './pages/auth/auth.routes';

export const PUBLIC_ROUTES: Routes = [
  {
    path: 'auth',
    children: AUTH_ROUTES
  }
];
