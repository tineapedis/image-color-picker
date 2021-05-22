import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService implements Color {
  rgbObserver$;

  rgb: RGB = {
    red: 0,
    green: 0,
    blue: 0,
  };
  colorCode: ColorCode = {
    rgb: this.rgbColorCode(),
    hex: '#ffffff',
  };
  private rgbSubject = new BehaviorSubject<RGB>(this.rgb);

  constructor() {
    this.rgbObserver$ = this.rgbSubject.asObservable();
  }

  updateRGB(rgb: RGB) {
    this.rgbSubject.next(rgb);
    this.colorCode.hex = this.convertRgbToHex(rgb);
  }

  /// ColorCode

  rgbColorCode(): string {
    return `${this.rgb.red} ${this.rgb.green} ${this.rgb.blue}`;
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
