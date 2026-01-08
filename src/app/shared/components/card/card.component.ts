import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalFactory } from '../modal/modal.factory';
import { Role } from '../../../core/models/enums/role.enum';
import { AuthService } from '../../../core/services/data/auth.service';
import { CardFacade } from './card.facade';

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
  private readonly dialog = inject(MatDialog);
  private readonly modalFactory = inject(ModalFactory);
  private readonly authService = inject(AuthService);
  private readonly facade = inject(CardFacade);

  @Input() cardTitle: string = 'Título';
  @Input() cardSubtitle: string = 'Subtítulo';
  @Input() cardPercentageLabel: string = 'Porcentaje de asistencias';
  @Input() cardPercentage: number = 0;
  @Input() cardDateLabel: string = 'Última asistencia';
  @Input() cardDate: Date | string = '01/01/1999';
  @Input() enrollmentId!: number;
  @Input() subjectId?: number; // Para estudiantes (subject_id real)
  @Input() midComissionSubjectId?: number; // Para profesores (mid_comission_subject_id)

  Role = Role;
  role!: Role;
  modalCols: string[] = [];
  modalActions!: {
    label: string;
    action: string;
    accent: string;
  }[];
  modalData: any[] = [];

  get attendanceIcon(): string | null {
    if (this.role !== Role.Student) return null;
    if (this.cardPercentage > 70) return 'check_circle';
    if (this.cardPercentage > 60) return 'schedule';
    return 'block';
  }

  get showAttendance(): boolean {
    return this.role !== Role.Admin;
  }

  ngOnInit(): void {
    this.initUserRole();
    this.createModalData();
    this.loadAttendances();
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        cardTitle: this.cardTitle,
        cardSubtitle: this.cardSubtitle,
        cardPercentageLabel: this.cardPercentageLabel,
        cardPercentage: this.cardPercentage,
        cardDateLabel: this.cardDateLabel,
        cardDate: this.cardDate,
        modalCols: this.modalCols,
        modalActions: this.modalActions,
        modalData: this.modalData,
        role: this.role,
        midComissionSubjectId: this.midComissionSubjectId,
      },
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.shouldRefresh) {
        this.loadAttendances();
      }
    });
  }

  createModalData() {
    const modal = this.modalFactory.createModalData(this.role);
    const { modalCols, modalActions } = modal.retrieveData();
    this.modalCols = modalCols;
    this.modalActions = modalActions;
  }

  private loadAttendances(): void {
    if (this.role === Role.Teacher) {
      this.facade.getAttendancesForUser().subscribe({
        next: (data) => {
          if (this.midComissionSubjectId) {
            const subjectData = data.find(
              (item) =>
                item.mid_comission_subject_id === this.midComissionSubjectId
            );

            if (subjectData && Array.isArray(subjectData.attendances)) {
              this.modalData = subjectData.attendances;
            } else {
              this.modalData = [];
            }
          } else {
            this.modalData = data
              .filter((item) => {
                return Array.isArray(item.attendances);
              })
              .flatMap((item) => item.attendances);
          }
        },
        error: (err) => {
          this.modalData = [];
        },
      });
    } else if (this.role === Role.Student && this.enrollmentId) {
      this.facade.getAttendancesByEnrollment(this.enrollmentId).subscribe({
        next: (data) => {
          this.modalData = data;
          this.cardPercentage = this.facade.calculateAttendancePercentage(data);
        },
        error: (err) => {
          this.modalData = [];
        },
      });
    }
  }

  private initUserRole(): void {
    this.role = this.authService.getUserRole();
  }
}
