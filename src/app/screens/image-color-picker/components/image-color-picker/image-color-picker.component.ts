import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-image-color-picker',
  templateUrl: './image-color-picker.component.html',
  styleUrls: ['./image-color-picker.component.scss'],
})
export class ImageColorPickerComponent implements OnInit, OnDestroy {
  isLight = true;
  selectedRGB = '255 255 255';
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

  onReceiveSelectedColorEvent($eventSelectRGB: RGB) {
    const rgb = $eventSelectRGB;
    this.selectedRGB = `${rgb.red} ${rgb.green} ${rgb.blue}`;
  }
}
