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

  getRecentAttendances(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.localApiUrl}/attendances/recent?limit=${limit}`
    );
  }

  resumePerSubjectByStudentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.localApiUrl}/attendances/resume-per-subject/student/${id}`
    );
  }

  getMyAttendances(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.localApiUrl}/attendances/my-attendances`
    );
  }

  getTeacherAttendances(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.localApiUrl}/attendances/teacher/my-courses`
    );
  }

  storeBulkAttendances(attendances: any[]): Observable<any> {
    return this.http.post<any>(`${environment.localApiUrl}/attendances/bulk`, {
      attendances,
    });
  }

  getEnrollmentsByComissionSubject(
    midComissionSubjectId: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.localApiUrl}/my-comission-subject/${midComissionSubjectId}/enrollments`
    );
  }

  deleteAttendance(id: number) {
    return this.http.delete(`${environment.localApiUrl}/attendances/${id}`);
  }

  updateAttendance(attendanceId: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.localApiUrl}/attendances/${attendanceId}`,
      data
    );
  }

  // Agregar este método en AttendanceService

  getSubjectsAtRisk(studentId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.localApiUrl}/attendances/subjects-at-risk/${studentId}`
    );
  }
}
