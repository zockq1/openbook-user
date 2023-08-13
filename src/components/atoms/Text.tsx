import { ReactNode } from "react";
import styled from "styled-components";

interface TextProps {
  children?: ReactNode;
  weight?: number | "inherit";
  size?: string;
  color?: string;
  bgColor?: string;
  padding?: string;
  margin?: string;
  lineHeight?: string;
  textAlign?: string;
}

const StyledText = styled.div<TextProps>`
  width: fit-content;

  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};

  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};

  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};

  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
`;

function Text({
  children,
  weight = "inherit",
  size = "inherit",
  color = "inherit",
  bgColor = "transparent",
  padding = "0",
  margin = "0",
  lineHeight = "normal",
  textAlign = "start",
}: TextProps) {
  return (
    <StyledText
      weight={weight}
      size={size}
      color={color}
      padding={padding}
      margin={margin}
      bgColor={bgColor}
      lineHeight={lineHeight}
      textAlign={textAlign}
    >
      {children}
    </StyledText>
  );
}

export default Text;
