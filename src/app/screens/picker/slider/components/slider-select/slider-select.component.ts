import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-slider-select',
  templateUrl: './slider-select.component.html',
  styleUrls: ['./slider-select.component.scss'],
})
export class SliderSelectComponent implements OnInit, AfterViewInit, OnDestroy {
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

  ngOnInit() {}

  ngAfterViewInit() {
    this.subscription = this.colorService.rgbObserver$.subscribe((rgb) => {
      this.sliderRed.value = rgb.red;
      this.sliderGreen.value = rgb.green;
      this.sliderBlue.value = rgb.blue;
      this.sliderCyan.value = this.colorService.cmykNatural.cyan;
      this.sliderMagenta.value = this.colorService.cmykNatural.magenta;
      this.sliderYellow.value = this.colorService.cmykNatural.yellow;
      this.sliderKeyPlate.value = this.colorService.cmykNatural.keyPlate;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  onChangeCyanSlider(event: any) {
    this.colorService.updateCyan(event.value);
  }

  onChangeMagentaSlider(event: any) {
    this.colorService.updateMagenta(event.value);
  }

  onChangeYellowSlider(event: any) {
    this.colorService.updateYellow(event.value);
  }

  onChangeKeyPlateSlider(event: any) {
    this.colorService.updateKeyPlate(event.value);
  }
}
