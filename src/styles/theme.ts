import { DefaultTheme } from "styled-components";

const calcRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  xxxs: calcRem(8),
  xxs: calcRem(10),
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  large: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  big: calcRem(50),
};

const fontWeight = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const colors = {
  white: "#fefcfc",
  black: "#000",
  lightGrey: "#DCDCDC",
  grey: "#818BA0",

  blue: "#0F67FE",
  semiLightBlue: "#A6CBFF",
  lightBlue: "#EDF5FF",

  red: "#FA4D5E",
  lightRed: "#FF8391",

  green: "#527853",
  lightGreen: "#E3FFD4",

  orange: "#e8b43f",

  purple: "#8A3FFC",
  lightPurple: "#A56EFF",

  bg: "#f2f5f9",

  bgBlue: "#e0f2ff",
  textBlue: "#101A28",
  //textBlue: "#000066",
};

const shadow = {
  //defaultShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
  defaultShadow: "rgba(0, 0, 0, 0.01) 4px 4px 4px",
};

const margin = {
  small: "5px",
  base: "10px 0px",
};

const padding = {
  xs_Lsmall: "4px 4px 4px 8px",
  xs: "4px",
  small: "8px",
  base: "12px",
  large: "24px",
};

const borderRadius = {
  xxxs: "5px",
  xxs: "10px",
  xs: "15px",
  small: "20px",
  base: "25px",
};

const border = {
  default: `1px solid ${colors.lightGrey}`,
};

const deviceSizes = {
  tablet: "768px",
  desktop: "1024px",
};

const device = {
  tablet: `only screen and (min-width: ${deviceSizes.tablet})`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop})`,
};

const theme: DefaultTheme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  fontWeight,
  shadow,
  margin,
  padding,
  borderRadius,
  border,
};

export type FontSizes = typeof fontSizes;
export type Colors = typeof colors;
export type DeviceSizes = typeof deviceSizes;
export type Device = typeof device;
export type FontWeight = typeof fontWeight;
export type Shadow = typeof shadow;
export type Margin = typeof margin;
export type Padding = typeof padding;
export type BorderRadius = typeof borderRadius;
export type Border = typeof border;
export default theme;
