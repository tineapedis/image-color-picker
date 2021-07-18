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

  getBlackWhite(): string {
    const hex = this.colorCode.hex;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128 ? 'white' : 'black';
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

  convertRgbToHsl(): HSL {
    const red = this.rgb.red;
    const green = this.rgb.green;
    const blue = this.rgb.blue;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const hsl = { hue: 0, saturation: 0, lightness: (max + min) / 2 };

    if (max !== min) {
      // H(色相)
      if (max === red) {
        hsl.hue = (60 * (green - blue)) / (max - min);
      }
      if (max === green) {
        hsl.hue = (60 * (blue - red)) / (max - min) + 120;
      }
      if (max === blue) {
        hsl.hue = (60 * (red - green)) / (max - min) + 240;
      }

      // S(彩度)
      if (hsl.lightness <= 127) {
        hsl.saturation = (max - min) / (max + min);
      } else {
        hsl.saturation = (max - min) / (510 - max - min);
      }
    }

    if (hsl.hue < 0) {
      hsl.hue = hsl.hue + 360;
    }

    hsl.hue = Math.round(hsl.hue);
    hsl.saturation = Math.round(hsl.saturation * 100);
    hsl.lightness = Math.round((hsl.lightness / 255) * 100);

    return hsl;
  }

  convertHslToRgb(hsl: HSL): RGB {
    let hue = hsl.hue;
    let saturation = hsl.saturation;
    let lightness = hsl.lightness;

    const RGB_MAX = 255;
    const HUE_MAX = 360;
    const SATURATION_MAX = 100;
    const LIGHTNESS_MAX = 100;

    let r;
    let g;
    let b;
    let max;
    let min;

    hue = hue % HUE_MAX;
    saturation = saturation / SATURATION_MAX;
    lightness = lightness / LIGHTNESS_MAX;

    if (lightness < 0.5) {
      max = lightness + lightness * saturation;
      min = lightness - lightness * saturation;
    } else {
      max = lightness + (1 - lightness) * saturation;
      min = lightness - (1 - lightness) * saturation;
    }

    const hp = HUE_MAX / 6;
    const q = hue / hp;
    if (q <= 1) {
      r = max;
      g = (hue / hp) * (max - min) + min;
      b = min;
    } else if (q <= 2) {
      r = ((hp * 2 - hue) / hp) * (max - min) + min;
      g = max;
      b = min;
    } else if (q <= 3) {
      r = min;
      g = max;
      b = ((hue - hp * 2) / hp) * (max - min) + min;
    } else if (q <= 4) {
      r = min;
      g = ((hp * 4 - hue) / hp) * (max - min) + min;
      b = max;
    } else if (q <= 5) {
      r = ((hue - hp * 4) / hp) * (max - min) + min;
      g = min;
      b = max;
    } else {
      r = max;
      g = min;
      b = ((HUE_MAX - hue) / hp) * (max - min) + min;
    }

    return {
      red: Math.floor(r * RGB_MAX),
      green: Math.floor(g * RGB_MAX),
      blue: Math.floor(b * RGB_MAX),
    };
  }
}
