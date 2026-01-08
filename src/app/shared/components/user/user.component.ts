import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Role } from '../../../core/models/enums/role.enum';

@Component({
  selector: 'app-user',
  imports: [MatExpansionModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() userName: string = 'Sin nombre';
  @Input() userRole!: Role;
  @Input() userData: any[] = [];
}
