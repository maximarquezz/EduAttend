import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-attendance-list',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss'
})
export class AttendanceListComponent {
  tableCols: string[] = ['date', 'subject', 'state'];

  tableData = new MatTableDataSource([
    { date: '2025-05-01', subject: 'Programación III', state: 'Presente' },
    { date: '2025-05-06', subject: 'Prácticas Profesionalizantes III', state: 'Ausente' },
    { date: '2025-05-18', subject: 'Probabilidad y Estadística', state: 'Presente' },
    { date: '2025-05-03', subject: 'Legislación Informática', state: 'Ausente' },
    { date: '2025-05-26', subject: 'PHP 4', state: 'Presente' },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;

    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit();
  }
}
