import { Role } from '../../../enums/role.enum';
import { environment } from '../../../../../../environments/environment.development';
import { ModalFactory } from '../../../../factories/ModalFactory';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
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
      modalCols: ['fecha', 'estado'],
      modalData: [
        { fecha: '2024-02-15', estado: 'Presente' },
        { fecha: '2023-07-03', estado: 'Ausente' },
        { fecha: '2023-11-28', estado: 'Justificado' },
        { fecha: '2025-01-09', estado: 'Presente' },
        { fecha: '2024-06-17', estado: 'Ausente' },
        { fecha: '2023-12-12', estado: 'Presente' },
        { fecha: '2023-08-30', estado: 'Justificado' },
        { fecha: '2025-04-04', estado: 'Ausente' },
        { fecha: '2024-03-21', estado: 'Presente' }
      ]
    };
  }
}
