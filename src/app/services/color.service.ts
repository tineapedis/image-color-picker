import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService implements Color {
  rgbObserver$;

  rgb: RGB = {
    red: 255,
    green: 255,
    blue: 255,
  };
  colorCode: ColorCode = {
    rgb: this.rgbColorCode(),
    hex: this.hexColorCode(),
  };
  private rgbSubject = new BehaviorSubject<RGB>(this.rgb);

  constructor() {
    this.rgbObserver$ = this.rgbSubject.asObservable();
  }

  updateRed(red: number) {
    this.rgb.red = red;
    this.updateRGB(this.rgb);
  }

  updateGreen(green: number) {
    this.rgb.green = green;
    this.updateRGB(this.rgb);
  }

  updateBlue(blue: number) {
    this.rgb.blue = blue;
    this.updateRGB(this.rgb);
  }

  updateRGB(rgb: RGB) {
    this.rgb = rgb;
    this.rgbSubject.next(rgb);
    this.colorCode.rgb = this.rgbColorCode();
    this.colorCode.hex = this.convertRgbToHex(rgb);
  }

  /// ColorCode

  rgbColorCode(): string {
    return `${this.rgb.red} ${this.rgb.green} ${this.rgb.blue}`;
  }

  hexColorCode(): string {
    return this.convertRgbToHex(this.rgb);
  }

  /// converter

  convertRgbToHex(rgb: RGB) {
    return (
      '#' +
      this.to16(rgb.red) +
      this.to16(rgb.green) +
      this.to16(Number(rgb.blue))
    );
  }

  to16(color: number) {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}
