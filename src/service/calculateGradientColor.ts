function calculateGradientColor(score: number): string {
  if (score < 30) return "rgb(250, 77, 94)";
  const minColor = [250, 77, 94];
  const maxColor = [15, 103, 254];
  const range = 100;
  const ratio = Math.min(1, Math.max(0, score / range));

  // 각 색상 채널 계산
  const r = Math.floor(maxColor[0] * ratio + minColor[0] * (1 - ratio));
  const g = Math.floor(maxColor[1] * ratio + minColor[1] * (1 - ratio));
  const b = Math.floor(maxColor[2] * ratio + minColor[2] * (1 - ratio));

  return `rgb(${r}, ${g}, ${b})`;
}

export default calculateGradientColor;
