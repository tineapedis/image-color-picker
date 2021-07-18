import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-hue',
  templateUrl: './hue.component.html',
  styleUrls: ['./hue.component.scss'],
})
export class HueComponent implements OnInit {
  colorService: ColorService;

  hexList: string[] = [];

  constructor(colorService: ColorService) {
    this.colorService = colorService;

    const hsl = colorService.convertRgbToHsl();
    this.hexList.push(colorService.hexColorCode());

    const MAX = 12;
    for (let i = 0; i < MAX; i++) {
      const hue = i * (360 / MAX);
      const rgb = this.colorService.convertHslToRgb({
        hue,
        saturation: hsl.saturation,
        lightness: hsl.lightness,
      });
      this.hexList.push(this.colorService.convertRgbToHex(rgb));
    }
  }

  ngOnInit() {}
}
