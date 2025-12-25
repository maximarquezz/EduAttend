// Angular Imports
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  private registerService = inject(RegisterService);
  private localitiesService = inject(LocalitiesService);
  private snackBar = inject(MatSnackBar);

  provinces: Province[] = [];
  availableCities: City[] = [];
  filteredProvinces!: Observable<Province[]>;
  filteredCities!: Observable<City[]>;

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
        provinceInput: [''],
        city: ['', Validators.required],
        cityInput: [''],

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
  }

  ngOnInit() {
    this.loadProvinces();
    this.setupAutocomplete();
  }

  setupAutocomplete() {
    // Filtro de provincias
    this.filteredProvinces = this.registerForm
      .get('provinceInput')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProvinces(value || ''))
      );

    // Filtro de ciudades
    this.filteredCities = this.registerForm.get('cityInput')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCities(value || ''))
    );

    // Escuchar cambios en province para actualizar ciudades
    this.registerForm.get('province')?.valueChanges.subscribe((provinceId) => {
      this.onProvinceChange(provinceId);
    });
  }

  private _filterProvinces(value: string): Province[] {
    const filterValue = value.toLowerCase();
    return this.provinces.filter((province) =>
      province.nombre.toLowerCase().includes(filterValue)
    );
  }

  private _filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.availableCities.filter((city) =>
      city.nombre.toLowerCase().includes(filterValue)
    );
  }

  loadProvinces() {
    this.localitiesService.getProvinces().subscribe({
      next: (response: any) => {
        this.provinces = response.provincias || [];
      },
      error: (error) => {
        console.error('Error al cargar provincias:', error);
        this.showErrorSnackbar('Error al cargar las provincias');
      },
    });
  }

  onProvinceChange(provinceId: string) {
    if (provinceId) {
      this.registerForm.patchValue({ city: '', cityInput: '' });
      this.localitiesService.getCities(provinceId).subscribe({
        next: (response: any) => {
          this.availableCities = response.localidades || [];
        },
        error: (error) => {
          console.error('Error al cargar ciudades:', error);
          this.availableCities = [];
          this.showErrorSnackbar('Error al cargar las ciudades');
        },
      });
    } else {
      this.availableCities = [];
    }
  }

  onProvinceSelected(provinceId: string) {
    this.registerForm.patchValue({ province: provinceId });
  }

  onCitySelected(cityId: number) {
    this.registerForm.patchValue({ city: cityId });
  }

  displayProvince(provinceId: string): string {
    if (!provinceId) return '';
    const province = this.provinces.find((p) => p.id === provinceId);
    return province ? province.nombre : '';
  }

  displayCity(cityId: number): string {
    if (!cityId) return '';
    const city = this.availableCities.find((c) => c.id === cityId);
    return city ? city.nombre : '';
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
            this.showSuccessSnackbar('¡Registro exitoso!');
            this.stepper.nextStep();
          },
          error: (error) => {
            console.error('Error en el registro:', error);
            this.handleRegistrationError(error);
          },
        });
    }
  }

  handleRegistrationError(error: any) {
    let errorMessage = 'Error al registrar. Intente nuevamente.';

    if (error.error?.errors) {
      const errors = error.error.errors;

      if (errors.email) {
        errorMessage =
          'El email ya está registrado. Por favor, utilice otro email.';
        this.stepper.step = 2;
        this.registerForm.get('email')?.setErrors({ serverError: true });
      } else if (errors.dni) {
        errorMessage = 'El DNI ya está registrado.';
        this.stepper.step = 1;
        this.registerForm.get('dni')?.setErrors({ serverError: true });
      } else if (errors.phone) {
        errorMessage = 'El teléfono ya está registrado.';
        this.stepper.step = 2;
        this.registerForm.get('phone')?.setErrors({ serverError: true });
      } else {
        const firstError = Object.values(errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      }
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'No se pudo conectar con el servidor';
    } else if (error.status === 500) {
      errorMessage = 'Error del servidor. Intente más tarde.';
    }

    this.showErrorSnackbar(errorMessage);
  }

  showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  getFormattedData() {
    const formValue = this.registerForm.value;

    const selectedProvince = this.provinces.find(
      (p) => p.id === formValue.province
    );

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
