import { Component, inject, Input } from '@angular/core';
import { Status } from '../../../core/models/enums/attendance-status.enum';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  @Input() name!: string;
  Status = Status;
  status: Status = Status.Absent;
  statusStep: number = 0;

  toggleStatus() {
    console.log(this.statusStep);
    this.statusStep++;
    if (this.statusStep === 1) {
      this.status = Status.Absent;
    } else if (this.statusStep === 2) {
      this.status = Status.Present;
    } else if (this.statusStep === 3) {
      this.status = Status.Justified;
    } else {
      this.statusStep = 0;
    }
  }
}
