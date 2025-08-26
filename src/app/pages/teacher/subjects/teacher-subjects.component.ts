import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StatusComponent } from "../../../shared/components/status/status.component";

@Component({
  selector: 'app-teacher-subjects',
  imports: [
    CardComponent,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    StatusComponent
],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './teacher-subjects.component.html',
  styleUrl: './teacher-subjects.component.scss'
})
export class TeacherSubjectsComponent {
}
