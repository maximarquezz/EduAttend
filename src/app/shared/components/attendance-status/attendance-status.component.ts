import { Component, Input } from '@angular/core';
import { AttendanceStatus } from '../../../core/models/enums/attendance-status.enum';

@Component({
  selector: 'app-attendance-status',
  imports: [],
  templateUrl: './attendance-status.component.html',
  styleUrl: './attendance-status.component.scss',
})
export class AttendanceStatusComponent {
  @Input() status!: AttendanceStatus | string;

  get statusClass(): string {
    const map: Record<AttendanceStatus, string> = {
      [AttendanceStatus.PRESENTE]: 'present',
      [AttendanceStatus.AUSENTE]: 'absent',
      [AttendanceStatus.TARDE]: 'late',
      [AttendanceStatus.JUSTIFICADO]: 'justified',
    };
    return map[this.status as AttendanceStatus] || '';
  }

  get statusLabel(): string {
    const map: Record<AttendanceStatus, string> = {
      [AttendanceStatus.PRESENTE]: 'Presente',
      [AttendanceStatus.AUSENTE]: 'Ausente',
      [AttendanceStatus.TARDE]: 'Tarde',
      [AttendanceStatus.JUSTIFICADO]: 'Justificado',
    };
    return map[this.status as AttendanceStatus] || this.status;
  }
}
