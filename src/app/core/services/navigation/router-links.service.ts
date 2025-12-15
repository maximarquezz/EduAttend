import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Servicio que gestiona las redirecciones a diferentes componentes de la aplicación,
 * proporcionando métodos públicos a los demás componentes.
 * @service
 * @type {RouterLinksService}
 */
@Injectable({
  providedIn: 'root',
})
export class RouterLinksService {
  /**
   * Instancia un objeto de tipo Router que se utilizará para realizar las redirecciones.
   * @param router objeto de tipo Router.
   * @constructor
   */
  constructor(private router: Router) {}

  // Rutas de Login
  public goToLogin(): void {
    this.router.navigate(['public/auth/login']);
  }

  public goToPasswordRecovery(): void {
    this.router.navigate(['public/auth/password-recovery']);
  }

  public goToRegister(): void {
    this.router.navigate(['public/auth/register']);
  }

  // Rutas de Student
  public goToStudentDashboard(): void {
    this.router.navigate(['private/student/dashboard']);
  }

  public goToStudentSubjects(): void {
    this.router.navigate(['private/student/subjects']);
  }

  public goToStudentAttendances(): void {
    this.router.navigate(['private/student/attendance-history']);
  }

  // Rutas de Teacher
  public goToTeacherDashboard(): void {
    this.router.navigate(['private/teacher/dashboard']);
  }

  public goToTeacherSubjects(): void {
    this.router.navigate(['private/teacher/subjects']);
  }

  public goToTeacherAttendances(): void {
    this.router.navigate(['private/teacher/attendance-list']);
  }

  // Rutas de Admin
  public goToAdminDashboard(): void {
    this.router.navigate(['private/admin/dashboard']);
  }

  public goToAttendanceOverview() {
    this.router.navigate(['private/admin/attendance-overview']);
  }

  public goToJustifyAbsence() {
    this.router.navigate(['/private/admin/justify-absence']);
  }

  public goToUserList() {
    this.router.navigate(['/private/admin/user-list']);
  }
}
