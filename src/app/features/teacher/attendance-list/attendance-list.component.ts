import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { AuthService } from '../../../core/services/data/auth.service';

import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { AttendanceStatusComponent } from '../../../shared/components/attendance-status/attendance-status.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-attendance-list',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    EmptyStateComponent,
    AttendanceStatusComponent,
    DatePipe,
  ],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss',
})
export class AttendanceListComponent implements OnInit {
  routerLinks = inject(RouterLinksService);
  attendanceService = inject(AttendanceService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);

  tableCols: string[] = ['date', 'subject', 'student', 'state'];
  tableData = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadAttendances();
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit();
  }

  loadAttendances() {
    this.attendanceService.getTeacherAttendances().subscribe({
      next: (response: any[]) => {
        this.tableData.data = response.flatMap((subject) =>
          subject.attendances.flatMap((attendance: any) =>
            attendance.students.map((student: any) => ({
              date: attendance.attendance_date,
              subject: subject.subject_name,
              studentName: student.student_name,
              // STRING → la tabla lo muestra bien
              status: student.attendance_status,
            }))
          )
        );
      },
      error: (error) => console.error(error),
    });
  }

  openSubjectModal(subjectName: string): void {
    const subjectAttendances = this.tableData.data.filter(
      (att) => att.subject === subjectName
    );

    // 👇 EXACTAMENTE IGUAL A AttendanceHistoryComponent
    const modalData = subjectAttendances.map((att) => ({
      attendance_date: att.date,
      attendance_status: att.status, // STRING, NO ENUM
      attendance_notes: '',
    }));

    this.dialog.open(ModalComponent, {
      data: {
        cardTitle: subjectName,
        cardSubtitle: 'Historial de asistencias',
        cardPercentageLabel: 'Porcentaje de asistencias',
        cardPercentage: this.calculatePercentage(subjectAttendances),
        cardDateLabel: 'Última asistencia',
        cardDate: this.getLastAttendanceDate(subjectAttendances),
        modalCols: ['attendance_date', 'attendance_status', 'attendance_notes'],
        modalData,
        role: this.authService.getUserRole() || Role.Teacher,
      },
      width: '600px',
      height: '600px',
    });
  }

  private calculatePercentage(attendances: any[]): number {
    if (!attendances.length) return 0;

    const presentCount = attendances.filter(
      (att) => att.status === 'PRESENTE'
    ).length;

    return Math.round((presentCount / attendances.length) * 100);
  }

  private getLastAttendanceDate(attendances: any[]): Date | string {
    if (!attendances.length) return 'Sin asistencias';

    return [...attendances].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0].date;
  }
}
