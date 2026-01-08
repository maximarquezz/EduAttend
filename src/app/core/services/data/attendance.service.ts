import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private http = inject(HttpClient);

  getAttendancesByEnrollment(enrollmentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/attendances/enrollment/${enrollmentId}`
    );
  }

  getRecentAttendances(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/attendances/recent?limit=${limit}`
    );
  }

  resumePerSubjectByStudentId(id: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/attendances/resume-per-subject/student/${id}`
    );
  }

  getMyAttendances(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/attendances/my-attendances`
    );
  }

  getTeacherAttendances(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/attendances/teacher/my-courses`
    );
  }

  storeBulkAttendances(attendances: any[]): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/attendances/bulk`, {
      attendances,
    });
  }

  getEnrollmentsByComissionSubject(
    midComissionSubjectId: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/my-comission-subject/${midComissionSubjectId}/enrollments`
    );
  }

  deleteAttendance(id: number) {
    return this.http.delete(`${environment.apiUrl}/attendances/${id}`);
  }

  updateAttendance(attendanceId: number, data: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/attendances/${attendanceId}`,
      data
    );
  }

  // Agregar este método en AttendanceService

  getSubjectsAtRisk(studentId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/attendances/subjects-at-risk/${studentId}`
    );
  }
}
