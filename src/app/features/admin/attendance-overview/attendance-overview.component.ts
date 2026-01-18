import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { ComissionsService } from '../../../core/services/data/comissions.service';
import { MidComissionSubjectService } from '../../../core/services/data/mid-comission-subject.service';

interface YearGroup {
  year: number;
  subjects: any[];
}

@Component({
  selector: 'app-attendance-overview',
  imports: [
    CommonModule,
    MatCardModule,
    CardComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    EmptyStateComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './attendance-overview.component.html',
  styleUrl: './attendance-overview.component.scss',
})
export class AttendanceOverviewComponent implements OnInit {
  degrees: any[] = [];
  allComissions: any[] = [];
  comissions: any[] = [];
  allComissionSubjects: any[] = [];
  groupedSubjects: YearGroup[] = [];

  selectedDegree: number | null = null;
  selectedComission: number | null = null;
  isLoading = false;

  constructor(
    private attendanceService: AttendanceService,
    private comissionService: ComissionsService,
    private midComSubService: MidComissionSubjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.isLoading = true;

    forkJoin({
      degrees: this.attendanceService.getDegrees(),
      comissions: this.comissionService.getComissions(),
      comissionSubjects: this.midComSubService.getComissionAndSubject(),
    }).subscribe({
      next: (data) => {
        this.degrees = data.degrees;
        this.allComissions = data.comissions;
        this.allComissionSubjects = data.comissionSubjects;
        this.isLoading = false;
      },
      error: () => {
        this.showError('Error al cargar datos');
        this.isLoading = false;
      },
    });
  }

  onDegreeChange() {
    this.selectedComission = null;
    this.groupedSubjects = [];

    if (!this.selectedDegree) {
      this.comissions = [];
      return;
    }

    this.comissions = this.allComissions.filter(
      (c) => c.degree_id === this.selectedDegree
    );
  }

  onComissionChange() {
    this.groupedSubjects = [];

    if (!this.selectedComission) return;

    const filtered = this.allComissionSubjects.filter(
      (mcs) => mcs.comission_id === this.selectedComission
    );

    this.groupedSubjects = this.groupByYear(filtered);
  }

  private groupByYear(midComSubjects: any[]): YearGroup[] {
    const grouped = midComSubjects.reduce((acc, mcs) => {
      const year = mcs.subject?.subject_year || 1;
      if (!acc[year]) acc[year] = [];
      acc[year].push({
        id: mcs.id, // Este es el mid_comission_subject_id
        subject_name: mcs.subject?.subject_name || 'Sin nombre',
        subject_year: year,
        comission_name: mcs.comission?.comission_name || 'N/A',
      });
      return acc;
    }, {} as Record<number, any[]>);

    return Object.keys(grouped)
      .map((year) => ({ year: +year, subjects: grouped[+year] }))
      .sort((a, b) => a.year - b.year);
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
