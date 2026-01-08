import { TeacherLayoutComponent } from './teacher-layout.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { TabMenuComponent } from '../components/tab-menu/tab-menu.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
/**
 * Componente que funciona como layout para el estudiante.
 *
 * @remarks
 * Este componente genera una estructura y distribución aplicando CSS Grid y los siguientes componentes:
 * - {@link HeaderComponent}.
 * - {@link RouterOutlet}.
 * - {@link FooterComponent}.
 *
 * @see {@link AdminLayoutComponent} - Componente que funciona como layout para el administrador.
 * @see {@link TeacherLayoutComponent} - Componente que funciona como layout para el profesor.
 */
@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet, SidebarComponent, TabMenuComponent],
  template: `
    <app-sidebar></app-sidebar>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
    <nav class="tab-menu-container">
      <app-tab-menu></app-tab-menu>
    </nav>
  `,
  styles: `
    @use '../styles/breakpoints.scss' as *;
    @use 'sass:map';

    /* MOBILE */
    :host {
      display: flex;
      flex-direction: column;
      height: 100dvh;
    }

    app-sidebar {
      display: none;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background: var(--mat-sys-background);
      margin-bottom: 64px;
    }

    .tab-menu-container {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 50;
    }

    /* DESKTOP */
    @media (min-width: map.get($width-breakpoints, md)) {
      :host {
        display: grid;
        grid-template-columns: 280px 1fr;
        height: 100vh;
      }

      app-sidebar {
        display: block;
      }

      .main-content {
        margin-bottom: 0;
      }

      .tab-menu-container {
        display: none;
      }
    }
  `,
})
export class StudentLayoutComponent {}
