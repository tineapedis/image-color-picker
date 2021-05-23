import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-image-color-picker',
  templateUrl: './image-color-picker.component.html',
  styleUrls: ['./image-color-picker.component.scss'],
})
export class ImageColorPickerComponent implements OnInit, OnDestroy {
  selectedRGB = '255 255 255';
  pointerRGB = '255 255 255';
  isLight = true;
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onReceiveSelectedColorEvent($eventSelectRGB: RGB) {
    const rgb = $eventSelectRGB;
    this.selectedRGB = `${rgb.red} ${rgb.green} ${rgb.blue}`;
  }

  onReceivePointerColorEvent($eventPointerRGB: RGB) {
    const rgb = $eventPointerRGB;
    this.pointerRGB = `${rgb.red} ${rgb.green} ${rgb.blue}`;
  }
}
