import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DegreesService } from '../../../core/services/data/degrees.service';
import { EnrollmentsService } from '../../../core/services/data/enrollments.service';
import { ComissionsService } from '../../../core/services/data/comissions.service';
import { MidComissionSubjectService } from '../../../core/services/data/mid-comission-subject.service';
import { Degree } from '../../../core/models/interfaces/domain/degree.interface';
import { Comission } from '../../../core/models/interfaces/domain/comission.interface';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';

interface DegreeGroup {
  degreeId: number;
  degreeName: string;
  enrollments: any[];
}

@Component({
  selector: 'app-student-subjects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CardComponent,
    MatTabsModule,
    MatChipsModule,
  ],
  templateUrl: './student-subjects.component.html',
  styleUrl: './student-subjects.component.scss',
})
export class StudentSubjectsComponent implements OnInit {
  private readonly degreesService = inject(DegreesService);
  private readonly enrollmentsService = inject(EnrollmentsService);
  private readonly comissionsService = inject(ComissionsService);
  private readonly midComissionSubjectService = inject(
    MidComissionSubjectService
  );
  private readonly snackBar = inject(MatSnackBar);
  readonly routerLinks = inject(RouterLinksService);

  degrees: Degree[] = [];
  comissions: Comission[] = [];
  availableSubjects: any[] = [];
  enrolledSubjects: any[] = [];
  groupedEnrollments: DegreeGroup[] = [];
  selectedDegree: number | null = null;
  selectedComission: number | null = null;
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadInitialData();
  }

  get filteredGroupedEnrollments(): DegreeGroup[] {
    if (!this.searchTerm.trim()) {
      return this.groupedEnrollments;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();

    return this.groupedEnrollments
      .map((group) => ({
        ...group,
        enrollments: group.enrollments.filter((enrollment) => {
          const subjectName =
            enrollment.mid_comission_subject?.subject?.subject_name?.toLowerCase() ||
            '';
          const comissionName =
            enrollment.mid_comission_subject?.comission?.comission_name?.toLowerCase() ||
            '';
          const status = enrollment.enrollment_status?.toLowerCase() || '';

          return (
            subjectName.includes(searchLower) ||
            comissionName.includes(searchLower) ||
            status.includes(searchLower)
          );
        }),
      }))
      .filter((group) => group.enrollments.length > 0);
  }

  get totalEnrollments(): number {
    return this.filteredGroupedEnrollments.reduce(
      (total, group) => total + group.enrollments.length,
      0
    );
  }

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
        enrollment.mid_comission_subject_id === midComissionSubjectId
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

  clearSearch(): void {
    this.searchTerm = '';
  }

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

  private handleEnrollmentsLoaded(data: any): void {
    this.enrolledSubjects = this.ensureArray(data);
    this.groupEnrollmentsByDegree();
    console.log(this.enrolledSubjects);
    console.log('Grouped:', this.groupedEnrollments);
  }

  private handleEnrollmentsError(): void {
    this.enrolledSubjects = [];
    this.groupedEnrollments = [];
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

  private groupEnrollmentsByDegree(): void {
    const grouped = new Map<number, DegreeGroup>();

    this.enrolledSubjects.forEach((enrollment) => {
      const degreeId = enrollment.mid_comission_subject?.subject?.degree_id;
      const degreeName =
        enrollment.mid_comission_subject?.subject?.degree?.degree_name;

      if (degreeId && degreeName) {
        if (!grouped.has(degreeId)) {
          grouped.set(degreeId, {
            degreeId,
            degreeName,
            enrollments: [],
          });
        }
        grouped.get(degreeId)!.enrollments.push(enrollment);
      }
    });

    this.groupedEnrollments = Array.from(grouped.values());
  }

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
