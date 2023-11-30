import { ReactNode } from "react";
import styled from "styled-components";
import { ContentState } from "../../../types/jjhTypes";

interface ChapterNumberProps {
  state: ContentState | string;
  children?: ReactNode;
}

interface StateProps {
  state: ContentState | string;
}

const StyledChapterNumber = styled.div<StateProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  border: ${({ theme }) => theme.border.default};
  box-shadow: inset ${({ theme }) => theme.shadow.defaultShadow};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, state }) =>
    state === "Locked"
      ? theme.colors.red
      : state === "Open" || state === "Complete" || state === "InProgress"
      ? theme.colors.textBlue
      : state};
`;

function MenuLabelBox({ state, children }: ChapterNumberProps) {
  return <StyledChapterNumber state={state}>{children}</StyledChapterNumber>;
}

export default MenuLabelBox;
