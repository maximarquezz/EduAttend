import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/data/auth.service';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { map, Observable, throwError } from 'rxjs';
import { Attendance } from '../../../core/models/interfaces/domain/attendance.interface';

@Injectable({ providedIn: 'root' })
export class StudentDashboardFacade {
  readonly authService = inject(AuthService);
  readonly attendanceService = inject(AttendanceService);

  resumePerSubject(): Observable<Attendance[]> {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      return throwError(
        () => new Error('No se pudo obtener el id del estudiante.')
      );
    }

    return this.attendanceService
      .resumePerSubjectByStudentId(studentId)
      .pipe(map((data) => data ?? []));
  }

  getUserName(): string {
    return this.authService.getUsername() ?? 'Usuario';
  }
}
