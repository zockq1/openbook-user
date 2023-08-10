import { ReactNode } from "react";
import styled from "styled-components";

interface ChapterNumberProps {
  state: string;
  children?: ReactNode;
}

interface StateProps {
  state: string;
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
      state !== "inProgress"
        ? state === "complete"
          ? theme.colors.black
          : theme.colors.red
        : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, state }) =>
    state !== "inProgress"
      ? state === "complete"
        ? theme.colors.black
        : theme.colors.red
      : theme.colors.black};
`;

function ChapterNumber({ state, children }: ChapterNumberProps) {
  return <StyledChapterNumber state={state}>{children}</StyledChapterNumber>;
}

export default ChapterNumber;
