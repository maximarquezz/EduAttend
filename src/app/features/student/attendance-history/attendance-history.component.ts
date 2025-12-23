import {
  Component,
  ViewChild,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AttendanceHistoryFacade } from './attendance-history.facade';
import { DatePipe } from '@angular/common';
import { AttendanceTableRow } from '../../../core/models/interfaces/structural/attendance-table-row';

@Component({
  selector: 'app-attendance-history',
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
  ],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.scss',
})
export class AttendanceHistoryComponent implements OnInit {
  private facade = inject(AttendanceHistoryFacade);
  private cdr = inject(ChangeDetectorRef);

  tableCols: string[] = ['date', 'subject', 'state'];
  tableData = new MatTableDataSource<AttendanceTableRow>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadAttendances();
  }

  ngAfterViewInit() {
    this.configTable();
  }

  loadAttendances() {
    this.facade
      .loadRecentAttendances(50)
      .subscribe((rows) => (this.tableData.data = rows));
  }

  configTable() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;

    setTimeout(() => {
      this.sort.active = 'date';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit();
      this.cdr.detectChanges();
    });
  }
}
