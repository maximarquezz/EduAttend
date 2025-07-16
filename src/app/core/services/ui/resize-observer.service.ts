import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, startWith, tap } from 'rxjs';
import { BREAKPOINTS } from '../../constants/breakpoints';

@Injectable({
  providedIn: 'root'
})
export class ResizeObserverService {
  resize$ = fromEvent(window, 'resize').pipe(
      startWith(null),
      debounceTime(100),
      map(_=>{
        if ((window.innerWidth) < BREAKPOINTS.xs)
          return 'xs'
        if ((window.innerWidth) < BREAKPOINTS.sm)
          return 'sm'
        if ((window.innerWidth) < BREAKPOINTS.md)
          return 'md'
        if ((window.innerWidth) < BREAKPOINTS.lg)
          return 'lg'
        if ((window.innerWidth) < BREAKPOINTS.xl)
          return 'xl'
        return 'xxl'
      }),
      distinctUntilChanged(),
      map(x => ({ size: x, width: window.innerWidth })),
      tap(res=>console.log(res))
    )
  constructor() { }
}
