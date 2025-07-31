// Angular Imports
import { Component } from '@angular/core';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

// Services Imports
import { RouterLinksService } from './../../../core/services/navigation/router-links.service';
import { environment } from '../../../../environments/environment.development';
import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  constructor(public routerLinks: RouterLinksService){}
  Role = Role;
  role = environment.userRole;
}
