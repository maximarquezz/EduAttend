import { HttpInterceptorFn } from '@angular/common/http';

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
