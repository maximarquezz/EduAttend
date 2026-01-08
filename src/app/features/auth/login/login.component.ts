import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
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
  errorMessage: string = '';
  hidePassword = true;
  hideConfirmPassword = true;

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
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  storeData(data: any) {
    if (data.user.is_acepted === 0) {
      this.snackBar.open(
        'Tu solicitud de registro aún no ha sido aceptada.',
        'Cerrar',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['warning-snackbar'],
        }
      );
      return;
    }

    sessionStorage.setItem('userData', JSON.stringify(data));
    const userRole = data.roles[0];

    console.log('🔍 Rol recibido:', userRole);
    console.log('🔍 Comparación:', userRole === 'administrador');

    if (userRole === 'estudiante') {
      console.log('✅ Redirigiendo a estudiante');
      this.routerLinks.goToStudentDashboard();
    } else if (userRole === 'profesor') {
      console.log('✅ Redirigiendo a profesor');
      this.routerLinks.goToTeacherDashboard();
    } else if (userRole === 'administrador') {
      console.log('✅ Redirigiendo a administrador');
      this.routerLinks.goToAdminDashboard();
    } else {
      console.log('❌ Rol no reconocido:', userRole);
      this.snackBar.open('Rol no reconocido: ' + userRole, 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
