import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/data/auth.service';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';

@Component({
  selector: 'app-tab-menu',
  imports: [MatTabsModule, MatIconModule],
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss',
})
export class TabMenuComponent implements OnInit {
  role: string = '';
  userName: string = '';

  constructor(private authService: AuthService) {}

  routerLinks = inject(RouterLinksService);

  ngOnInit(): void {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.role = parsedData.roles[0];
      this.userName = parsedData.user.name;
    }
  }

  onTabChange(index: number, role: string) {
    if (role === 'estudiante') {
      switch (index) {
        case 0:
          this.routerLinks.goToStudentDashboard();
          break;
        case 1:
          this.routerLinks.goToStudentSubjects();
          break;
        case 2:
          this.routerLinks.goToStudentAttendances();
          break;
        case 3:
          this.logout();
          break;
      }
    } else if (role === 'profesor') {
      switch (index) {
        case 0:
          this.routerLinks.goToTeacherDashboard();
          break;
        case 1:
          this.routerLinks.goToTeacherSubjects();
          break;
        case 2:
          this.routerLinks.goToTeacherAttendances();
          break;
        case 3:
          this.logout();
          break;
      }
    } else if (role === 'administrador') {
      switch (index) {
        case 0:
          this.routerLinks.goToAdminDashboard();
          break;
        case 1:
          this.routerLinks.goToAttendanceOverview();
          break;
        case 2:
          this.routerLinks.goToJustifyAbsence();
          break;
        case 3:
          this.routerLinks.goToUserList();
          break;
        case 4:
          this.logout();
          break;
      }
    }
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
