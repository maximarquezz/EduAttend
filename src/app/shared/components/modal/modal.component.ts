import { environment } from './../../../../environments/environment.development';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TitleCasePipe } from '@angular/common';
import { Role } from '../../../core/models/enums/role.enum';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-modal',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TitleCasePipe,
    MatIconModule
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  Role = Role;
  role = environment.userRole as Role;

  tableCols: string[];
  tableData: MatTableDataSource<any>;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      cardImageUrl: string,
      cardTitle: string,
      cardSubtitle: string,
      cardPercentageLabel: string,
      cardPercentage: number,
      cardDateLabel: string,
      cardDate: Date | string,
      tableCols: string[],
      tableData: any[]
    }
  ){
    this.tableCols = data.tableCols;
    this.tableData = new MatTableDataSource(data.tableData);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(){
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;

    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit();
  }

  close() {
    this.dialogRef.close();
  }
}
