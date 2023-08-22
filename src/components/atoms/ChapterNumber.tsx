import { ReactNode } from "react";
import styled from "styled-components";
import { ContentState } from "../../types/chapterTypes";

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
  border: 3px solid
    ${({ theme, state }) =>
      state === "Locked" ? theme.colors.red : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, state }) =>
    state === "Locked" ? theme.colors.red : theme.colors.black};
  box-shadow: inset ${({ theme }) => theme.shadow.defaultShadow};
`;

function ChapterNumber({ state, children }: ChapterNumberProps) {
  return <StyledChapterNumber state={state}>{children}</StyledChapterNumber>;
}

export default ChapterNumber;
