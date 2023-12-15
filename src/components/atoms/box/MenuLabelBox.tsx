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
  min-width: 50px;
  height: 50px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  /* color: ${({ theme, state }) =>
    state === "Locked"
      ? theme.colors.red
      : state === "Complete"
      ? theme.colors.green
      : state === "InProgress"
      ? theme.colors.blue
      : state === "Open"
      ? "inherit"
      : state}; */
  color: inherit;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

function MenuLabelBox({ state, children }: ChapterNumberProps) {
  return <StyledChapterNumber state={state}>{children}</StyledChapterNumber>;
}

export default MenuLabelBox;
