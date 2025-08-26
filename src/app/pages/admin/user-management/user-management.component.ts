import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { Role } from '../../../core/models/enums/role.enum';
import { environment } from '../../../../environments/environment.development';
import { UserRequestComponent } from "../../../shared/components/user-request/user-request.component";
import { MatBadgeModule } from "@angular/material/badge";

@Component({
  selector: 'app-user-management',
  imports: [
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    UserRequestComponent
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  Role = Role;
  role = environment.userRole;

  @ViewChildren(UserRequestComponent) userRequestComponent!: QueryList<UserRequestComponent>;
  userRequestsCount = 0;

  ngAfterViewInit(){
    this.userRequestsCount = this.userRequestComponent.length;
  }
}
