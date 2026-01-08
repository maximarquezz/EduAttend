import { AssignType } from '../enums/assign-type.enum';
import { HttpClient } from '@angular/common/http';

/**
 * Información de asignaciones.
 *
 * @remarks
 * Interfaz de lectura y edición.
 *
 * @see {@link HttpClient.get} - Método GET (leer) de HttpClient.
 * @see {@link HttpClient.put} - Método PUT (editar) de HttpClient.
 */
export interface Assignment {
  id?: number;
  user_id: number;
  mid_comissions_subjects_id: number;
  assign_type: AssignType;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}

/**
 * Información de asignaciones.
 *
 * @remarks
 * Interfaz de guardado de datos, reutiliza el campo "mid_commissions_subjects_id" y "assign_type" pertenecientes
 * a la interfaz Assignment, para no crear una interfaz separada y acoplar la interfaz con el Pick (deseado).
 *
 * @see {@link HttpClient.post} - Método POST (guardar) de HttpClient.
 */
export type AssignmentPost = Pick<
  Assignment,
  'mid_comissions_subjects_id' | 'assign_type'
>;
