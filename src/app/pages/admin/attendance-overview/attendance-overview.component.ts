import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { CardComponent } from "../../../shared/components/card/card.component";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: 'app-attendance-overview',
  imports: [MatCardModule, CardComponent, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatButtonModule],
  templateUrl: './attendance-overview.component.html',
  styleUrl: './attendance-overview.component.scss'
})
export class AttendanceOverviewComponent {

}
