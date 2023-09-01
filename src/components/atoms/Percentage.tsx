import styled, { ThemeContext } from "styled-components";
import Text from "./Text";
import { useContext, useEffect, useState } from "react";

interface PercentageProps {
  percentage: number;
}

const StyledPercentage = styled.div`
  position: absolute;
  bottom: 30px;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.margin.small};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 15vw;
  color: ${({ theme }) => theme.colors.grey};
`;

function Percentage({ percentage }: PercentageProps) {
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
    <StyledPercentage>
      <Text size={theme.fontSizes.base} margin="5px 0">
        진행도
      </Text>
      <span className="number-count">{count}%</span>
    </StyledPercentage>
  );
}

export default Percentage;
