import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isLightObserver$;
  private isLightSubject = new BehaviorSubject<boolean>(true);

  constructor() {
    this.isLightObserver$ = this.isLightSubject.asObservable();
  }

  updateTheme() {
    this.isLightSubject.next(!this.isLightSubject.value);
  }
}
