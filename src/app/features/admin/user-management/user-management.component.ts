import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '../../../core/models/enums/role.enum';
import { environment } from '../../../../environments/environment.development';
import { UserRequestComponent } from '../../../shared/components/user-request/user-request.component';
import { MatBadgeModule } from '@angular/material/badge';
import { UsersService } from '../../../core/services/data/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  imports: [
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    UserRequestComponent,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  Role = Role;
  role = environment.userRole;

  // Datos
  pendingUsers: any[] = [];
  allPendingUsers: any[] = [];
  snackBar = inject(MatSnackBar);

  // Paginación
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];

  // Estado
  isLoading = true;
  hasError = false;

  private usersService = inject(UsersService);

  @ViewChildren(UserRequestComponent)
  userRequestComponent!: QueryList<UserRequestComponent>;

  private openSnackBar(
    message: string,
    action = 'Cerrar',
    isError = false
  ): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
    });
  }

  get userRequestsCount(): number {
    return this.allPendingUsers.length;
  }

  ngOnInit() {
    this.loadPendingUsers();
  }

  loadPendingUsers() {
    this.isLoading = true;
    this.hasError = false;
    this.usersService.pendingUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.allPendingUsers =
          Array.isArray(data) && data.length > 0 ? data : [];
        this.updatePaginatedUsers();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando usuarios pendientes:', error);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pendingUsers = this.allPendingUsers.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }

  retry() {
    this.loadPendingUsers();
  }

  acceptUser(userId: number) {
    this.usersService.putUser(userId, { is_acepted: 1 }).subscribe({
      next: (response) => {
        console.log('Usuario aceptado:', response);
        this.openSnackBar('Usuario aceptado correctamente.', 'Cerrar', false);
        this.loadPendingUsers();
      },
      error: (error) => {
        console.error('Error aceptando usuario:', error);
        this.openSnackBar('Error aceptando usuario.', 'Cerrar', true);
      },
    });
  }
}
