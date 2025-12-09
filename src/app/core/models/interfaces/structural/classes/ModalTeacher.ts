import { Role } from '../../../enums/role.enum';
import { environment } from '../../../../../../environments/environment.development';
import { ModalFactory } from '../../../../factories/ModalFactory';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { Modal } from '../interfaces/modal.interface';
/**
 * Clase que obtiene los datos de un profesor en específico y los formatea.
 *
 * @remarks
 * Esta clase extiende de la interfaz {@link Modal} para sobreescribir el método **retrieveData()**
 * y construir una estructura de datos del profesor que sea fácil de recibir para {@link ModalComponent}.
 * Sin embargo, al utilizarse Factory Method, esta clase no conoce el {@link ModalComponent} que lo está implementando,
 * de eso se encarga {@link ModalFactory}. Por último, su implementación dependerá única y exclusivamente del rol establecido
 * dentro de {@link environment} en base al Enum correspondiente.
 *
 * @example
 * ```ts
 * case Role.Teacher:
 *    return new ModalTeacher();
 * ```
 *
 * @see {@link Role} - El Enum de roles de usuario que define qué tipo de {@link Modal} se instancia.
 * @see {@link environment} - El entorno que centraliza el rol del usuario temporalmente.
 */
export class ModalTeacher implements Modal {
  retrieveData() {
    return {
      modalCols: ['attendance_date', 'attendance_status', 'attendance_notes'],
      modalData: [], // Ya no usamos datos mock, vienen del backend
    };
  }
}
