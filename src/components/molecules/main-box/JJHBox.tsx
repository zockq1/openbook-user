import { Link } from "react-router-dom";
import styled, { ThemeContext, keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import MenuLabelBox from "../../atoms/box/MenuLabelBox";
import Icon from "../../atoms/icon/Icon";
import Text from "../../atoms/text/Text";
import calculateGradientColor from "../../../service/calculateGradientColor";

const Box = styled.li`
  position: relative;
  width: 100%;
  height: 55vw;
  max-height: 300px;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  overflow: hidden;
`;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
`;

const BoxImage = styled.img`
  position: absolute;
  width: 50%;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textBlue};
`;

const Percentage = styled.div`
  position: absolute;
  bottom: 30px;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.margin.small};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 60px;
  color: ${({ theme }) => theme.colors.textBlue};
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
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
`;

const Load = keyframes`
  0% { width: 0; }
  100% { width: var(--progress-width, 0); }
`;

interface BarProps {
  percentage: number;
}

const Bar = styled.div<BarProps>`
  --progress-width: ${({ percentage }) => `${percentage}%`};
  animation: ${Load} 1s normal forwards;
  border-radius: 100px;
  background: ${({ percentage }) => calculateGradientColor(percentage)};
  height: 10px;
  width: 0;
`;

interface LargeBoxProps {
  percentage: number;
  image: string;
  link: string;
  title: string;
}

function JJHBox({ percentage, image, link, title }: LargeBoxProps) {
  const theme = useContext(ThemeContext);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let animationFrame: number;

    const step = () => {
      if (count < percentage) {
        setCount((prevCount) => prevCount + 1);
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [percentage, count]);

  return (
    <Box>
      <Link to={link}>
        <InnerBox>
          <BoxTitle>
            <MenuLabelBox state="Open">{<Icon icon="run" />}</MenuLabelBox>
            &nbsp;&nbsp;{title}
          </BoxTitle>
          <BoxImage src={image} alt={title + " 이미지"} />
          <Percentage>
            <Text size={theme.fontSizes.base} margin="5px 0">
              진행도
            </Text>
            <span className="number-count">{count}%</span>
          </Percentage>
          <Progress>
            <Bar percentage={percentage} />
          </Progress>
        </InnerBox>
      </Link>
    </Box>
  );
}

export default JJHBox;
