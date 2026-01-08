import { HttpClient } from '@angular/common/http';

/**
 * Información de comisiones.
 *
 * @remarks
 * Interfaz de lectura, edición y guardado de datos.
 *
 * @see {@link HttpClient.get} - Método GET (leer) de HttpClient.
 * @see {@link HttpClient.put} - Método PUT (editar) de HttpClient.
 * @see {@link HttpClient.post} - Método POST (guardar) de HttpClient.
 */
export interface Comission {
  id?: number;
  comission_name: string;
  comission_year: number;
  degree_id: number;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}
