import styled, { keyframes } from "styled-components";

interface ProgressBarProps {
  percentage: number;
}

const Progress = styled.div`
  display: flex;
  position: absolute;
  bottom: 12px;
  justify-content: flex-start;
  align-items: center;

  border-radius: 100px;
  padding: 0 5px;
  height: 20px;
  width: calc(100% - 24px);
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: inset ${({ theme }) => theme.shadow.defaultShadow};
`;

const Load = keyframes`
  0% { width: 0; }
  100% { width: var(--progress-width, 0); }
`;

const Bar = styled.div<ProgressBarProps>`
  --progress-width: ${({ percentage }) => `${percentage}%`};
  animation: ${Load} 1s normal forwards;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.blue};
  height: 10px;
  width: 0;
`;

function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <Progress>
      <Bar percentage={percentage} />
    </Progress>
  );
}

export default ProgressBar;
