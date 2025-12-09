/**
 * Enum que define los tipos de estado de una inscripción.
 *
 * @remarks
 * Este Enum es utilizado para establecer tipos fijos de los posibles
 * estados de la inscripción un usuario, y es usado en diferentes, componentes
 * que requieran del manejo de diferentes estados de un usuario en referencia al tipo de inscripción.
 *
 * @example
 * ```
 * enrollmentStatus: EnrollmentStatus = EnrollmentStatus.ACTIVO;
 * ```
 */
export enum EnrollmentStatus {
  ACTIVO = 'ACTIVO',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}
