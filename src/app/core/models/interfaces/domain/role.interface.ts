export interface Role {
  id: number,
  role_name: string // TODO: Cambiar tipo string a Enum "Role" (renombrar a RoleEnum).
  created_at: string | Date | null,
  updated_at: string | Date | null
}
