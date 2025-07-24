import { Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cardImageUrl: string = "assets/images/blank-profile.webp";
  @Input() cardTitle!: string;
  @Input() cardSubtitle!: string;
  @Input() cardPercentageLabel!: string;
  @Input() cardPercentage!: number;
  @Input() cardDateLabel!: string;
  @Input() cardDate!: Date | string; //string está mal pero es provisorio
}
