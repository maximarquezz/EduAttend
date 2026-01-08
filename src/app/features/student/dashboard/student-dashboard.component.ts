import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { mapAttendanceToBarOption } from '../../../core/mappers/attendance-to-chart.mapper';
import { StudentDashboardFacade } from './student-dashboard.facade';
import { Attendance } from '../../../core/models/interfaces/attendance.interface';

@Component({
  selector: 'app-student-dashboard',
  imports: [
    CommonModule,
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
  private facade = inject(StudentDashboardFacade);

  username: string = 'Usuario';
  totalAttendancePercentage: number = 0;
  subjectsAtRisk: any[] = [];
  riskSummary: any = null;
  private chart: any;

  ngOnInit() {
    this.username = this.facade.getUserName();
  }

  ngAfterViewInit() {
    this.facade.resumePerSubject().subscribe({
      next: (data) => {
        this.totalAttendancePercentage = this.calculateTotalPercentage(data);
        this.initChart(data);
      },
      error: (err) => console.error(err),
    });

    this.loadSubjectsAtRisk();
  }

  ngOnDestroy() {
    this.killChart();
  }

  private loadSubjectsAtRisk() {
    this.facade.getSubjectsAtRisk().subscribe({
      next: (data: any) => {
        this.riskSummary = data.summary;
        this.subjectsAtRisk = data.subjects;
      },
      error: (err) => console.error(err),
    });
  }

  private initChart(data: Attendance[]) {
    this.chart = echarts.init(this.chartElement.nativeElement);
    const option = mapAttendanceToBarOption(data);
    this.chart.setOption(option);
  }

  private killChart() {
    if (this.chart) {
      this.chart.dispose();
    }
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

  getStatusColor(status: string): string {
    return status === 'CRITICO' ? 'error' : 'warn';
  }

  getStatusIcon(status: string): string {
    return status === 'CRITICO' ? 'error' : 'warning';
  }
}
