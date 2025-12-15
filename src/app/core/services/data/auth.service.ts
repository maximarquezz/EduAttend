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

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.localApiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          sessionStorage.setItem('userData', JSON.stringify(response));
          sessionStorage.setItem('username', response.user.name);
        })
      );
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  logout() {
    return this.http.post(`${environment.localApiUrl}/logout`, {}).pipe(
      tap(() => {
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('username');
        this.routerLinksService.goToLogin();
      })
    );
  }

  getUserData(): any {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getUserId(): number | null {
    const userData = this.getUserData();
    return userData?.user?.id || userData?.id || null;
  }

  isLoggedIn(): boolean {
    return !!this.getUserData();
  }
}
