import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/data/auth.service';
import { TabMenuMapper } from './tab-menu.mapper';
import { TabMenuItem } from './tab-menu.model';
import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [MatTabsModule, MatIconModule],
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss',
})
export class TabMenuComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly tabMenuMapper = inject(TabMenuMapper);

  role!: Role;
  userName: string | null = '';
  tabMenu: TabMenuItem[] = [];

  ngOnInit(): void {
    this.initUserName();
    this.initUserRole();
    this.initTabMenu();
  }

  onTabChange(index: number): void {
    this.tabMenu[index]?.action();
  }

  private initUserName() {
    this.userName = this.authService.getUsername();
  }

  private initUserRole() {
    this.role = this.authService.getUserRole();
  }

  private initTabMenu() {
    this.tabMenu = this.tabMenuMapper.mapTabMenu(this.role);
  }
}
