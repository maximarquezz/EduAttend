import { Role } from '../app/core/models/enums/role.enum';

/**
 * Variables de entorno públicas y accesibles para desarrollo.
 *
 * @remarks
 * Define una serie de variables que cumplen el rol de centralizar ciertos valores específicos
 * para poder utilizarlos a lo largo de la aplicación sin depender de "magic strings".
 *
 * @example
 * ```ts
 * role = environment.userRole;
 * ```
 *
 * @see {@link Role} - El Enum de roles de usuario que define qué tipo de {@link Modal} se instancia.
 */
export const environment = {
  userRole: Role.Teacher,
  apiUrl: 'http://127.0.0.1:8000/api',
};
