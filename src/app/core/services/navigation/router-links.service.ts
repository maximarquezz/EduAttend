import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Servicio que gestiona las redirecciones a diferentes componentes de la aplicación,
 * proporcionando métodos públicos a los demás componentes.
 * @service
 * @type {RouterLinksService}
 */
@Injectable({
  providedIn: 'root'
})
export class RouterLinksService {

  /**
   * Instancia un objeto de tipo Router que se utilizará para realizar las redirecciones.
   * @param router objeto de tipo Router.
   * @constructor
   */
  constructor(private router: Router){}

  // Rutas de Login
  goToLogin(){
    this.router.navigate(['public/auth/login']);
  }

  goToPasswordRecovery() {
    this.router.navigate(['public/auth/password-recovery']);
  }

  goToRegister() {
    this.router.navigate(['public/auth/register']);
  }

  // Rutas de Student
  goToStudentDashboard() {
    this.router.navigate(['private/student/dashboard']);
  }

  goToStudentSubjects(){
    this.router.navigate(['private/student/subjects']);
  }

  goToStudentAttendances(){
    this.router.navigate(['private/student/attendance-history']);
  }

  // Rutas de Teacher
  goToTeacherDashboard(){
    this.router.navigate(['private/teacher/dashboard']);
  }

  goToTeacherSubjects(){
    this.router.navigate(['private/teacher/subjects']);
  }

  goToTeacherAttendances(){
    this.router.navigate(['private/teacher/attendance-list']);
  }

  // Rutas de Admin
  goToAdminDashboard(){
    this.router.navigate(['private/admin/dashboard']);
  }
}
