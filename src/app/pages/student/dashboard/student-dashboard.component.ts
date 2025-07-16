// Angular Imports
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components Imports
import { HeaderComponent } from "../../../shared/layouts/header/header.component";
import { SidebarComponent } from "../../../shared/layouts/sidebar/sidebar.component";

// ECharts Imports
import * as echarts from 'echarts';

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
    HeaderComponent,
    SidebarComponent
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements AfterViewInit {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  ngAfterViewInit(): void {
    const chart = echarts.init(this.chartContainer.nativeElement);

    chart.setOption({
      xAxis: { type: 'category', data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'] },
      yAxis: { type: 'value' },
      series: [{
        data: [4, 10, 5, 20, 14],
        type: 'bar',
        itemStyle: {
          color: '#005cbb'
        }
      }]
    });
  }
}
