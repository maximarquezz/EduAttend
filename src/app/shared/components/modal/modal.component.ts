import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modal',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  @Input() tableSource = {
    tableCols: [],
    tableData: {}
  };

  tableCols: string[] = ['date', 'state'];

  tableData = new MatTableDataSource([
    { date: '2024-02-15', state: 'Presente' },
    { date: '2023-07-03', state: 'Ausente' },
    { date: '2023-11-28', state: 'Justificado' },
    { date: '2025-01-09', state: 'Presente' },
    { date: '2024-06-17', state: 'Ausente' },
    { date: '2023-12-12', state: 'Presente' },
    { date: '2023-08-30', state: 'Justificado' },
    { date: '2025-04-04', state: 'Ausente' },
    { date: '2024-03-21', state: 'Presente' },
    { date: '2023-09-19', state: 'Justificado' },
    { date: '2024-01-06', state: 'Ausente' },
    { date: '2025-05-11', state: 'Presente' },
    { date: '2023-02-27', state: 'Justificado' },
    { date: '2024-12-31', state: 'Ausente' },
    { date: '2023-12-01', state: 'Justificado' },
    { date: '2023-10-24', state: 'Presente' },
    { date: '2023-06-23', state: 'Presente' },
    { date: '2025-07-20', state: 'Presente' },
    { date: '2023-03-10', state: 'Ausente' },
    { date: '2024-05-18', state: 'Ausente' },
    { date: '2023-09-22', state: 'Ausente' },
    { date: '2024-08-08', state: 'Ausente' },
    { date: '2024-04-13', state: 'Ausente' },
    { date: '2023-07-25', state: 'Justificado' },
    { date: '2025-06-05', state: 'Presente' },
    { date: '2024-14-07', state: 'Justificado' },
    { date: '2025-10-07', state: 'Presente' }
  ]); // Esta data cambiaría dinámicamente según el rol.

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;

    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit();
  }
}
