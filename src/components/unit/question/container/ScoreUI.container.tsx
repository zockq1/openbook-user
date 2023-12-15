import styled, { keyframes } from "styled-components";

const ScoreContainer = styled.div`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  padding-bottom: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  @media (min-width: 768px) {
    width: auto;
    height: max-content;
    margin: 5px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

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

interface BarProps {
  percentage: number;
  color: string;
}

const Bar = styled.div<BarProps>`
  --progress-width: ${({ percentage }) => `${percentage}%`};
  animation: ${Load} 1s normal forwards;
  border-radius: 100px;
  background: ${({ color }) => color};
  height: 10px;
  width: 0;
`;

const Image = styled.img`
  width: 40%;
`;

const Title = styled.div<{ color: string }>`
  width: 100%;
  margin: 10px 0;
  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 30px;
  font-family: "Giants-Regular";
  text-align: center;
  white-space: nowrap;
`;

const Score = styled.div<{ color: string }>`
  width: 100%;
  margin: 10px 0;
  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-family: "Giants-Regular";
  text-align: center;
  white-space: nowrap;
`;

const Sub = styled.div`
  width: 100%;
  margin: 10px 0 20px;
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: "Giants-Regular";
  text-align: center;
  word-break: keep-all;
`;

interface ScoreUIProps {
  title: string;
  score: string;
  percentage: number;
  description: string;
  color: string;
  image: string;
}

function ScoreUI({
  title,
  score,
  percentage,
  description,
  color,
  image,
}: ScoreUIProps) {
  return (
    <ScoreContainer>
      <Image src={image} />
      <DescriptionContainer>
        <Title color={color}>{title}</Title>
        <Score color={color}>{score}</Score>
        <Sub>{description}</Sub>
      </DescriptionContainer>
      <Progress>
        <Bar percentage={percentage} color={color} />
      </Progress>
    </ScoreContainer>
  );
}
export default ScoreUI;
