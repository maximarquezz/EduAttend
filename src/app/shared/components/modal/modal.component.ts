import { Component, Inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
