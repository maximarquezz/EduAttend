import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
// Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
// Services Imports
import { ToggleService } from '../../../core/services/ui/toggle.service';
import { UpperCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/data/auth.service';

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
    UpperCasePipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor(
    public toggle: ToggleService,
    private router: Router,
    private authService: AuthService
  ) {}

  role: string = '';
  userName: string = '';

  ngOnInit() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.role = parsedData.roles[0];
      this.userName = parsedData.user.name;
      console.log('🔍 Rol cargado:', this.role);
    }
  }

  closeSession() {
    this.authService.logout();
  }
}
