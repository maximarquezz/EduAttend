import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AttendanceStatus } from '../../../core/models/enums/attendance-status.enum';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent implements OnInit {
  @Input() initialStatus: AttendanceStatus = AttendanceStatus.PRESENTE;
  @Output() statusChange = new EventEmitter<AttendanceStatus>();

  Status = AttendanceStatus;
  status: AttendanceStatus = AttendanceStatus.PRESENTE;

  ngOnInit() {
    this.status = this.initialStatus;
  }

  get statusClass(): string {
    return (
      {
        [AttendanceStatus.JUSTIFICADO]: 'justifiedBg',
        [AttendanceStatus.PRESENTE]: 'presentBg',
        [AttendanceStatus.AUSENTE]: 'absentBg',
        [AttendanceStatus.TARDE]: 'lateBg',
      }[this.status] || 'presentBg'
    );
  }

  get statusName(): string {
    return (
      {
        [AttendanceStatus.JUSTIFICADO]: 'Justificado',
        [AttendanceStatus.PRESENTE]: 'Presente',
        [AttendanceStatus.AUSENTE]: 'Ausente',
        [AttendanceStatus.TARDE]: 'Tarde',
      }[this.status] || 'Presente'
    );
  }

  toggleStatus() {
    const values = Object.values(AttendanceStatus);
    const currentIndex = values.indexOf(this.status);
    const nextIndex = (currentIndex + 1) % values.length;
    this.status = values[nextIndex];
    this.statusChange.emit(this.status);
  }
}
