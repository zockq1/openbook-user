import { Link } from "react-router-dom";
import styled, { ThemeContext, keyframes } from "styled-components";
import { useContext } from "react";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";
import Icon from "../../../atoms/icon/Icon";
import Text from "../../../atoms/text/Text";
import calculateGradientColor from "../../../../service/calculateGradientColor";
import useCountAnimation from "../../../../hooks/useCountAnimation";

const Box = styled(Link)`
  position: relative;
  @media (min-width: 768px) {
    grid-column: 1/3;
  }
  padding: ${({ theme }) => theme.padding.base};
  margin: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;
const BoxImage = styled.img`
  position: absolute;
  height: 80%;
  max-width: 68%;
  bottom: 10px;
  right: 12px;
`;

const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textBlue};

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
`;

const Percentage = styled.div`
  position: absolute;
  bottom: 30px;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.margin.small};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 60px;
  color: ${({ theme }) => theme.colors.textBlue};
  @media (min-width: 768px) {
    font-size: 90px;
  }
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
  hover?: boolean;
  setHover?: () => void;
}

function JJHBox({
  percentage,
  image,
  link,
  title,
  hover = false,
  setHover,
}: LargeBoxProps) {
  const theme = useContext(ThemeContext);
  const count = useCountAnimation(0, percentage);

  return (
    <Box to={link} onMouseEnter={setHover} className={hover ? "hover" : ""}>
      <BoxTitle>
        <MenuLabelBox state="Open">
          {<Icon icon="run" size={22} />}
        </MenuLabelBox>
        &nbsp;&nbsp;{title}
      </BoxTitle>
      <BoxImage src={image} alt={title + " 이미지"} />
      <Percentage>
        <Text size={theme.fontSizes.xl} margin="5px 0">
          진행도
        </Text>
        <span className="number-count">{count}%</span>
      </Percentage>
      <Progress>
        <Bar percentage={percentage} />
      </Progress>
    </Box>
  );
}

export default JJHBox;
