import { ReactNode } from "react";
import styled from "styled-components";

interface TextProps {
  children?: ReactNode;
  weight?: number | "inherit";
  size?: string;
  color?: string;
  bgColor?: string;
  padding?: string;
  lineHeight?: string;
}

const StyledText = styled.span<TextProps>`
  padding: ${({ padding }) => padding};

  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};

  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};

  line-height: ${({ lineHeight }) => lineHeight};
`;

function Text({
  children,
  weight = "inherit",
  size = "inherit",
  color = "inherit",
  bgColor = "inherit",
  padding = "auto",
  lineHeight = "inherit",
}: TextProps) {
  return (
    <StyledText
      weight={weight}
      size={size}
      color={color}
      padding={padding}
      bgColor={bgColor}
      lineHeight={lineHeight}
    >
      {children}
    </StyledText>
  );
}

export default Text;
