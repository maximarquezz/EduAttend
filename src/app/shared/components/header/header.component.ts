// header.component.ts
import { Component, inject, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../core/services/data/auth.service';
import { MatDivider } from '@angular/material/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TitleCasePipe,
    MatDivider,
    BreadcrumbModule,
    MatCardModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  role: string = '';
  userName: string | null = '';
  userAvatar: string = '';
  sectionTitle: string = '';
  sectionDescription: string = '';

  ngOnInit() {
    this.updateRouteData();
    this.initUserRole();
    this.initUsername();
    this.initUserAvatar();
    this.initSectionData();
  }

  closeSession() {
    this.authService.logout();
  }

  private initUserRole() {
    this.role = this.authService.getUserRole();
  }

  private initUsername() {
    this.userName = this.authService.getUsername();
  }

  private initUserAvatar() {
    this.userAvatar = this.authService.getUserAvatar();
  }

  private initSectionData(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let activeRoute = this.route;

        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }

        this.sectionTitle = activeRoute.snapshot.data['title'] || 'Dashboard';
        this.sectionDescription =
          activeRoute.snapshot.data['description'] ||
          'Estadísticas sobre tus asistencias.';
      });
  }

  private updateRouteData() {
    let activeRoute = this.route;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    this.sectionTitle = activeRoute.snapshot.data['title'] || 'Dashboard';
    this.sectionDescription = activeRoute.snapshot.data['description'] || '';
  }
}
