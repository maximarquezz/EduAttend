// Angular Imports
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
// Services Imports
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { StepperService } from '../../../core/services/ui/stepper.service';
import { RegisterService } from '../../../core/services/data/register.service';
import { LocalitiesService } from '../../../core/services/data/localities.service';

interface Province {
  id: string;
  nombre: string;
}

interface City {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private registerService = inject(RegisterService);
  private localitiesService = inject(LocalitiesService);

  provinces: Province[] = [];
  availableCities: City[] = [];
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    public routerLinks: RouterLinksService,
    public stepper: StepperService
  ) {
    this.registerForm = this.fb.group(
      {
        // Step 1: Datos personales
        name: ['', [Validators.required, Validators.minLength(2)]],
        surname: ['', [Validators.required, Validators.minLength(2)]],
        dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
        province: ['', Validators.required],
        city: ['', Validators.required],

        // Step 2: Datos de contacto
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

        // Step 3: Datos sensibles
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // Escuchar cambios en province para actualizar ciudades
    this.registerForm.get('province')?.valueChanges.subscribe((provinceId) => {
      this.onProvinceChange(provinceId);
    });
  }

  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces() {
    this.localitiesService.getProvinces().subscribe({
      next: (response: any) => {
        this.provinces = response.provincias || [];
      },
      error: (error) => {
        console.error('Error al cargar provincias:', error);
      },
    });
  }

  onProvinceChange(provinceId: string) {
    if (provinceId) {
      this.registerForm.patchValue({ city: '' });
      this.localitiesService.getCities(provinceId).subscribe({
        next: (response: any) => {
          this.availableCities = response.localidades || [];
        },
        error: (error) => {
          console.error('Error al cargar ciudades:', error);
          this.availableCities = [];
        },
      });
    } else {
      this.availableCities = [];
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  clearField(fieldName: string) {
    this.registerForm.patchValue({ [fieldName]: '' });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);

    if (!field) return '';

    if (field.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (field.hasError('email')) {
      return 'Ingrese un email válido';
    }

    if (field.hasError('minLength')) {
      return `Mínimo ${field.errors?.['minLength'].requiredLength} caracteres`;
    }

    if (field.hasError('pattern')) {
      if (fieldName === 'dni') return 'DNI inválido (7-8 dígitos)';
      if (fieldName === 'phone') return 'Teléfono inválido (10 dígitos)';
    }

    return '';
  }

  nextStep() {
    let isValid = false;

    switch (this.stepper.step) {
      case 1:
        isValid =
          (this.registerForm.get('name')?.valid ?? false) &&
          (this.registerForm.get('surname')?.valid ?? false) &&
          (this.registerForm.get('dni')?.valid ?? false) &&
          (this.registerForm.get('province')?.valid ?? false) &&
          (this.registerForm.get('city')?.valid ?? false);
        break;
      case 2:
        isValid =
          (this.registerForm.get('email')?.valid ?? false) &&
          (this.registerForm.get('address')?.valid ?? false) &&
          (this.registerForm.get('phone')?.valid ?? false);
        break;
      case 3:
        isValid = this.registerForm.valid;
        break;
    }

    if (isValid) {
      this.stepper.nextStep();
    } else {
      this.markStepAsTouched();
    }
  }

  markStepAsTouched() {
    switch (this.stepper.step) {
      case 1:
        ['name', 'surname', 'dni', 'province', 'city'].forEach((field) => {
          this.registerForm.get(field)?.markAsTouched();
        });
        break;
      case 2:
        ['email', 'address', 'phone'].forEach((field) => {
          this.registerForm.get(field)?.markAsTouched();
        });
        break;
      case 3:
        ['password', 'confirmPassword'].forEach((field) => {
          this.registerForm.get(field)?.markAsTouched();
        });
        break;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.getFormattedData();
      const {
        name,
        dni,
        city_name,
        province_name,
        email,
        address,
        phone,
        password,
      } = formData;

      this.registerService
        .register(
          name,
          email,
          phone,
          dni,
          address,
          password,
          city_name,
          province_name
        )
        .subscribe({
          next: (data) => {
            console.log(data);
            this.stepper.nextStep();
          },
          error: (error) => {
            console.error('Error en el registro:', error);
          },
        });
    }
  }

  getFormattedData() {
    const formValue = this.registerForm.value;

    // Buscar el nombre de la provincia seleccionada
    const selectedProvince = this.provinces.find(
      (p) => p.id === formValue.province
    );

    // Buscar el nombre de la ciudad seleccionada
    const selectedCity = this.availableCities.find(
      (c) => c.id === formValue.city
    );

    return {
      name: `${formValue.name} ${formValue.surname}`,
      dni: formValue.dni,
      province_name: selectedProvince?.nombre || '',
      city_id: formValue.city,
      city_name: selectedCity?.nombre || '',
      email: formValue.email,
      address: formValue.address,
      phone: formValue.phone,
      password: formValue.password,
    };
  }

  ngOnDestroy() {
    this.stepper.step = 1;
  }
}
