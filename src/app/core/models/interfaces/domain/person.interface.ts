export interface Person {
  id: number,
  person_name: string,
  person_email: string,
  person_phone: number,
  person_dni: number,
  person_password: string,
  person_address: string,
  city_id: number,
  role_id: number,
  created_at: string | Date | null,
  updated_at: string | Date | null
}
