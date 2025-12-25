import { TeacherLayoutComponent } from './teacher-layout.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { TabMenuComponent } from '../components/tab-menu/tab-menu.component';
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
  imports: [HeaderComponent, RouterOutlet, FooterComponent, TabMenuComponent],
  template: `
    <!--<app-header></app-header>-->
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>

    <nav class="fixed bottom-0 left-0 w-full z-50">
      <app-tab-menu></app-tab-menu>
    </nav>
    <!--<app-footer></app-footer>-->
  `,
  styles: `
  @use '../styles/breakpoints.scss' as *;
  @use 'sass:map';

  :host {
    display: flex;
    flex-direction: column;
    height: 100dvh;
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 64px; /* espacio para el tab menu */
    background: #d4d4d49d;
  }

  /* DESKTOP */
  @media (min-width: map.get($width-breakpoints, md)) {
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "main"
        "footer";
      height: 100vh;
    }

    app-header {
      grid-area: header;
    }

    .main-content {
      grid-area: main;
    }

    app-footer {
      grid-area: footer;
    }
  }
`,
})
export class StudentLayoutComponent {}
