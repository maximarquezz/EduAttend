import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Degree } from '../../models/interfaces/degree.interface';

@Injectable({
  providedIn: 'root',
})
export class DegreesService {
  private http = inject(HttpClient);

  getDegrees() {
    return this.http.get<Degree[]>(`${environment.apiUrl}/degree`);
  }

  degreeWithSubjects() {
    return this.http.get<Degree[]>(
      `${environment.apiUrl}/degree-with-subjects`
    );
  }
}
