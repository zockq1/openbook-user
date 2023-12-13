interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export function interpolateColors(color1: string, color2: string): string {
  // Ensure input colors are in the format '#RRGGBB'
  color1 = color1.charAt(0) === "#" ? color1 : "#" + color1;
  color2 = color2.charAt(0) === "#" ? color2 : "#" + color2;

  // Convert hex to RGB
  const hexToRgb = (hex: string): RGBColor => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const rgb1: RGBColor = hexToRgb(color1);
  const rgb2: RGBColor = hexToRgb(color2);

  // Calculate intermediate values for each channel
  const interpolateChannel = (channel1: number, channel2: number): number =>
    Math.round((channel1 + channel2) / 2);

  const interpolatedColor: RGBColor = {
    r: interpolateChannel(rgb1.r, rgb2.r),
    g: interpolateChannel(rgb1.g, rgb2.g),
    b: interpolateChannel(rgb1.b, rgb2.b),
  };

  // Convert back to hex
  const rgbToHex = (rgb: RGBColor): string =>
    `#${((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b)
      .toString(16)
      .slice(1)}`;

  return rgbToHex(interpolatedColor);
}
