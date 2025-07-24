import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card-compact',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './card-compact.component.html',
  styleUrl: './card-compact.component.scss'
})
export class CardCompactComponent {
  dialog = inject(MatDialog);

  isMinimumAttendance = false;
  @Input() cardImageUrl: string = "assets/images/blank-profile.webp";
  @Input() cardTitle: string = "Título";
  @Input() cardSubtitle: string = "Subtítulo";
  @Input() cardPercentageLabel: string = "Porcentaje de asistencias";
  @Input() cardPercentage: number = 100;
  @Input() cardDateLabel: string = "Última asistencia";
  @Input() cardDate: Date | string = "01/01/1999"; //string está mal pero es provisorio

    openModal(){
      this.dialog.open(ModalComponent, {
        data: {
          cardImageUrl: this.cardImageUrl,
          cardTitle: this.cardTitle,
          cardSubtitle: this.cardSubtitle,
          cardPercentageLabel: this.cardPercentageLabel,
          cardPercentage: this.cardPercentage,
          cardDateLabel: this.cardDateLabel,
          cardDate: this.cardDate
        },
        width: '400px',
        height: '500px',
      });
    }

}
