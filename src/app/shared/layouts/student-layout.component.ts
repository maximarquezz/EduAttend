import { TeacherLayoutComponent } from './teacher-layout.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";

/**
 * Componente que funciona como layout para el estudiante.
 *
 * @remarks
 * Este componente genera una estructura y distribución aplicando CSS Grid y los siguientes componentes:
 * - {@link HeaderComponent}.
 * - {@link SidebarComponent}.
 * - {@link RouterOutlet}.
 * - {@link FooterComponent}.
 *
 * @see {@link AdminLayoutComponent} - Componente que funciona como layout para el administrador.
 * @see {@link TeacherLayoutComponent} - Componente que funciona como layout para el profesor.
 */
@Component({
  selector: 'app-student-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
   <app-footer></app-footer>
  `,
  styles: `
    @use '../styles/breakpoints.scss' as *;
    @use 'sass:map';

    @media (min-width: map.get($width-breakpoints, md)) {
      :host {
        display: grid;
        grid-template-rows: auto 1fr auto; // header - main - footer
        grid-template-columns: 1fr 4fr; // sidebar - main
        grid-template-areas:
          "header header"
          "sidebar main"
          "footer footer";
        height: 100vh;
      }

      app-header {
        grid-area: header;
      }

      app-sidebar {
        grid-area: sidebar;
      }

      .main-content {
        grid-area: main;
        overflow-y: auto;
        padding: 20px;
        background: #d4d4d49d;
      }

      app-footer {
        grid-area: footer;
      }
    }
  `
})
export class StudentLayoutComponent {

}
