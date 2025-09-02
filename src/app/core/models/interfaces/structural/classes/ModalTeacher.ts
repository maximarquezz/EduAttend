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
      modalCols: ['fecha', 'alumnos'],
      modalData: [
        {
          fecha: '2025-08-01',
          alumnos: [
            { nombre: 'Maxi', estado: 'Presente' },
            { nombre: 'Laura', estado: 'Ausente' },
            { nombre: 'Pedro', estado: 'Justificado' }
          ]
        },
        {
          fecha: '2025-07-31',
          alumnos: [
            { nombre: 'Ana', estado: 'Presente' },
            { nombre: 'Lucía', estado: 'Presente' },
            { nombre: 'Tomás', estado: 'Ausente' }
          ]
        },
        {
          fecha: '2025-07-30',
          alumnos: [
            { nombre: 'Julián', estado: 'Presente' },
            { nombre: 'Camila', estado: 'Justificado' },
            { nombre: 'Mateo', estado: 'Presente' }
          ]
        },
        {
          fecha: '2025-07-29',
          alumnos: [
            { nombre: 'Florencia', estado: 'Ausente' },
            { nombre: 'Sofía', estado: 'Justificado' },
            { nombre: 'Bruno', estado: 'Presente' }
          ]
        },
        {
          fecha: '2025-07-28',
          alumnos: [
            { nombre: 'Damián', estado: 'Presente' },
            { nombre: 'Carla', estado: 'Presente' },
            { nombre: 'Iván', estado: 'Ausente' }
          ]
        }
      ]
    };
  }
}
