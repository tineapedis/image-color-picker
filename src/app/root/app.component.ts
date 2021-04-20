import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLight = true;
  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.subscription = this.commonService.isLightObserver$.subscribe(
      (isLight) => {
        this.isLight = isLight;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
