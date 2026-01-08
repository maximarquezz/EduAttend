import { HttpInterceptorFn } from '@angular/common/http';
import { LoginComponent } from '../../features/auth/login/login.component';

/**
 * Este interceptor añade el token de autenticación.
 *
 * @remarks
 * Se encarga de añadir el token de autenticación,
 * verificando si está disponible en sessionStorage.
 *
 * @param req La request interceptada de HttpClient.
 * @param next Función que permite que la request siga a otro interceptor, o directamente al Back-End.
 * @returns La request clonada con el token interceptado, o en su defecto, la request original.
 *
 * @see {@link LoginComponent} - Componente encargado de recopilar credenciales de usuario.
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userDataString = sessionStorage.getItem('userData');

  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      const token = userData?.access_token;

      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next(authReq);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return next(req);
};
