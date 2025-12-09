import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private http = inject(HttpClient);

  getAttendancesByEnrollment(enrollmentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.localApiUrl}/attendances/enrollment/${enrollmentId}`
    );
  }
}
