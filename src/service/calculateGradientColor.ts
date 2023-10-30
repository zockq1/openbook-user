import theme from "../styles/theme";

function calculateGradientColor(score: number): string {
  if (score < 60) return theme.colors.red;
  if (score < 70) return theme.colors.purple;
  if (score < 80) return theme.colors.green;
  return theme.colors.blue;
}

export default calculateGradientColor;
