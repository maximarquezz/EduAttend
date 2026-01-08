import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/data/auth.service';
import { RouterLinksService } from '../services/navigation/router-links.service';

/**
 * Este guardián se encarga de verificar si el usuario está logueado.
 *
 * @remarks
 * Se utiliza el método {@link AuthService.isLoggedIn} para comprobar
 * el estado de autenticación del usuario.
 *
 * @param route Información de la ruta
 * @param state Estado de la navegación
 * @returns `true` si el usuario está logueado, `false` si no lo está.
 *
 * @see {@link AuthService} - Servicio de autenticación.
 * @see {@link RouterLinksService} - Servicio de navegación.
 */
export const AuthGuard: CanActivateFn = (route, state) => {
  const routerLinksService = inject(RouterLinksService);
  const authService = inject(AuthService);
  const isLogged = authService.isLoggedIn();

  if (isLogged) {
    return true;
  } else {
    routerLinksService.goToLogin();
    return false;
  }
};
