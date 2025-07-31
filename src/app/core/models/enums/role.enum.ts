import { LoginComponent } from './../../../pages/auth/login/login.component';
import { SidebarComponent } from './../../../shared/components/sidebar/sidebar.component';
import { Modal } from './../interfaces/structural/interfaces/modal.interface';
/**
 * Enum que define los tipos de roles del usuario.
 *
 * @remarks
 * Este Enum es utilizado para establecer tipos fijos de rol de usuario,
 * y es utilizado en componentes como {@link Modal}, {@link SidebarComponent}, y demás
 * componentes que requieren de la separación de lógica según el rol.
 *
 * @example
 * ```ts
 * if(role === Role.Student){}
 * ```
 *
 * @see {@link SidebarComponent} - Componente que utiliza la distinción entre roles.
 * @see {@link LoginComponent} - Componente que utiliza la distinción entre roles.
 */
export enum Role {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
}
