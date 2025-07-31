// Angular Imports
import { Component, inject} from '@angular/core';
import { Role } from './../../../core/models/enums/role.enum';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from './../../../../environments/environment.development';

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
    MatCardModule,
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public toggle: ToggleService){}
  Role = Role;
  role = environment.userRole;
}
