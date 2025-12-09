import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment.development';
import { ModalFactory } from '../../../core/factories/ModalFactory';
import { Role } from '../../../core/models/enums/role.enum';
import { AttendanceService } from '../../../core/services/data/attendance.service';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  dialog = inject(MatDialog);
  modalFactory = inject(ModalFactory);
  attendanceService = inject(AttendanceService);

  role = environment.userRole as Role;
  Role = Role;
  tableCols: any;
  tableData: any[] = [];
  isMinimumAttendance = false;

  @Input() cardTitle: string = 'Título';
  @Input() cardSubtitle: string = 'Subtítulo';
  @Input() cardPercentageLabel: string = 'Porcentaje de asistencias';
  @Input() cardPercentage: number = 100;
  @Input() cardDateLabel: string = 'Última asistencia';
  @Input() cardDate: Date | string = '01/01/1999';
  @Input() enrollmentId!: number; // ¡Nuevo! Recibe el enrollment_id

  constructor() {
    const modal = this.modalFactory.createModalData(this.role);
    const { modalCols } = modal.retrieveData();
    this.tableCols = modalCols;
  }

  ngOnInit(): void {
    // Cargar las asistencias cuando se inicializa el componente
    if (this.enrollmentId) {
      this.loadAttendances();
    }
  }

  loadAttendances(): void {
    this.attendanceService
      .getAttendancesByEnrollment(this.enrollmentId)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del backend:', response);
          if (Array.isArray(response)) {
            this.tableData = response;
            // Calcular el porcentaje después de cargar los datos
            this.calculateAttendancePercentage();
          } else {
            this.tableData = [];
            this.cardPercentage = 0;
          }
          console.log('Asistencias cargadas:', this.tableData);
        },
        error: (error) => {
          console.error('Error al cargar asistencias:', error);
          this.tableData = [];
          this.cardPercentage = 0;
        },
      });
  }

  calculateAttendancePercentage(): void {
    const total = this.tableData.length;

    if (total === 0) {
      this.cardPercentage = 0;
      return;
    }

    // Contar asistencias con sus respectivos valores
    let validAttendances = 0;

    this.tableData.forEach((attendance) => {
      switch (attendance.attendance_status) {
        case 'PRESENTE':
        case 'JUSTIFICADO':
          validAttendances += 1; // Vale 1 punto completo
          break;
        case 'TARDE':
          validAttendances += 0.5; // Vale medio punto
          break;
        case 'AUSENTE':
          validAttendances += 0; // No suma nada
          break;
      }
    });

    // Calcular porcentaje y redondear a 2 decimales
    this.cardPercentage = Math.round((validAttendances / total) * 100);

    console.log(
      `Porcentaje calculado: ${this.cardPercentage}% (${validAttendances}/${total})`
    );
  }

  openModal() {
    this.dialog.open(ModalComponent, {
      data: {
        cardTitle: this.cardTitle,
        cardSubtitle: this.cardSubtitle,
        cardPercentageLabel: this.cardPercentageLabel,
        cardPercentage: this.cardPercentage,
        cardDateLabel: this.cardDateLabel,
        cardDate: this.cardDate,
        tableCols: this.tableCols,
        tableData: this.tableData, // Ahora contiene las asistencias específicas
      },
      width: '600px',
      height: '600px',
    });
  }
}
