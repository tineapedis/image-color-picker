import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

interface ChartNumber {
  value: string;
  viewValue: string;
}

interface Chart {
  hex: string;
  rgb: string;
  value: string;
}

@Component({
  selector: 'app-saturation',
  templateUrl: './saturation.component.html',
  styleUrls: ['./saturation.component.scss'],
})
export class SaturationComponent implements OnInit {
  colorService: ColorService;
  chartList: Chart[] = [];
  selectedNumber = '12';
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
    this.chartList = [];
    this.updateHexList();
  }

  updateHexList() {
    const MAX = Number(this.selectedNumber);
    for (let i = 0; i < MAX; i++) {
      const saturation = i * (100 / MAX);
      const rgb = this.colorService.convertHslToRgb({
        hue: this.hsl.hue,
        saturation,
        lightness: this.hsl.lightness,
      });
      this.chartList.push({
        hex: this.colorService.convertRgbToHex(rgb),
        rgb: `${rgb.red}, ${rgb.green}, ${rgb.blue}`,
        value: saturation.toString(),
      });
    }
  }
}
