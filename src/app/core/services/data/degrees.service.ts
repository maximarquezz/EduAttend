import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Degree } from '../../models/interfaces/domain/degree.interface';

@Injectable({
  providedIn: 'root',
})
export class DegreesService {
  private http = inject(HttpClient);

  getDegrees() {
    return this.http.get<Degree[]>(`${environment.localApiUrl}/degree`);
  }

  degreeWithSubjects() {
    return this.http.get<Degree[]>(
      `${environment.localApiUrl}/degree-with-subjects`
    );
  }
}
