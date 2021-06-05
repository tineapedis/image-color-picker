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
  // TODO: CommonServiceから剥がす
  private informationBox: ToolBox = {
    name: 'Color Information',
    tools: [
      { name: 'Simple', caption: 'simple caption', url: '/information/simple' },
      // { name: 'Detail', caption: 'detail caption', url: '' },
    ],
  };
  private pickerToolBox: ToolBox = {
    name: 'Picker',
    tools: [
      {
        name: 'Slider',
        caption: 'Slider Caption',
        url: '/slider',
      },
      // {
      //   name: 'Circle',
      //   caption: 'Circle Caption',
      //   url: '/image-color-picker',
      // },
      {
        name: 'Image Color Picker',
        caption: 'Image Color Picker Caption',
        url: '/image-color-picker',
      },
    ],
  };
  // eslint-disable-next-line
  toolBoxes = [this.informationBox, this.pickerToolBox];

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
