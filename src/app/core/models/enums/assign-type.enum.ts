/**
 * Enum que define los tipos de asignación de un usuario.
 *
 * @remarks
 * Este Enum es utilizado para establecer tipos fijos de las posibles
 * asignaciones de un usuario a una materia/carrera/comisión, y es usado en diferentes, componentes
 * que requieran del manejo de diferentes asignaciones para hacer distinciones entre tipos de usuario.
 *
 * @example
 * ```
 * assignType: AssignType = AssignType.CURSA;
 * ```
 */
export enum AssignType {
  CURSA = 'CURSA',
  DICTA = 'DICTA',
  PRECEPTOR = 'PRECEPTOR',
}
