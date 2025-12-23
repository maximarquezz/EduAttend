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
import * as echarts from 'echarts';
import { CardComponent } from '../../../shared/components/card/card.component';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { AttendanceService } from '../../../core/services/data/attendance.service';
import { mapAttendanceToBarOption } from '../../../core/mappers/attendance-to-chart.mapper';
import { StudentDashboardFacade } from './student-dashboard.facade';
import { Attendance } from '../../../core/models/interfaces/domain/attendance.interface';

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
  private facade = inject(StudentDashboardFacade);

  username: string = 'Usuario';
  totalAttendancePercentage: number = 0;
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
  }

  ngOnDestroy() {
    this.killChart();
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
}
