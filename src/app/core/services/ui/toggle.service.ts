import { Injectable } from '@angular/core';
import { ResizeObserverService } from './resize-observer.service'; // ajustá el path
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  isToggled = false;
  private resizeSub!: Subscription;

  constructor(private resizeObserver: ResizeObserverService) {
    this.resizeSub = this.resizeObserver.resize$.subscribe(({ size }) => {
      if (size === 'md' || size === 'lg' || size === 'xl' || size === 'xxl') {
        this.isToggled = true;
      } else if (size === 'xs' || size === 'sm') {
        this.isToggled = false;
      }
    });
  }

  toggleElement() {
    this.isToggled = !this.isToggled;
  }
}
