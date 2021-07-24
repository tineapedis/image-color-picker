import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  isLightObserver$;
  shouldHideMenuObserver$;
  private isLightSubject = new BehaviorSubject<boolean>(true);
  private shouldHideMenuSubject = new BehaviorSubject<boolean>(false);
  private drawer: MatDrawer | undefined;
  // TODO: CommonServiceから剥がす
  private informationBox: ToolBox = {
    name: 'Information',
    tools: [
      {
        name: 'Simple',
        caption:
          'In addition to the color code, it provides simple information such as the color name.',
        url: '/information/simple',
      },
      // { name: 'Detail', caption: 'detail caption', url: '' },
    ],
  };
  private pickerToolBox: ToolBox = {
    name: 'Picker',
    tools: [
      {
        name: 'Slider',
        caption: 'Adjust the RGB or CMYK slider to get the color.',
        url: '/slider',
      },
      // {
      //   name: 'Circle',
      //   caption: 'Circle Caption',
      //   url: '/image-color-picker',
      // },
      {
        name: 'Image Color Picker',
        caption:
          'You can specify any part of the image and get the color code.',
        url: '/image-color-picker',
      },
    ],
  };
  private chartToolBox = {
    name: 'Chart',
    tools: [
      { name: 'Hue', caption: 'Hue Caption', url: '/chart/hue' },
      {
        name: 'Saturation',
        caption: 'Saturation Caption',
        url: '/chart/saturation',
      },
      {
        name: 'Brightness',
        caption: 'Brightness Caption',
        url: '/chart/brightness',
      },
    ],
  };
  // eslint-disable-next-line
  toolBoxes = [this.informationBox, this.pickerToolBox, this.chartToolBox];

  constructor() {
    this.isLightObserver$ = this.isLightSubject.asObservable();
    this.shouldHideMenuObserver$ = this.shouldHideMenuSubject.asObservable();
  }

  updateTheme() {
    this.isLightSubject.next(!this.isLightSubject.value);
  }

  showMenu() {
    this.shouldHideMenuSubject.next(false);
  }
  hideMenu() {
    this.shouldHideMenuSubject.next(true);
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
