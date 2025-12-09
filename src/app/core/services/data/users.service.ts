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
    return this.http.get(`${environment.localApiUrl}/pending-users`);
  }

  putUser(id: number, partialUser: any) {
    return this.http.put(`${environment.localApiUrl}/users/${id}`, partialUser);
  }
}
