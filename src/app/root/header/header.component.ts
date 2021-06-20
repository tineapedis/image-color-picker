import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLight = true;
  isDrawerOpened = false;
  shouldHideMenu = false;
  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

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

  onClickThemeToggleButton() {
    this.commonService.updateTheme();
  }

  onClickMenuButton() {
    this.isDrawerOpened = !this.isDrawerOpened;
    this.commonService.toggleDrawer();
  }
}
