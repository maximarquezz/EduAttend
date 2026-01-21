import { Component, inject, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { StepperService } from '../../../core/services/ui/stepper.service';
import { AuthService } from '../../../core/services/data/auth.service';
import { UsersService } from '../../../core/services/data/users.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-password-recovery',
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDivider,
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
  animations: [
    trigger('slideStep', [
      transition(':increment', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate(
          '300ms ease-in-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate(
          '300ms ease-in-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class PasswordRecoveryComponent implements OnDestroy {
  routerLinks = inject(RouterLinksService);
  stepper = inject(StepperService);
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  usersService = inject(UsersService);
  snackBar = inject(MatSnackBar);

  userEmail: string = '';
  userDni: string = '';

  // Formulario para el DNI (paso 1)
  dniForm = this.fb.group({
    dni: this.fb.control('', [Validators.required, Validators.minLength(7)]),
  });

  // Formulario para método de recuperación (paso 2)
  metodoForm = this.fb.group({
    metodo: this.fb.control('', Validators.required),
  });

  // Formulario para el código de verificación
  codeForm = this.fb.group({
    code: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  // Formulario para la nueva contraseña
  passwordForm = this.fb.group({
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    password_confirmation: this.fb.control('', [Validators.required]),
  });

  // Buscar usuario por DNI y avanzar al siguiente paso
  searchUserByDni() {
    if (this.dniForm.invalid) {
      this.showMessage('Por favor ingrese un DNI válido');
      return;
    }

    const dni = this.dniForm.value.dni!;

    // Aquí necesitarías un endpoint en tu backend para buscar usuario por DNI
    // Por ahora simularemos que encontramos el email
    // Deberías agregar este endpoint en tu AuthController:
    // GET /user-by-dni/{dni} que retorne el email del usuario

    this.usersService.getUserByDni(dni).subscribe({
      next: (response: any) => {
        this.userEmail = response.email;
        this.userDni = dni;
        this.stepper.nextStep();
      },
      error: (error: any) => {
        this.showMessage('No se encontró un usuario con ese DNI');
      },
    });
  }

  // Enviar código de recuperación
  sendRecoveryCode() {
    if (this.metodoForm.invalid) {
      this.showMessage('Por favor seleccione un método de recuperación');
      return;
    }

    this.authService.forgotPassword(this.userEmail).subscribe({
      next: (response) => {
        this.showMessage('Código enviado exitosamente');
        this.stepper.step = Number(this.metodoForm.value.metodo);
      },
      error: (error) => {
        this.showMessage('Error al enviar el código. Intente nuevamente.');
      },
    });
  }

  // Verificar código ingresado
  verifyCode() {
    if (this.codeForm.invalid) {
      this.showMessage('Por favor ingrese el código de 6 dígitos');
      return;
    }

    const code = this.codeForm.value.code!;

    this.authService.verifyCode(this.userEmail, code).subscribe({
      next: (response) => {
        this.showMessage('Código verificado correctamente');
        this.stepper.nextStep(); // Ir al paso de nueva contraseña
      },
      error: (error) => {
        this.showMessage('Código inválido o expirado');
      },
    });
  }

  // Resetear contraseña
  resetPassword() {
    if (this.passwordForm.invalid) {
      this.showMessage('Por favor complete todos los campos');
      return;
    }

    if (
      this.passwordForm.value.password !==
      this.passwordForm.value.password_confirmation
    ) {
      this.showMessage('Las contraseñas no coinciden');
      return;
    }

    const code = this.codeForm.value.code!;
    const password = this.passwordForm.value.password!;
    const password_confirmation =
      this.passwordForm.value.password_confirmation!;

    this.authService
      .resetPassword(this.userEmail, code, password, password_confirmation)
      .subscribe({
        next: (response) => {
          this.showMessage('Contraseña actualizada exitosamente');
          setTimeout(() => {
            this.routerLinks.goToLogin();
          }, 2000);
        },
        error: (error) => {
          this.showMessage('Error al actualizar la contraseña');
        },
      });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy() {
    this.stepper.step = 1;
  }
}
