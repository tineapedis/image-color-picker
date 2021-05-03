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
  isLight = true;
  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.commonService.setDrawer(this.drawer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
