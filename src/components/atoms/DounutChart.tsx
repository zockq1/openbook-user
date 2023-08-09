import styled, { keyframes } from "styled-components";

interface DountChartProps {
  color: string;
  percent: number;
  size: string;
}

function DounutChart({ color, percent, size }: DountChartProps) {
  return (
    <Chart size={size}>
      <AniSvg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#ebebeb"
          strokeWidth="20"
        />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeDasharray={`${2 * Math.PI * 90 * percent} ${
            2 * Math.PI * 90 * (1 - percent)
          }`}
          strokeDashoffset={2 * Math.PI * 90 * 0.25}
        />
      </AniSvg>
      <Percent color={color}>{percent * 100}%</Percent>
    </Chart>
  );
}

export default DounutChart;

const Chart = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  position: absolute;
  right: 100px;
  top: 12px;
  padding: 10px;
`;

const AniSvg = styled.svg`
  position: relative;
`;

const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 90};
    }
`;

const AnimatedCircle = styled.circle`
  animation: ${circleFill} 2s ease;
`;

const Percent = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: ${(props) => props.color};
`;
