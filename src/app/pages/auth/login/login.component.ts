// Angular Imports
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar Snackbar
// Services Imports
import { RouterLinksService } from './../../../core/services/navigation/router-links.service';
import { environment } from '../../../../environments/environment.development';
import { Role } from '../../../core/models/enums/role.enum';
import { AuthService } from '../../../core/services/data/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  loginForm!: FormGroup;
  Role = Role;
  role = environment.userRole;
  errorMessage: string = '';

  constructor(public routerLinks: RouterLinksService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    let email: string = this.loginForm.get('email')?.value;
    let password: string = this.loginForm.get('password')?.value;

    if (this.loginForm.valid) {
      this.errorMessage = '';

      this.authService.login(email, password).subscribe({
        next: (data) => {
          console.log(data);
          this.storeData(data);
        },
        error: (err) => {
          console.error('Error de login:', err);

          if (err.status === 422) {
            this.errorMessage =
              'Credenciales inválidas. Verifica tu email y contraseña.';
          } else if (err.status === 401) {
            this.errorMessage = 'Email o contraseña incorrectos.';
          } else {
            this.errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
          }

          this.snackBar.open(this.errorMessage, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  storeData(data: any) {
    sessionStorage.setItem('userData', JSON.stringify(data));
    if (data.rol === 'estudiante') {
      this.routerLinks.goToStudentDashboard();
    } else if (data.rol === 'profesor') {
      this.routerLinks.goToTeacherDashboard();
    } else {
      this.routerLinks.goToAdminDashboard();
    }
  }
}
