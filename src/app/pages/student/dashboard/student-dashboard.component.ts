// Angular Imports
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
// ECharts Imports
import * as echarts from 'echarts';
import { CardComponent } from '../../../shared/components/card/card.component';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { mapAttendanceToBarOption } from '../../../core/mappers/attendance-to-chart.mapper';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatToolbarModule,
    MatGridListModule,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('attendanceChart') chartElement!: ElementRef;

  readonly routerLinks = inject(RouterLinksService);
  readonly authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);

  username: string = 'Usuario';
  totalAttendancePercentage: number = 0;
  private chart: any;

  ngOnInit() {
    this.username = this.authService.getUsername() ?? 'Usuario';
  }

  ngAfterViewInit() {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      console.error('No se pudo obtener el ID del estudiante');
      return;
    }

    this.attendanceService.resumePerSubjectByStudentId(studentId).subscribe({
      next: (data) => {
        if (data.length === 0) {
          console.log('El estudiante no tiene asistencias registradas');
          return;
        }

        // Calcular porcentaje total
        this.totalAttendancePercentage = this.calculateTotalPercentage(data);

        this.initChart(data);
      },
      error: (err) => console.error('Error cargando asistencias:', err),
    });
  }

  private calculateTotalPercentage(data: any[]): number {
    const totalClasses = data.reduce(
      (sum, subject) => sum + subject.total_classes,
      0
    );
    const totalValid = data.reduce(
      (sum, subject) => sum + subject.presentes + subject.tarde,
      0
    );

    return totalClasses > 0 ? Math.round((totalValid / totalClasses) * 100) : 0;
  }

  private initChart(data: any[]) {
    this.chart = echarts.init(this.chartElement.nativeElement);
    const option = mapAttendanceToBarOption(data);
    this.chart.setOption(option);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
