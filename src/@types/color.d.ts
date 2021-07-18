interface Color {
  rgb: RGB;
  colorCode: ColorCode;
  // rgbColorCode(): string;
  // hexColorCode(): string;
}

type RGB = {
  red: number;
  green: number;
  blue: number;
};

type CMY = {
  cyan: number;
  magenta: number;
  yellow: number;
};

type CMYK = {
  cyan: number;
  magenta: number;
  yellow: number;
  keyPlate: number;
};

type HSL = {
  hue: number;
  saturation: number;
  lightness: number;
};

type ColorCode = {
  rgb: string;
  hex: string;
  cmyk: string;
};

type ColorType = {
  name: string;
  colorCode: string;
};
