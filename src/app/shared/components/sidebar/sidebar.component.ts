import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ToggleService } from '../../../core/services/ui/toggle.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { mapSidebarMenu } from './sidebar.mapper';
import { SidebarMenuItem } from './sidebar.model';
import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  toggle = inject(ToggleService);

  role!: Role;
  userName: string | null = '';
  menu: SidebarMenuItem[] = [];

  ngOnInit(): void {
    this.initUserName();
    this.initUserRole();
    this.initMenu();
  }

  closeSession(): void {
    this.authService.logout().subscribe();
  }

  private initUserRole() {
    this.role = this.authService.getUserRole();
  }

  private initUserName() {
    this.userName = this.authService.getUsername();
  }

  private initMenu(): void {
    this.menu = mapSidebarMenu(this.role);
  }
}
