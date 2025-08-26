import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RoleDisplay'
})
export class RoleDisplayPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'STUDENT': return 'Estudiante';
      case 'TEACHER': return 'Profesor';
      case 'ADMIN': return 'Administrador';
      default: return value;
    }
  }
}
