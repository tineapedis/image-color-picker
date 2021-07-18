import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-saturation',
  templateUrl: './saturation.component.html',
  styleUrls: ['./saturation.component.scss'],
})
export class SaturationComponent implements OnInit {
  colorService: ColorService;
  hexList: string[] = [];
  hsl: HSL;

  constructor(colorService: ColorService) {
    this.colorService = colorService;
    this.hsl = colorService.convertRgbToHsl();

    const MAX = 24;
    for (let i = 0; i < MAX; i++) {
      const saturation = i * (100 / MAX);
      const rgb = this.colorService.convertHslToRgb({
        hue: this.hsl.hue,
        saturation,
        lightness: this.hsl.lightness,
      });
      this.hexList.push(this.colorService.convertRgbToHex(rgb));
    }
  }

  ngOnInit(): void {}
}
