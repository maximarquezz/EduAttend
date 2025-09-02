import { StatusComponent } from './../../../shared/components/status/status.component';
/**
 * Enum que define los tipos de estado de un usuario.
 *
 * @remarks
 * Este Enum es utilizado para establecer tipos fijos de los posibles
 * estados de la asistencia un usuario, y es usado en componentes como {@link StatusComponent},
 * y demás componentes que requieran del manejo de diferentes estados de un usuario
 * en referencia al tipo de asistencia.
 *
 * @example
 * ```
 * status: Status = Status.Absent;
 * ```
 *
 * @see {@link StatusComponent} - Componente que implementa este Enum.
 */
export enum Status {
  Present = 'Presente',
  Absent = 'Ausente',
  Justified = 'Justificado'
}
