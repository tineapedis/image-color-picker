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
  cmy: CMY = {
    cyan: 1,
    magenta: 1,
    yellow: 1,
  };
  cmyk: CMYK = {
    cyan: 1,
    magenta: 1,
    yellow: 1,
    keyPlate: 1,
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
    this.cmy = this.convertRgbToCmy(rgb);
    this.cmyk = this.converCmyToCmyk(this.cmy);
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
      '#' + this.to16(rgb.red) + this.to16(rgb.green) + this.to16(rgb.blue)
    );
  }

  to16(color: number) {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  convertRgbToCmy(rgb: RGB): CMY {
    return {
      cyan: 1 - rgb.red / 255,
      magenta: 1 - rgb.green / 255,
      yellow: 1 - rgb.blue / 255,
    };
  }

  converCmyToCmyk(cmy: CMY): CMYK {
    const cmyArray = [cmy.cyan, cmy.magenta, cmy.yellow];
    const k = Math.min.apply(0, cmyArray);
    const cmyk =
      k === 1 ? [0, 0, 0] : cmyArray.map((value) => (value - k) / (1 - k));
    return {
      cyan: cmyk[0],
      magenta: cmyk[1],
      yellow: cmyk[2],
      keyPlate: k,
    };
  }
}
