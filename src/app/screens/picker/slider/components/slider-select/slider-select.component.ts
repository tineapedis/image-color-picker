import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { CommonService } from '../../../../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider-select',
  templateUrl: './slider-select.component.html',
  styleUrls: ['./slider-select.component.scss'],
})
export class SliderSelectComponent implements OnInit, AfterViewInit {
  @ViewChild('sliderRed') slider!: MatSlider;
  // color = ColorData
  rgb: RGB = {
    red: 0,
    green: 0,
    blue: 0,
  };
  private subscription!: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    // this.subscription = this.commonService.colorCodeObserver$.subscribe(
    //   (colorCode) => {
    //     this.colorCode = colorCode;
    //     const circleClor = document.getElementById('circle-color');
    //     if (circleClor) {
    //       circleClor.style.backgroundColor = colorCode.hex;
    //     }
    //   }
    // );
    // this.subscription = this.commonService.colorCodeObserver$.subscribe(
    //   (colorCode) => {
    //     colorCode.rgb
    //   }
    // );
  }

  ngAfterViewInit() {
    this.slider.value = this.rgb.red;
  }

  onChangeRedSlider(event: any) {
    this.rgb.red = event.value;
  }
  onChangeGreenSlider(event: any) {
    this.rgb.green = event.value;
  }
  onChangeBlueSlider(event: any) {
    this.rgb.blue = event.value;
  }
}
