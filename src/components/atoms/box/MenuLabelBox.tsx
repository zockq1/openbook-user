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
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, state }) =>
    state === "Locked"
      ? theme.colors.lightRed
      : state === "Oepn"
      ? theme.colors.grey
      : state};
`;

function MenuLabelBox({ state, children }: ChapterNumberProps) {
  return <StyledChapterNumber state={state}>{children}</StyledChapterNumber>;
}

export default MenuLabelBox;
