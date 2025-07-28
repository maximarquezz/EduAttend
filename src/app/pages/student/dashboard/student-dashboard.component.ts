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

// ECharts Imports
import * as echarts from 'echarts';
import { CardComponent } from '../../../shared/components/card/card.component';

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
    CardComponent
],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements AfterViewInit {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  ngAfterViewInit() {
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
