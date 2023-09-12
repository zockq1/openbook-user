import { ReactNode } from "react";
import styled from "styled-components";
import { ContentState } from "../../../types/chapterTypes";

interface ChapterNumberProps {
  state: ContentState;
  children?: ReactNode;
}

interface StateProps {
  state: ContentState;
}

const StyledChapterNumber = styled.div<StateProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme, state }) =>
    state === "Locked" ? theme.border.red : theme.border.black};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, state }) =>
    state === "Locked" ? theme.colors.lightRed : theme.colors.grey};
`;

function MenuLabelBox({ state, children }: ChapterNumberProps) {
  return <StyledChapterNumber state={state}>{children}</StyledChapterNumber>;
}

export default MenuLabelBox;
