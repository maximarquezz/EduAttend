import { Component, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from '../../../shared/components/user/user.component';
import { Role } from '../../../core/models/enums/role.enum';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TitleCasePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  imports: [
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    TitleCasePipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  Role = Role;
  role = environment.userRole;

  // columnas estáticas - añadimos 'actions' al final
  tableCols: string[] = ['nombre', 'rol', 'documento', 'actions'];

  // registros estáticos (sin cambios)
  tableData = new MatTableDataSource([
    { nombre: 'Maximiliano Márquez', rol: 'Estudiante', documento: '45168933' },
    { nombre: 'Juan Pérez', rol: 'Profesor', documento: '45168933' },
    { nombre: 'Ana Gómez', rol: 'Administrador', documento: '45168933' },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
    this.sort.active = 'nombre';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit();
  }

  // Métodos para manejar las acciones
  editUser(user: any) {
    console.log('Editando usuario:', user);
    // Aquí iría la lógica para editar
  }

  deleteUser(user: any) {
    console.log('Eliminando usuario:', user);
    // Aquí iría la lógica para eliminar
  }

  viewUser(user: any) {
    console.log('Viendo usuario:', user);
    // Aquí iría la lógica para ver detalles
  }
}
