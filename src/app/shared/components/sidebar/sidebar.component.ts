// Angular Imports
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Material Imports
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

// Services Imports
import { ToggleService } from '../../../core/services/ui/toggle.service';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public toggle: ToggleService){}

  role = 'student';
}
