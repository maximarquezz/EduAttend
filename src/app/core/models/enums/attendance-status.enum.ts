/**
 * Enum que define los tipos de estado de asistencia de un usuario.
 *
 * @remarks
 * Este Enum es utilizado para establecer tipos fijos de los posibles
 * estados de la asistencia un usuario, y es usado en componentes que requieran
 * del manejo de diferentes estados de un usuario en referencia al tipo de asistencia.
 *
 * @example
 * ```
 * status: Status = Status.AUSENTE;
 * ```
 */
export enum AttendanceStatus {
  PRESENT = 'PRESENTE',
  AUSENTE = 'AUSENTE',
  JUSTIFICADO = 'JUSTIFICADO',
}
