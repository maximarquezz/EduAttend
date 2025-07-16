import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Servicio que gestiona las redirecciones a diferentes componentes de la aplicación,
 * proporcionando métodos públicos a los demás componentes.
 */
@Injectable({
  providedIn: 'root'
})
export class RouterLinksService {

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

  // Rutas de Teacher
  // Rutas de Admin

}
