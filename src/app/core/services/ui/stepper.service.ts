import { Injectable } from '@angular/core';

/**
 * Servicio que gestiona el estado del paso actual en un componente tipo stepper (paso a paso).
 * Proporciona métodos para avanzar y retroceder entre pasos.
 */
@Injectable({
  providedIn: 'root'
})
export class StepperService {
  public step: number = 1;

  public nextStep(): void {
    this.step++;
  }

  public prevStep(): void {
    if (this.step > 0){
      this.step--;
    }
  }
}
