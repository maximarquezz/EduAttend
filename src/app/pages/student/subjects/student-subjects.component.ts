import { Component } from '@angular/core';
import { CardCompactComponent } from "../../../shared/components/card-compact/card-compact.component";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-subjects',
  imports: [
    MatCardModule,
    CardCompactComponent,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
],
  templateUrl: './student-subjects.component.html',
  styleUrl: './student-subjects.component.scss'
})
export class StudentSubjectsComponent {
}
