import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  pendingUsers(): Observable<Object> {
    return this.http.get(`http://127.0.0.1:8000/api/pending-users`);
  }
}
