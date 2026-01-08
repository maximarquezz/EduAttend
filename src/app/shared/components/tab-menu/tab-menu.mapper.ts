import { AuthService } from '../../../core/services/data/auth.service';
import { TabMenuItem } from './tab-menu.model';
import { Injectable, inject } from '@angular/core';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';

@Injectable({ providedIn: 'root' })
export class TabMenuMapper {
  private readonly routerLinksService = inject(RouterLinksService);
  private readonly authService = inject(AuthService);

  mapTabMenu(role: string): TabMenuItem[] {
    switch (role) {
      case 'estudiante':
        return [
          {
            label: 'Inicio',
            icon: 'home',
            action: () => this.routerLinksService.goToStudentDashboard(),
          },
          {
            label: 'Materias',
            icon: 'menu_book',
            action: () => this.routerLinksService.goToStudentSubjects(),
          },
          {
            label: 'Asistencias',
            icon: 'event_available',
            action: () => this.routerLinksService.goToStudentAttendances(),
          },
          {
            label: 'Salir',
            icon: 'logout',
            action: () => this.authService.logout().subscribe(),
          },
        ];
      case 'profesor':
        return [
          {
            label: 'Inicio',
            icon: 'home',
            action: () => this.routerLinksService.goToTeacherDashboard(),
          },
          {
            label: 'Materias',
            icon: 'groups',
            action: () => this.routerLinksService.goToTeacherSubjects(),
          },
          {
            label: 'Asistencias',
            icon: 'assignment_turned_in',
            action: () => this.routerLinksService.goToTeacherAttendances(),
          },
          {
            label: 'Salir',
            icon: 'logout',
            action: () => this.authService.logout().subscribe(),
          },
        ];
      case 'administrador':
        return [
          {
            label: 'Inicio',
            icon: 'home',
            action: () => this.routerLinksService.goToAdminDashboard(),
          },
          {
            label: 'Asistencias',
            icon: 'assignment_turned_in',
            action: () => this.routerLinksService.goToAttendanceOverview(),
          },
          {
            label: 'Inasistencias',
            icon: 'event_busy',
            action: () => this.routerLinksService.goToJustifyAbsence(),
          },
          {
            label: 'Usuarios',
            icon: 'groups',
            action: () => this.routerLinksService.goToUserList(),
          },
          {
            label: 'Salir',
            icon: 'logout',
            action: () => this.authService.logout().subscribe(),
          },
        ];
      default:
        return [];
    }
  }
}
