import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-slider-select',
  templateUrl: './slider-select.component.html',
  styleUrls: ['./slider-select.component.scss'],
})
export class SliderSelectComponent implements OnInit, AfterViewInit {
  @ViewChild('sliderRed') sliderRed!: MatSlider;
  @ViewChild('sliderGreen') sliderGreen!: MatSlider;
  @ViewChild('sliderBlue') sliderBlue!: MatSlider;
  @ViewChild('sliderCyan') sliderCyan!: MatSlider;
  @ViewChild('sliderMagenta') sliderMagenta!: MatSlider;
  @ViewChild('sliderYellow') sliderYellow!: MatSlider;
  @ViewChild('sliderKeyPlate') sliderKeyPlate!: MatSlider;
  colorService: ColorService;
  private subscription!: Subscription;

  constructor(colorService: ColorService) {
    this.colorService = colorService;
  }

  ngOnInit() {
    // this.subscription = this.colorService.rgbObserver$.subscribe(
    //   (rgb) => {
    //     this.sliderRed.value = rgb.red
    //   }
    // );
  }

  ngAfterViewInit() {
    this.sliderRed.value = this.colorService.rgb.red;
    this.sliderGreen.value = this.colorService.rgb.green;
    this.sliderBlue.value = this.colorService.rgb.blue;

    this.sliderCyan.value = this.colorService.cmyk.cyan;
    this.sliderMagenta.value = this.colorService.cmyk.magenta;
    this.sliderYellow.value = this.colorService.cmyk.yellow;
    this.sliderKeyPlate.value = this.colorService.cmyk.keyPlate;
  }

  onChangeRedSlider(event: any) {
    this.colorService.updateRed(event.value);
  }
  onChangeGreenSlider(event: any) {
    this.colorService.updateGreen(event.value);
  }
  onChangeBlueSlider(event: any) {
    this.colorService.updateBlue(event.value);
  }

  onChangeCyanSlider(event: any) {}
}
