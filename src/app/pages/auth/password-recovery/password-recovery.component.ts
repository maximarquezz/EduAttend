// Angular Imports
import { Component, OnDestroy } from '@angular/core';

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
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})

export class PasswordRecoveryComponent implements OnDestroy {
  constructor(
    public routerLinks: RouterLinksService,
    public stepper: StepperService
  ){}

  ngOnDestroy() {
    this.stepper.step = 1;
  }
}
