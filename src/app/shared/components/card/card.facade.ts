import { inject, Injectable } from '@angular/core';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { Attendance } from '../../../core/models/interfaces/attendance.interface';
import { Role } from '../../../core/models/enums/role.enum';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardFacade {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthService);

  getAttendancesByEnrollment(enrollmentId: number): Observable<Attendance[]> {
    return this.attendanceService
      .getAttendancesByEnrollment(enrollmentId)
      .pipe(map((data) => data ?? []));
  }

  getAttendancesForUser(enrollmentId?: number): Observable<any[]> {
    const role = this.authService.getUserRole();

    if (role === Role.Teacher) {
      return this.attendanceService.getTeacherAttendances();
    } else if (role === Role.Student && enrollmentId) {
      return this.getAttendancesByEnrollment(enrollmentId);
    }

    return new Observable((observer) => observer.next([]));
  }

  calculateAttendancePercentage(attendances: Attendance[]): number {
    if (!attendances.length) return 0;

    let validAttendances = 0;
    attendances.forEach((attendance) => {
      switch (attendance.attendance_status) {
        case 'PRESENTE':
        case 'JUSTIFICADO':
          validAttendances += 1;
          break;
        case 'TARDE':
          validAttendances += 0.5;
          break;
      }
    });

    return Math.round((validAttendances / attendances.length) * 100);
  }
}
