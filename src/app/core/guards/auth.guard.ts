import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/data/auth.service';
import { RouterLinksService } from '../services/navigation/router-links.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const routerLinksService = inject(RouterLinksService);
  const authService = inject(AuthService);
  const isLogged = authService.isLoggedIn();

  if (isLogged) {
    return true;
  }

  routerLinksService.goToLogin();
  return false;
};
