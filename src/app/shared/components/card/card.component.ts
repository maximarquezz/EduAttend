import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatIconModule } from "@angular/material/icon";
import { environment } from '../../../../environments/environment.development';
import { ModalFactory } from '../../../core/factories/ModalFactory';
import { Role } from '../../../core/models/enums/role.enum';

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
  modalFactory = inject(ModalFactory);

  role = environment.userRole as Role;
  tableCols: any;
  tableData: any;
  isMinimumAttendance = false;

  constructor() {
    const modal = this.modalFactory.createModalData(this.role);
    const { modalCols, modalData } = modal.retrieveData();
    this.tableCols = modalCols;
    this.tableData = modalData;
  }

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
          cardDate: this.cardDate,
          tableCols: this.tableCols,
          tableData: this.tableData
        },
        width: '600px',
        height: '600px',
      });
    }

}
