import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  template: `<app-login></app-login>`,
  styles: ``
})
export class AppComponent {
  title = 'EduAttend';
}
