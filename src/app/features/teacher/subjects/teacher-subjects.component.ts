import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DegreesService } from '../../../core/services/data/degrees.service';
import { AssignmentsService } from '../../../core/services/data/assignments.service';
import { ComissionsService } from '../../../core/services/data/comissions.service';
import { MidComissionSubjectService } from '../../../core/services/data/mid-comission-subject.service';
import { AssignType } from '../../../core/models/enums/assign-type.enum';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-teacher-subjects',
  imports: [
    CommonModule,
    MatCardModule,
    CardComponent,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    EmptyStateComponent,
  ],
  templateUrl: './teacher-subjects.component.html',
  styleUrl: './teacher-subjects.component.scss',
})
export class TeacherSubjectsComponent implements OnInit {
  private degreesService = inject(DegreesService);
  private assignmentsService = inject(AssignmentsService);
  private comissionsService = inject(ComissionsService);
  private midComissionSubjectService = inject(MidComissionSubjectService);
  private snackBar = inject(MatSnackBar);
  routerLinks = inject(RouterLinksService);

  degrees: any[] = [];
  comissions: any[] = [];
  availableSubjects: any[] = [];
  selectedDegree: number | null = null;
  selectedComission: number | null = null;
  assignedSubjects: any[] = [];
  groupedAssignments: any[] = [];

  ngOnInit(): void {
    this.loadDegrees();
    this.loadAssignments();
  }

  private openSnackBar(
    message: string,
    action = 'Cerrar',
    isError = false
  ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
    });
  }

  loadAssignments(): void {
    this.assignmentsService.myAssignments().subscribe({
      next: (data) => {
        const allAssignments = Array.isArray(data) ? data : [];
        this.assignedSubjects = allAssignments.filter(
          (assignment: any) => assignment.assign_type === 'DICTA'
        );
        this.groupAssignmentsByDegree();
      },
      error: (error) => {
        this.openSnackBar(
          'No se pudieron cargar tus asignaciones actuales.',
          'Cerrar',
          true
        );
        this.assignedSubjects = [];
        this.groupedAssignments = [];
      },
    });
  }

  groupAssignmentsByDegree(): void {
    const grouped = new Map();

    this.assignedSubjects.forEach((assignment) => {
      const degreeId = assignment.mid_comission_subject?.subject?.degree_id;

      if (degreeId) {
        const degree = this.degrees.find((d) => d.id === degreeId);
        const degreeName = degree?.degree_name || 'Sin carrera';

        if (!grouped.has(degreeId)) {
          grouped.set(degreeId, {
            degreeId,
            degreeName,
            assignments: [],
          });
        }
        grouped.get(degreeId).assignments.push(assignment);
      }
    });

    this.groupedAssignments = Array.from(grouped.values());
  }

  loadDegrees(): void {
    this.degreesService.getDegrees().subscribe({
      next: (data) => {
        this.degrees = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        this.openSnackBar(
          'Error al cargar las carreras disponibles.',
          'Cerrar',
          true
        );
      },
    });
  }

  onDegreeChange(degreeId: number): void {
    this.selectedDegree = degreeId;
    this.selectedComission = null;
    this.availableSubjects = [];

    this.comissionsService.getComissions().subscribe({
      next: (data: any) => {
        const list = Array.isArray(data) ? data : [];
        this.comissions = list.filter((c: any) => c.degree_id === degreeId);
      },
      error: (error) => {
        this.openSnackBar(
          'Error al cargar las comisiones de la carrera seleccionada.',
          'Cerrar',
          true
        );
      },
    });
  }

  onComissionChange(comissionId: number): void {
    this.selectedComission = comissionId;
    this.availableSubjects = [];

    this.midComissionSubjectService.getComissionAndSubject().subscribe({
      next: (data) => {
        const list = Array.isArray(data) ? data : [];
        this.availableSubjects = list.filter(
          (mcs: any) => mcs.comission_id === comissionId
        );
      },
      error: (error) => {
        this.openSnackBar(
          'Error al cargar las materias de la comisión.',
          'Cerrar',
          true
        );
      },
    });
  }

  assignSubject(midComissionSubjectId: number): void {
    const assignment = {
      mid_comissions_subjects_id: midComissionSubjectId,
      assign_type: AssignType.DICTA,
    };

    this.assignmentsService.postAssignment(assignment).subscribe({
      next: (response) => {
        this.openSnackBar('¡Asignación realizada con éxito!', 'OK');
        this.loadAssignments();
        if (this.selectedComission) {
          this.onComissionChange(this.selectedComission);
        }
      },
      error: (error) => {
        const msg = error.error?.error || 'Error desconocido al asignarse';
        this.openSnackBar(`Error al asignarse: ${msg}`, 'Cerrar', true);
      },
    });
  }

  isAssigned(midComissionSubjectId: number): boolean {
    return this.assignedSubjects.some(
      (a) => a.mid_comissions_subjects_id === midComissionSubjectId
    );
  }

  getDegreeName(degreeId: number | null): string {
    if (!degreeId) return '';
    const degree = this.degrees.find((d) => d.id === degreeId);
    return degree ? degree.degree_name : '';
  }

  getComissionName(comissionId: number | null): string {
    if (!comissionId) return '';
    const comission = this.comissions.find((c) => c.id === comissionId);
    return comission
      ? `${comission.comission_name} - ${comission.comission_year}`
      : '';
  }
}
