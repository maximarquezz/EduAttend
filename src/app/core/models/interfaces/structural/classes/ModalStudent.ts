import { Role } from './../../../enums/role.enum';
import { environment } from './../../../../../../environments/environment.development';
import { ModalFactory } from './../../../../factories/ModalFactory';
import { ModalComponent } from './../../../../../shared/components/modal/modal.component';
import { Modal } from "../interfaces/modal.interface";

/**
 * Clase que obtiene los datos de un estudiante en específico y los formatea.
 *
 * @remarks
 * Esta clase extiende de la interfaz {@link Modal} para sobreescribir el método **retrieveData()**
 * y construir una estructura de datos del estudiante que sea fácil de recibir para {@link ModalComponent}.
 * Sin embargo, al utilizarse Factory Method, esta clase no conoce el {@link ModalComponent} que lo está implementando,
 * de eso se encarga {@link ModalFactory}. Por último, su implementación dependerá única y exclusivamente del rol establecido
 * dentro de {@link environment} en base al Enum correspondiente.
 *
 * @example
 * ```ts
 * case Role.Student:
 *    return new ModalStudent();
 * ```
 *
 * @see {@link Role} - El Enum de roles de usuario que define qué tipo de {@link Modal} se instancia.
 * @see {@link environment} - El entorno que centraliza el rol del usuario temporalmente.
 */
export class ModalStudent implements Modal {
  retrieveData() {
    return {
      modalCols: ['date', 'state'],
      modalData: [
        { date: '2024-02-15', state: 'Presente' },
        { date: '2023-07-03', state: 'Ausente' },
        { date: '2023-11-28', state: 'Justificado' },
        { date: '2025-01-09', state: 'Presente' },
        { date: '2024-06-17', state: 'Ausente' },
        { date: '2023-12-12', state: 'Presente' },
        { date: '2023-08-30', state: 'Justificado' },
        { date: '2025-04-04', state: 'Ausente' },
        { date: '2024-03-21', state: 'Presente' }
      ]
    };
  }
}
