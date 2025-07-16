// Angular Imports
import { Component, OnDestroy } from '@angular/core';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';

// Services Imports
import { RouterLinksService } from '../../../core/services/navigation/router-links.service';
import { StepperService } from '../../../core/services/ui/stepper.service';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatStepperModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnDestroy {
  constructor(
    public routerLinks: RouterLinksService,
    public stepper: StepperService
  ){}

  ngOnDestroy() {
    this.stepper.step = 1;
  }
}
