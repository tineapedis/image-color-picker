import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isLightObserver$;
  private isLightSubject = new BehaviorSubject<boolean>(true);
  private drawer: MatDrawer | undefined;

  constructor() {
    this.isLightObserver$ = this.isLightSubject.asObservable();
  }

  updateTheme() {
    this.isLightSubject.next(!this.isLightSubject.value);
  }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggleDrawer(): void {
    if (this.drawer === undefined) {
      return;
    }
    this.drawer.toggle();
  }
}
