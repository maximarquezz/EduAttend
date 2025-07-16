import { Routes } from '@angular/router';
import { PUBLIC_ROUTES } from './public.routes';
import { PRIVATE_ROUTES } from './private.routes';

export const routes: Routes = [
  {
    path: 'public',
    children: PUBLIC_ROUTES
  },
  {
    path: 'private',
    children: PRIVATE_ROUTES
  },
  {
    path: '',
    redirectTo: 'public/auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'public/auth/login',
    pathMatch: 'full',
  }
];
