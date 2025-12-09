import { environment } from './../../../../environments/environment.development';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TitleCasePipe } from '@angular/common';
import { Role } from '../../../core/models/enums/role.enum';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  Role = Role;
  role = environment.userRole as Role;
  tableCols: string[];
  tableData: MatTableDataSource<any>;

  // Mapa para traducir nombres de columnas
  columnNames: { [key: string]: string } = {
    attendance_date: 'Fecha',
    attendance_status: 'Estado',
    attendance_notes: 'Notas',
    acciones: 'Acciones',
    id: 'ID',
  };

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cardImageUrl: string;
      cardTitle: string;
      cardSubtitle: string;
      cardPercentageLabel: string;
      cardPercentage: number;
      cardDateLabel: string;
      cardDate: Date | string;
      tableCols: string[];
      tableData: any[];
    }
  ) {
    this.tableCols = data.tableCols;
    const safeTableData = Array.isArray(data.tableData) ? data.tableData : [];
    this.tableData = new MatTableDataSource(safeTableData);
  }

  // Método para obtener el nombre de la columna
  getColumnName(col: string): string {
    return this.columnNames[col] || col;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;

    if (this.sort) {
      this.tableData.sort = this.sort;

      // Envolver en setTimeout para evitar el error
      setTimeout(() => {
        if (this.sort) {
          this.sort.active = 'attendance_date';
          this.sort.direction = 'desc';
          this.sort.sortChange.emit();
        }
      });
    }
  }

  // Método para formatear fechas
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  close() {
    this.dialogRef.close();
  }
}
