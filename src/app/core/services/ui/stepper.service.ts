import { Injectable } from '@angular/core';

/**
 * Servicio que gestiona el estado del paso actual en un componente tipo stepper (paso a paso).
 * Proporciona métodos para avanzar y retroceder entre pasos.
 */
@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor(){}

  step = 1;

  nextStep(){
    this.step++;
  }

  prevStep(){
    if (this.step > 0){
      this.step--;
    }
  }

}
