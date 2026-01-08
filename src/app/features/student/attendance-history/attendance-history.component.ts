import {
  Component,
  ViewChild,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceHistoryFacade } from './attendance-history.facade';
import { DatePipe } from '@angular/common';
import { AttendanceTableRow } from '../../../core/models/interfaces/structural/attendance-table-row';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { AttendanceStatusComponent } from '../../../shared/components/attendance-status/attendance-status.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Role } from '../../../core/models/enums/role.enum';
import { AuthService } from '../../../core/services/data/auth.service';

@Component({
  selector: 'app-attendance-history',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    DatePipe,
    AttendanceStatusComponent,
  ],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.scss',
})
export class AttendanceHistoryComponent implements OnInit {
  private readonly facade = inject(AttendanceHistoryFacade);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);
  readonly routerLinks = inject(RouterLinksService);

  tableCols: string[] = ['date', 'subject', 'state'];
  tableData = new MatTableDataSource<AttendanceTableRow>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadAttendances();
  }

  ngAfterViewInit() {
    this.configTable();
  }

  loadAttendances() {
    this.facade
      .loadRecentAttendances(50)
      .subscribe((rows) => (this.tableData.data = rows));
  }

  configTable() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
    setTimeout(() => {
      this.sort.active = 'date';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
      this.cdr.detectChanges();
    });
  }

  openSubjectModal(element: AttendanceTableRow): void {
    // Filtra las asistencias de esta materia específica
    const subjectAttendances = this.tableData.data.filter(
      (attendance) => attendance.subject === element.subject
    );

    // Transforma los datos al formato que espera el modal
    const modalData = subjectAttendances.map((att) => ({
      attendance_date: att.date,
      attendance_status: att.status,
      attendance_notes: '', // Ajusta si tienes notas en tu modelo
    }));

    // Abre el modal con los datos filtrados
    this.dialog.open(ModalComponent, {
      data: {
        cardTitle: element.subject,
        cardSubtitle: 'Historial de asistencias',
        cardPercentageLabel: 'Porcentaje de asistencias',
        cardPercentage: this.calculatePercentage(subjectAttendances),
        cardDateLabel: 'Última asistencia',
        cardDate: this.getLastAttendanceDate(subjectAttendances),
        modalCols: ['attendance_date', 'attendance_status', 'attendance_notes'],
        modalActions: [
          {
            label: 'Cerrar',
            action: 'close',
            accent: 'tonal',
          },
        ],
        modalData: modalData,
        role: this.authService.getUserRole() || Role.Student,
      },
      width: '600px',
      height: '600px',
    });
  }

  private calculatePercentage(attendances: AttendanceTableRow[]): number {
    if (attendances.length === 0) return 0;

    const presentCount = attendances.filter(
      (att) => att.status?.toUpperCase() === 'PRESENTE'
    ).length;

    return Math.round((presentCount / attendances.length) * 100);
  }

  private getLastAttendanceDate(
    attendances: AttendanceTableRow[]
  ): Date | string {
    if (attendances.length === 0) return 'Sin asistencias';

    const sorted = [...attendances].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sorted[0].date;
  }
}
