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
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-history',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
  ],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.scss',
})
export class AttendanceHistoryComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  tableCols: string[] = ['date', 'subject', 'state'];
  tableData = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadAttendances();
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;

    setTimeout(() => {
      this.sort.active = 'date';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
      this.cdr.detectChanges();
    });
  }

  loadAttendances() {
    const userId = this.authService.getUserId();

    console.log('User ID:', userId);

    if (!userId) {
      console.error('Usuario no logueado');
      return;
    }

    this.attendanceService.getRecentAttendances(50).subscribe({
      next: (response: any) => {
        console.log('Respuesta completa del servidor:', response);

        const attendances = Array.isArray(response)
          ? response
          : response.data || [];

        console.log('Attendances procesadas:', attendances);
        console.log('¿Es array?', Array.isArray(attendances));
        console.log('Cantidad:', attendances.length);

        this.tableData.data = attendances.map((att: any) => {
          console.log('Procesando attendance:', att);
          return {
            date: att.attendance_date,
            subject:
              att.enrollment?.mid_comission_subject?.subject?.subject_name ||
              'N/A',
            state: this.mapStatus(att.attendance_status),
          };
        });

        console.log('Datos finales de la tabla:', this.tableData.data);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error completo:', err);
        console.error('Error al cargar asistencias:', err);
      },
    });
  }

  private mapStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      PRESENTE: 'Presente',
      AUSENTE: 'Ausente',
      TARDE: 'Tarde',
      JUSTIFICADO: 'Justificado',
    };
    return statusMap[status] || status;
  }
}
