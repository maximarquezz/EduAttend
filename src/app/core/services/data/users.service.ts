import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  pendingUsers(): Observable<Object> {
    return this.http.get(`${environment.prodApiUrl}/pending-users`);
  }

  putUser(id: number, partialUser: any) {
    return this.http.put(`${environment.prodApiUrl}/users/${id}`, partialUser);
  }

  getUserByDni(dni: string): Observable<any> {
    return this.http.get(`${environment.prodApiUrl}/user-by-dni/${dni}`);
  }
}
