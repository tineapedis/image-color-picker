import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-picked-color',
  templateUrl: './picked-color.component.html',
  styleUrls: ['./picked-color.component.scss'],
})
export class PickedColorComponent implements OnInit {
  selectedRGB = '0 0 0';
  selectedHEX = '#FFFFFF';

  constructor() {}

  ngOnInit(): void {}

  @Input() set setSelectedRGB(value: string) {
    this.selectedRGB = value;
    const rgbArray = value.split(' ');
    this.selectedHEX = this.convertRgbToHex(
      rgbArray[0],
      rgbArray[1],
      rgbArray[2]
    );
  }

  // TODO: 以下メソッド別ファイルに移植する

  convertRgbToHex(red: string, green: string, blue: string) {
    return (
      '#' +
      this.toHex(Number(red)) +
      this.toHex(Number(green)) +
      this.toHex(Number(blue))
    );
  }

  toHex(color: number) {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}
