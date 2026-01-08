import { AttendanceStatus } from '../enums/attendance-status.enum';
import { HttpClient } from '@angular/common/http';

/**
 * Información de asistencias.
 *
 * @remarks
 * Interfaz de lectura, edición y guardado de datos.
 *
 * @see {@link HttpClient.get} - Método GET (leer) de HttpClient.
 * @see {@link HttpClient.put} - Método PUT (editar) de HttpClient.
 * @see {@link HttpClient.post} - Método POST (guardar) de HttpClient.
 */
export interface Attendance {
  id?: number;
  enrollment_id: number;
  attendance_date: string | Date;
  attendance_status: AttendanceStatus;
  attendance_notes: string | null;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}
