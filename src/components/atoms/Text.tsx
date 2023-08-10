import { ReactNode } from "react";
import styled from "styled-components";

interface TextProps {
  children?: ReactNode;
  weight?: number;
  size?: string;
  color?: string;
  bgColor?: string;
  padding?: string;
}

const StyledText = styled.span<TextProps>`
  padding: ${({ padding }) => padding};

  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};

  color: ${({ color }) => color};
`;

function Text({
  children,
  weight = 500,
  size = "1rem",
  color = "black",
  padding = "auto",
}: TextProps) {
  return (
    <StyledText weight={weight} size={size} color={color} padding={padding}>
      {children}
    </StyledText>
  );
}

export default Text;
