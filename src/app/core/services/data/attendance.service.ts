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
      `${environment.prodApiUrl}/attendances/enrollment/${enrollmentId}`
    );
  }

  getRecentAttendances(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.prodApiUrl}/attendances/recent?limit=${limit}`
    );
  }

  resumePerSubjectByStudentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.prodApiUrl}/attendances/resume-per-subject/student/${id}`
    );
  }
}
