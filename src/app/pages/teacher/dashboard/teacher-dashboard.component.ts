import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { CardComponent } from '../../../shared/components/card/card.component';
import * as echarts from 'echarts';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [
    MatCardModule,
    CardComponent
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss'
})
export class TeacherDashboardComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  ngAfterViewInit() {
    const chart = echarts.init(this.chartContainer.nativeElement);

    chart.setOption({
      xAxis: { type: 'category', data: ['Software', 'Hardware', 'Spyware', 'Malware', 'Middleware'] },
      yAxis: { type: 'value' },
      series: [{
        data: [1, 3, 5, 6, 9],
        type: 'bar',
        itemStyle: {
          color: '#005cbb'
        }
      }]
    });
  }
}
