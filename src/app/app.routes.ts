import { Routes } from '@angular/router';
import { PUBLIC_ROUTES } from './public.routes';
import { PRIVATE_ROUTES } from './private.routes';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'public',
    children: PUBLIC_ROUTES,
  },
  {
    //canActivate: [AuthGuard],
    path: 'private',
    children: PRIVATE_ROUTES,
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
  },
];
