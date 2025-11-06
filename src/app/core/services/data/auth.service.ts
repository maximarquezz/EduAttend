import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<Object> {
    return this.http.post(`http://127.0.0.1:8000/api/login`, {
      email: email,
      password: password,
    });
  }
}
