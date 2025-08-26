// Angular Imports
import { Component, inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Services Imports
import { RouterLinksService } from './../../../core/services/navigation/router-links.service';
import { StepperService } from '../../../core/services/ui/stepper.service';
import { MatDivider } from "@angular/material/divider";

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
    MatDivider
],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})

export class PasswordRecoveryComponent {
  routerLinks = inject(RouterLinksService);
  stepper = inject(StepperService);
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    metodo: this.fb.control('', Validators.required)
  })

  onSubmit(){
    this.stepper.step = (Number)(this.form.value.metodo);
  }

  ngOnDestroy() {
    this.stepper.step = 1;
  }
}
