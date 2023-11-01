import { ReactNode } from "react";
import styled from "styled-components";

interface TextBoxProps {
  children?: ReactNode;
  margin?: string;
  shadow?: boolean;
  color?: "blue" | "bgBlue";
  maxWidth: "half" | "full";
}

const StyledTextBox = styled.div<TextBoxProps>`
  display: flex;
  align-items: center;

  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ margin }) => margin};

  border-radius: ${({ theme }) => theme.padding.base};
  height: inherit;
  width: max-content;
  max-width: ${({ maxWidth }) =>
    ({
      half: "calc(100vw - 150px)",
      full: "100%",
    }[maxWidth] || "initial")};

  background-color: ${({ theme, color }) =>
    color === "blue" ? theme.colors.bgBlue : theme.colors.bgBlue};
  color: ${({ theme, color }) =>
    color === "blue" ? theme.colors.textBlue : theme.colors.textBlue};
  border: 2px solid
    ${({ theme, color }) =>
      color === "blue" ? theme.colors.textBlue : theme.colors.textBlue};
  box-shadow: ${({ theme, shadow }) =>
    shadow ? theme.shadow.defaultShadow : "none"};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  z-index: 1;
`;

function TextBox({
  children,
  maxWidth,
  margin,
  shadow = true,
  color = "blue",
}: TextBoxProps) {
  return (
    <StyledTextBox
      margin={margin}
      maxWidth={maxWidth}
      shadow={shadow}
      color={color}
    >
      <div style={{ width: "max-content" }}>{children}</div>
    </StyledTextBox>
  );
}

export default TextBox;
