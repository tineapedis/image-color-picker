import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonService } from '../services/common.service';
import { ColorService } from '../services/color.service';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav/drawer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  toolBoxes = this.commonService.toolBoxes;
  isLight = true;
  shouldHideMenu = false;
  colorService: ColorService;
  private subscription!: Subscription;

  constructor(
    private commonService: CommonService,
    colorService: ColorService
  ) {
    this.colorService = colorService;
  }

  ngOnInit() {
    this.subscription = this.commonService.isLightObserver$.subscribe(
      (isLight) => {
        this.isLight = isLight;
      }
    );
    this.subscription = this.commonService.shouldHideMenuObserver$.subscribe(
      (shouldHideMenu) => {
        this.shouldHideMenu = shouldHideMenu;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.commonService.setDrawer(this.drawer);
    const circleClor = document.getElementById('circle-color');
    this.subscription = this.colorService.rgbObserver$.subscribe((rgb) => {
      if (circleClor) {
        circleClor.style.backgroundColor = this.colorService.convertRgbToHex(
          rgb
        );
      }
    });
  }
}
