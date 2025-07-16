// Angular Imports
import { Component, OnDestroy } from '@angular/core';

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
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  constructor(public toggle: ToggleService){}

  role = 'student';

  ngOnDestroy(): void {
    this.toggle.isToggled = false;
  }

}
