import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DegreesService } from '../../../core/services/data/degrees.service';
import { EnrollmentsService } from '../../../core/services/data/enrollments.service';
import { ComissionsService } from '../../../core/services/data/comissions.service';
import { MidComissionSubjectService } from '../../../core/services/data/mid-comission-subject.service';
import { Degree } from '../../../core/models/interfaces/domain/degree.interface';
import { Comission } from '../../../core/models/interfaces/domain/comission.interface';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-student-subjects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    CardComponent,
  ],
  templateUrl: './student-subjects.component.html',
  styleUrl: './student-subjects.component.scss',
})
export class StudentSubjectsComponent implements OnInit {
  // == SERVICES ==
  private readonly degreesService = inject(DegreesService);
  private readonly enrollmentsService = inject(EnrollmentsService);
  private readonly comissionsService = inject(ComissionsService);
  private readonly midComissionSubjectService = inject(
    MidComissionSubjectService
  );
  private readonly snackBar = inject(MatSnackBar);

  // == STATE ==
  degrees: Degree[] = [];
  comissions: Comission[] = [];
  availableSubjects: any[] = [];
  enrolledSubjects: any[] = [];
  selectedDegree: number | null = null;
  selectedComission: number | null = null;

  ngOnInit(): void {
    this.loadInitialData();
  }

  // == PUBLIC METHODS ==
  onDegreeChange(degreeId: number): void {
    this.resetDegreeSelection();
    this.selectedDegree = degreeId;
    this.loadComissionsByDegree(degreeId);
  }

  onComissionChange(comissionId: number): void {
    this.selectedComission = comissionId;
    this.loadSubjectsByComission(comissionId);
  }

  enrollSubject(midComissionSubjectId: number): void {
    const enrollmentData = this.createEnrollmentData(midComissionSubjectId);

    this.enrollmentsService.postEnroll(enrollmentData).subscribe({
      next: () => this.handleEnrollmentSuccess(),
      error: (error) => this.handleEnrollmentError(error),
    });
  }

  isEnrolled(midComissionSubjectId: number): boolean {
    return this.enrolledSubjects.some(
      (enrollment) =>
        enrollment.mid_comissions_subjects_id === midComissionSubjectId
    );
  }

  getDegreeName(degreeId: number | null): string {
    if (!degreeId) return '';
    return (
      this.degrees.find((degree) => degree.id === degreeId)?.degree_name ?? ''
    );
  }

  getComissionName(comissionId: number | null): string {
    if (!comissionId) return '';
    const comission = this.comissions.find((c) => c.id === comissionId);
    return comission
      ? `${comission.comission_name} - ${comission.comission_year}`
      : '';
  }

  // == PRIVATE METHODS ==
  private loadInitialData(): void {
    this.loadEnrollments();
    this.loadDegrees();
  }

  private loadEnrollments(): void {
    this.enrollmentsService.myEnrollments().subscribe({
      next: (data) => this.handleEnrollmentsLoaded(data),
      error: () => this.handleEnrollmentsError(),
    });
  }

  private loadDegrees(): void {
    this.degreesService.getDegrees().subscribe({
      next: (data) => this.handleDegreesLoaded(data),
      error: () => this.showError('Error al cargar las carreras disponibles.'),
    });
  }

  private loadComissionsByDegree(degreeId: number): void {
    this.comissionsService.getComissions().subscribe({
      next: (data) => this.handleComissionsLoaded(data, degreeId),
      error: () =>
        this.showError(
          'Error al cargar las comisiones de la carrera seleccionada.'
        ),
    });
  }

  private loadSubjectsByComission(comissionId: number): void {
    this.midComissionSubjectService.getComissionAndSubject().subscribe({
      next: (data) => this.handleSubjectsLoaded(data, comissionId),
      error: () =>
        this.showError('Error al cargar las materias de la comisión.'),
    });
  }

  // == EVENT HANDLERS ==
  private handleEnrollmentsLoaded(data: any): void {
    this.enrolledSubjects = this.ensureArray(data);
  }

  private handleEnrollmentsError(): void {
    this.enrolledSubjects = [];
    this.showError('No se pudieron cargar tus inscripciones actuales.');
  }

  private handleDegreesLoaded(data: any): void {
    this.degrees = this.ensureArray(data);
  }

  private handleComissionsLoaded(data: any, degreeId: number): void {
    const allComissions = this.ensureArray(data);
    this.comissions = allComissions.filter(
      (comission) => comission.degree_id === degreeId
    );
  }

  private handleSubjectsLoaded(data: any, comissionId: number): void {
    const allSubjects = this.ensureArray(data);
    this.availableSubjects = allSubjects.filter(
      (subject) => subject.comission_id === comissionId
    );
  }

  private handleEnrollmentSuccess(): void {
    this.showSuccess('¡Inscripción realizada con éxito!');
    this.loadEnrollments();
    this.refreshCurrentComission();
  }

  private handleEnrollmentError(error: any): void {
    const message = error.error?.error || 'Error desconocido al inscribirse';
    this.showError(`Error al inscribirse: ${message}`);
  }

  // == HELPER METHODS ==
  private createEnrollmentData(midComissionSubjectId: number) {
    return {
      mid_comission_subject_id: midComissionSubjectId,
      enrollment_year: new Date().getFullYear(),
    };
  }

  private resetDegreeSelection(): void {
    this.selectedComission = null;
    this.availableSubjects = [];
  }

  private refreshCurrentComission(): void {
    if (this.selectedComission) {
      this.onComissionChange(this.selectedComission);
    }
  }

  private ensureArray(data: any): any[] {
    return Array.isArray(data) ? data : [];
  }

  private showSuccess(message: string): void {
    this.showSnackBar(message, 'OK', false);
  }

  private showError(message: string): void {
    this.showSnackBar(message, 'Cerrar', true);
  }

  private showSnackBar(
    message: string,
    action: string,
    isError: boolean
  ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
