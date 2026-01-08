import { EnrollmentStatus } from '../enums/enrollment-status.enum';
import { HttpClient } from '@angular/common/http';

/**
 * Información de inscripciones.
 *
 * @remarks
 * Interfaz de lectura y edición.
 *
 * @see {@link HttpClient.get} - Método GET (leer) de HttpClient.
 * @see {@link HttpClient.put} - Método PUT (editar) de HttpClient.
 */
export interface Enrollment {
  id?: number;
  user_id: number;
  mid_comission_subject_id: number;
  enrollment_year: number;
  enrollment_status: EnrollmentStatus;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}

/**
 * Información de inscripciones.
 *
 * @remarks
 * Interfaz de guardado de datos, reutiliza el campo "mid_commissions_subjects_id" y "enrollment_year" pertenecientes
 * a la interfaz Enrollment, para no crear una interfaz separada y acoplar la interfaz con el Pick (deseado).
 *
 * @see {@link HttpClient.post} - Método POST (guardar) de HttpClient.
 */
export type EnrollmentPost = Pick<
  Enrollment,
  'mid_comission_subject_id' | 'enrollment_year'
>;
