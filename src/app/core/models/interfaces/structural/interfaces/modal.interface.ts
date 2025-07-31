import { ModalFactory } from './../../../../factories/ModalFactory';
/**
 * Interfaz que proporciona una estructura para el formateo de datos obtenidos.
 *
 * @remarks
 * Define un método a sobreescribir, el cual contiene dos objetos modalCols y modalData.
 * Estos objetos serán llenados con los datos correspondientes al {@link Role} del usuario, y la
 * distinción entre las clases que lo implementan se realiza en {@link ModalFactory}.
 *
 * @example
 * ```ts
 * export class ModalStudent implements Modal {}
 * ```
 *
 * @see {@link Role} - El Enum de roles de usuario que define qué tipo de {@link Modal} se instancia.
 * @see {@link environment} - El entorno que centraliza el rol del usuario temporalmente.
 */
export interface Modal {
  retrieveData(): {
    modalCols: string[];
    modalData: Record<string, any>[];
  };
}
