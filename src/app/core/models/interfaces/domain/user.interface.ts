export interface User {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: number | null;
  password: string;
  phone: number;
  dni: number;
  address: string;
  province_name: string;
  city_name: string;
  is_acepted?: boolean | null;
  created_at?: string | Date | null;
  updated_at?: string | Date | null;
}
