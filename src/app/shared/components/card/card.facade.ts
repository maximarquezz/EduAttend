import { inject, Injectable } from '@angular/core';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { Attendance } from '../../../core/models/interfaces/attendance.interface';
import { Role } from '../../../core/models/enums/role.enum';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

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

  getAttendancesForAdmin(midComissionSubjectId: number): Observable<any[]> {
    return this.attendanceService
      .getEnrollmentsByComissionSubjectAdmin(midComissionSubjectId)
      .pipe(
        switchMap((enrollments) => {
          if (enrollments.length === 0) return of([]);

          const attendanceRequests = enrollments.map((enrollment: any) =>
            this.attendanceService
              .getAttendancesByEnrollment(enrollment.id)
              .pipe(
                map((attendances) => ({
                  enrollment,
                  attendances,
                }))
              )
          );

          return forkJoin(attendanceRequests);
        }),
        map((results) => {
          const grouped: any = {};

          results.forEach((item: any) => {
            item.attendances.forEach((att: any) => {
              const date = att.attendance_date.split('T')[0];
              if (!grouped[date]) {
                grouped[date] = {
                  attendance_date: date,
                  students: [],
                };
              }
              grouped[date].students.push({
                id: att.id,
                student_id: item.enrollment.user_id,
                student_name: item.enrollment.user.name,
                attendance_status: att.attendance_status,
                attendance_notes: att.attendance_notes,
              });
            });
          });

          return Object.values(grouped);
        })
      );
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
