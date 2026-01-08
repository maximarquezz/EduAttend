import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Comission } from '../../models/interfaces/comission.interface';

@Injectable({
  providedIn: 'root',
})
export class ComissionsService {
  private http = inject(HttpClient);

  getComissions() {
    return this.http.get<Comission[]>(`${environment.apiUrl}/comission`);
  }
}
