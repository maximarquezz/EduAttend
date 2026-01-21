import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/data/auth.service';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { map, Observable } from 'rxjs';
import { AttendanceHistoryMapper } from './attendance-history.mapper';
import { AttendanceTableRow } from '../../../core/models/interfaces/structural/attendance-table-row';

@Injectable({ providedIn: 'root' })
export class AttendanceHistoryFacade {
  readonly authService = inject(AuthService);
  readonly attendanceService = inject(AttendanceService);

  loadRecentAttendances(limit: number): Observable<AttendanceTableRow[]> {
    return this.attendanceService
      .getRecentAttendances(limit)
      .pipe(
        map((attendances) =>
          attendances.map(AttendanceHistoryMapper.toTableRow)
        )
      );
  }
}
