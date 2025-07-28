import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatIconModule } from "@angular/material/icon";
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  dialog = inject(MatDialog);

  isMinimumAttendance = false;
  role = environment.userRole;
  @Input() cardImageUrl: string = "assets/images/blank-profile.webp";
  @Input() cardTitle: string = "Título";
  @Input() cardSubtitle: string = "Subtítulo";
  @Input() cardPercentageLabel: string = "Porcentaje de asistencias";
  @Input() cardPercentage: number = 100;
  @Input() cardDateLabel: string = "Última asistencia";
  @Input() cardDate: Date | string = "01/01/1999"; //string está mal pero es provisorio

  /**
   * Acá estos datos se obtendrían desde un service o un repository.
   * Sería crear funciones que retornen un array de las columnas y un objeto correspondientemente.
   * Podría usarse Factory Method???
   */
  tableCols = [];
  tableData = {};

    openModal(){
      this.dialog.open(ModalComponent, {
        data: {
          cardImageUrl: this.cardImageUrl,
          cardTitle: this.cardTitle,
          cardSubtitle: this.cardSubtitle,
          cardPercentageLabel: this.cardPercentageLabel,
          cardPercentage: this.cardPercentage,
          cardDateLabel: this.cardDateLabel,
          cardDate: this.cardDate,
          tableCols: this.tableCols,
          tableData: this.tableData
        },
        width: '600px',
        height: '600px',
      });
    }

}
