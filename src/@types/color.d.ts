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

type ColorCode = {
  rgb: string;
  hex: string;
};
