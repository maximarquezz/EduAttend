import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RouterLinksService } from '../navigation/router-links.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private routerLinksService = inject(RouterLinksService);

  login(email: string, password: string): Observable<Object> {
    return this.http.post(`${environment.localApiUrl}/login`, {
      email,
      password,
    });
  }

  logout() {
    return this.http.post(`${environment.localApiUrl}/logout`, {}).pipe(
      tap(() => {
        sessionStorage.removeItem('userData');
        this.routerLinksService.goToLogin();
      })
    );
  }
}
