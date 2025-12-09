import { ModalComponent } from './../../shared/components/modal/modal.component';
import { ModalStudent } from '../models/interfaces/structural/classes/ModalStudent';
import { ModalTeacher } from '../models/interfaces/structural/classes/ModalTeacher';
import { ModalAdmin } from '../models/interfaces/structural/classes/ModalAdmin';
import { Modal } from '../models/interfaces/structural/interfaces/modal.interface';
import { Role } from './../models/enums/role.enum';
import { Injectable } from '@angular/core';

/**
 * Servicio que aplica el patrón de diseño creacional **Factory Method**
 * para generar instancias de {@link ModalComponent} según el {@link Role} del usuario.
 *
 * @remarks
 * Este servicio se utiliza para encapsular la lógica de creación de modales
 * específicos para cada tipo de usuario, como {@link ModalStudent},
 * {@link ModalTeacher} y {@link ModalAdmin}.
 *
 * @example
 * ```ts
 * const modal = modalFactory.createModalData(Role.Student);
 * ```
 *
 * @see {@link Modal} - Interfaz base de los modales.
 * @see {@link Role} - Enum que define los distintos roles de usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalFactory {
  /**
   * Crea una instancia concreta de {@link Modal} según el rol del usuario.
   *
   * @param role - El rol del usuario actual.
   * @returns Una implementación concreta de {@link Modal}.
   * @throws Error si el rol no está soportado o no tiene implementación.
   */
  createModalData(role: Role): Modal {
    switch (role) {
      case Role.Student:
        return new ModalStudent();
      case Role.Teacher:
        return new ModalTeacher();
      case Role.Admin:
        return new ModalAdmin();
      default:
        throw new Error("Factory Method Error: Invalid enum input");
    }
  }
}
