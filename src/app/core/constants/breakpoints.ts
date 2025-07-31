/**
 * Describe una serie de pares key/value que representan breakpoints.
 * Los breakpoints se mapean en determinadas partes de la aplicación
 * para realizar acciones dinámicas con la UI y el código TypeScript.
 *
 * @type {Object<string, number>}
 * @example
 * // Usado en el código para definir el tamaño mínimo de pantallas
 * const breakpoint = BREAKPOINTS.md;
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}
