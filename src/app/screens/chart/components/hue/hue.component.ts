import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-hue',
  templateUrl: './hue.component.html',
  styleUrls: ['./hue.component.scss'],
})
export class HueComponent implements OnInit {
  colorService: ColorService;

  hexList = [
    '#F30100',
    '#F33E00',
    '#F37B00',
    '#F3B700',
    '#F2F300',
    '#B5F300',
    '#79F300',
  ];

  constructor(colorService: ColorService) {
    this.colorService = colorService;

    const hsl = colorService.convertRgbToHsl();
    this.hexList.push(`hsl(${hsl.hex}, ${hsl.saturation}%, ${hsl.lightness}%)`);
  }

  ngOnInit() {}
}
