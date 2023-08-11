import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import ChapterNumber from "../atoms/ChapterNumber";
import Text from "../atoms/Text";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ChpaterItemProps {
  chapterInfo: {
    title: string;
    number: number;
    state: string;
    progress: number;
  };
}

interface StyledChpaterItemProps {
  state: string;
}

const StyledChpaterItem = styled.li<StyledChpaterItemProps>`
  display: flex;
  align-items: center;
  width: auto;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};

  border: 3px solid
    ${({ theme, state }) =>
      state !== "inProgress"
        ? state === "complete"
          ? theme.colors.black
          : theme.colors.red
        : theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ChapterContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

function ChpaterItem({ chapterInfo }: ChpaterItemProps) {
  const { title, number, state, progress } = chapterInfo;
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const onClickChapter = () => {
    navigate(`/jeong-ju-haeng/${number}`);
  };

  return (
    <StyledChpaterItem state={state} onClick={onClickChapter} key={number}>
      <ChapterNumber state={state}>{number}</ChapterNumber>
      <ChapterContent>
        <Text
          weight={theme.fontWeight.medium}
          size={theme.fontSizes.small}
          padding={theme.padding.small}
          color={state === "notStarted" ? theme.colors.red : theme.colors.black}
        >
          {title}
        </Text>
        <Text
          weight={theme.fontWeight.regular}
          size={theme.fontSizes.small}
          padding={theme.padding.small}
          color={
            state === "notStarted" ? theme.colors.lightRed : theme.colors.grey
          }
        >
          진행도: {progress}%
        </Text>
      </ChapterContent>

      {state === "notStarted" && <FaLock color={theme.colors.red} size={40} />}
    </StyledChpaterItem>
  );
}

export default ChpaterItem;
