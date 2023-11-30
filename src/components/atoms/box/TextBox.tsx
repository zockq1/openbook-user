import { ReactNode } from "react";
import styled from "styled-components";

interface TextBoxProps {
  children?: ReactNode;
  margin?: string;
  shadow?: boolean;
  color?: "blue" | "bgBlue";
  maxWidth: "half" | "full";
  onClick?: () => void;
}

const StyledTextBox = styled.div<TextBoxProps>`
  display: flex;
  align-items: center;

  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ margin }) => margin};

  border-radius: ${({ theme }) => theme.padding.base};
  height: fit-content;
  width: max-content;
  max-width: ${({ maxWidth }) =>
    ({
      half: "calc(100vw - 150px)",
      full: "100%",
    }[maxWidth] || "initial")};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

function TextBox({
  children,
  maxWidth,
  margin,
  shadow = true,
  color = "blue",
  onClick,
}: TextBoxProps) {
  return (
    <StyledTextBox
      margin={margin}
      maxWidth={maxWidth}
      shadow={shadow}
      color={color}
      onClick={onClick}
    >
      <div style={{ width: "max-content" }}>{children}</div>
    </StyledTextBox>
  );
}

export default TextBox;
