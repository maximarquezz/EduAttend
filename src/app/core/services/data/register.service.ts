import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);

  register(
    name: string,
    email: string,
    phone: string,
    dni: string,
    address: string,
    password: string,
    city_name: string,
    province_name: string
  ): Observable<Object> {
    return this.http.post(`http://127.0.0.1:8000/api/register`, {
      name,
      email,
      phone,
      dni,
      address,
      password,
      password_confirmation: password,
      city_name,
      province_name,
    });
  }
}
