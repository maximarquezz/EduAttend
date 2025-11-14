import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RouterLinksService } from '../navigation/router-links.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private routerLinksService = inject(RouterLinksService);

  login(email: string, password: string): Observable<Object> {
    return this.http.post(`http://127.0.0.1:8000/api/login`, {
      email,
      password,
    });
  }

  logout() {
    return this.http.post('http://127.0.0.1:8000/api/logout', {}).pipe(
      tap(() => {
        sessionStorage.removeItem('userData');
        this.routerLinksService.goToLogin();
      })
    );
  }
}
