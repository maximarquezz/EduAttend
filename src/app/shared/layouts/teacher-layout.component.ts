import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-teacher-layout',
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
        grid-template-columns: 1fr 3fr; // sidebar - main
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
      }

      app-footer {
        grid-area: footer;
      }
    }
  `
})
export class TeacherLayoutComponent {

}
