import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { CardComponent } from '../../../shared/components/card/card.component';
import * as echarts from 'echarts';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatCardModule, CardComponent, MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
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
