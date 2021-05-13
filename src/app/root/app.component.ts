import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav/drawer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  colorCode = { rgb: '0,0,0', hex: '#FFFFFF' };
  toolBoxes = this.commonService.toolBoxes;
  isLight = true;
  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.subscription = this.commonService.colorCodeObserver$.subscribe(
      (colorCode) => {
        this.colorCode = colorCode;

        const circleClor = document.getElementById('circle-color');
        if (circleClor) {
          circleClor.style.backgroundColor = colorCode.hex;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.commonService.setDrawer(this.drawer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
