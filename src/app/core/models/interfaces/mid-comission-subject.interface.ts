import { HttpClient } from '@angular/common/http';

/**
 * Información de intersección entre comisiones y materias.
 *
 * @remarks
 * Interfaz de lectura, edición y guardado de datos.
 *
 * @see {@link HttpClient.get} - Método GET (leer) de HttpClient.
 * @see {@link HttpClient.put} - Método PUT (editar) de HttpClient.
 * @see {@link HttpClient.post} - Método POST (guardar) de HttpClient.
 */
export interface MidComissionSubject {
  id?: number;
  subject_id: number;
  comission_id: number;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}
