// admin-layout.component.ts
import { TeacherLayoutComponent } from './teacher-layout.component';
import { StudentLayoutComponent } from './student-layout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { TabMenuComponent } from '../components/tab-menu/tab-menu.component';

/**
 * Componente que funciona como layout para el administrador.
 *
 * @remarks
 * Este componente genera una estructura y distribución aplicando CSS Grid y los siguientes componentes:
 * - {@link SidebarComponent}.
 * - {@link RouterOutlet}.
 * - {@link TabMenuComponent}.
 *
 * @see {@link StudentLayoutComponent} - Componente que funciona como layout para el estudiante.
 * @see {@link TeacherLayoutComponent} - Componente que funciona como layout para el profesor.
 */
@Component({
  selector: 'app-admin-layout',
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
export class AdminLayoutComponent {}
