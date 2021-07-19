import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

interface ChartNumber {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-saturation',
  templateUrl: './saturation.component.html',
  styleUrls: ['./saturation.component.scss'],
})
export class SaturationComponent implements OnInit {
  colorService: ColorService;
  hexList: string[] = [];

  selected = '12';
  chartNumbers: ChartNumber[] = [
    { value: '8', viewValue: '8' },
    { value: '12', viewValue: '12' },
    { value: '16', viewValue: '16' },
    { value: '20', viewValue: '20' },
    { value: '24', viewValue: '24' },
    { value: '28', viewValue: '28' },
    { value: '32', viewValue: '32' },
  ];
  hsl: HSL;

  constructor(colorService: ColorService) {
    this.colorService = colorService;
    this.hsl = colorService.convertRgbToHsl();
    this.updateHexList();
  }

  ngOnInit(): void {}

  onSelectNumber() {
    this.updateHexList();
  }

  updateHexList() {
    this.hexList = [];
    const MAX = Number(this.selected);
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
}
