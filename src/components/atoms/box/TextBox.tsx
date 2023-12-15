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
  position: relative;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ margin }) => margin};

  height: fit-content;
  width: max-content;
  max-width: ${({ maxWidth }) =>
    ({
      half: "calc(100vw - 150px)",
      full: "100%",
    }[maxWidth] || "initial")};

  border-radius: ${({ theme }) => theme.padding.base};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  z-index: 1;
  cursor: pointer;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  word-break: keep-all;
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
      <Item style={{ width: "max-content" }}>{children}</Item>
    </StyledTextBox>
  );
}

export default TextBox;
