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
    cyan: 0,
    magenta: 0,
    yellow: 0,
  };
  cmyk: CMYK = {
    cyan: 0,
    magenta: 0,
    yellow: 0,
    keyPlate: 0,
  };
  cmykNatural: CMYK = {
    cyan: 0,
    magenta: 0,
    yellow: 0,
    keyPlate: 0,
  };
  colorCode: ColorCode = {
    rgb: this.rgbColorCode(),
    hex: this.hexColorCode(),
    cmyk: this.cmykColorCode(),
  };
  private rgbSubject = new BehaviorSubject<RGB>(this.rgb);

  constructor() {
    this.rgbObserver$ = this.rgbSubject.asObservable();
  }

  /// Update

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

  updateCyan(cyan: number) {
    this.cmyk.cyan = cyan / 100;
    this.cmy = this.convertCmykToCmy(this.cmyk);
    this.rgb = this.convertCmyToRgb(this.cmy);
    this.updateRGB(this.rgb);
  }

  updateMagenta(magenta: number) {
    this.cmyk.magenta = magenta / 100;
    this.cmy = this.convertCmykToCmy(this.cmyk);
    this.rgb = this.convertCmyToRgb(this.cmy);
    this.updateRGB(this.rgb);
  }

  updateYellow(yellow: number) {
    this.cmyk.yellow = yellow / 100;
    this.cmy = this.convertCmykToCmy(this.cmyk);
    this.rgb = this.convertCmyToRgb(this.cmy);
    this.updateRGB(this.rgb);
  }

  updateKeyPlate(keyPlate: number) {
    this.cmyk.keyPlate = keyPlate / 100;
    this.cmy = this.convertCmykToCmy(this.cmyk);
    this.rgb = this.convertCmyToRgb(this.cmy);
    this.updateRGB(this.rgb);
  }

  updateRGB(rgb: RGB) {
    this.rgb = rgb;
    this.rgbSubject.next(rgb);
    this.colorCode.rgb = this.rgbColorCode();
    this.colorCode.hex = this.convertRgbToHex(rgb);
    this.updateCMYK(rgb);
  }

  updateCMYK(rgb: RGB) {
    this.cmy = this.convertRgbToCmy(rgb);
    this.cmyk = this.converCmyToCmyk(this.cmy);
    this.cmykNatural = this.convertCmykToCmykNatural(this.cmyk);
    this.colorCode.cmyk = `${this.cmykNatural.cyan} ${this.cmykNatural.magenta} ${this.cmykNatural.yellow} ${this.cmykNatural.keyPlate}`;
  }

  updateHex(hex: string) {
    this.colorCode.hex = hex;
    this.rgb = this.convertHexToRgb(hex);
    this.rgbSubject.next(this.rgb);
    this.colorCode.rgb = this.rgbColorCode();
    this.updateCMYK(this.rgb);
  }

  /// ColorCode

  rgbColorCode(): string {
    return `${this.rgb.red} ${this.rgb.green} ${this.rgb.blue}`;
  }

  hexColorCode(): string {
    return this.convertRgbToHex(this.rgb);
  }

  cmykColorCode(): string {
    return this.convertRgbToCmykCode(this.rgb);
  }

  /// converter

  convertRgbToHex(rgb: RGB): string {
    return (
      '#' + this.to16(rgb.red) + this.to16(rgb.green) + this.to16(rgb.blue)
    );
  }

  to16(color: number) {
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  convertHexToRgb(hex: string): RGB {
    // TODO: 文字数３の場合もあると思われる
    const rgbList = hex.replace('#', '').match(/.{2}/g);
    if (rgbList == null) {
      return {
        red: 0,
        green: 0,
        blue: 0,
      };
    }
    const r = this.to10(rgbList[0]);
    const g = this.to10(rgbList[1]);
    const b = this.to10(rgbList[2]);
    return {
      red: r,
      green: g,
      blue: b,
    };
  }

  to10(hex: string): number {
    return parseInt(hex, 16);
  }

  convertRgbToCmy(rgb: RGB): CMY {
    return {
      cyan: 1 - rgb.red / 255,
      magenta: 1 - rgb.green / 255,
      yellow: 1 - rgb.blue / 255,
    };
  }

  convertRgbToCmykCode(rgb: RGB): string {
    const cmy = this.convertRgbToCmy(rgb);
    const cmyk = this.converCmyToCmyk(cmy);
    const cmykN = this.convertCmykToCmykNatural(cmyk);
    return `${cmykN.cyan} ${cmykN.magenta} ${cmykN.yellow} ${cmykN.keyPlate}`;
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

  convertCmykToCmykNatural(cmyk: CMYK): CMYK {
    return {
      cyan: Math.round(cmyk.cyan * 100),
      magenta: Math.round(cmyk.magenta * 100),
      yellow: Math.round(cmyk.yellow * 100),
      keyPlate: Math.round(cmyk.keyPlate * 100),
    };
  }

  convertCmykToCmy(cmyk: CMYK): CMY {
    const cmyArray = [cmyk.cyan, cmyk.magenta, cmyk.yellow].map(
      (value) => value * (1 - cmyk.keyPlate) + cmyk.keyPlate
    );

    return {
      cyan: cmyArray[0],
      magenta: cmyArray[1],
      yellow: cmyArray[2],
    };
  }

  convertCmyToRgb(cmy: CMY): RGB {
    const rgbArray = [cmy.cyan, cmy.magenta, cmy.yellow].map((value) =>
      Math.round((1 - value) * 255)
    );

    return {
      red: rgbArray[0],
      green: rgbArray[1],
      blue: rgbArray[2],
    };
  }
}
