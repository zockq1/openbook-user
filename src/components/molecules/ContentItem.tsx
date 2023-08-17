import { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import ChapterNumber from "../atoms/ChapterNumber";
import Text from "../atoms/Text";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  ChapterModel,
  ContentState,
  ProgressModel,
} from "../../types/chapterTypes";
import { useDispatch } from "react-redux";
import { setCurrentContent } from "../../store/slices/contentSlice";
import Icon from "../atoms/Icon";

interface ChpaterItemProps {
  content: string;
  progress: ProgressModel;
  chapterInfo: ChapterModel;
}

interface StyledChpaterItemProps {
  state: ContentState;
}

const StyledChpaterItem = styled.li<StyledChpaterItemProps>`
  display: flex;
  align-items: center;
  width: auto;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};

  border: 3px solid
    ${({ theme, state }) =>
      state === "locked" ? theme.colors.red : theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ChapterContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

function ChpaterItem({ content, progress, chapterInfo }: ChpaterItemProps) {
  const [state, setState] = useState<ContentState>("open");
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chapterInfo.number < progress.chapterNumber) {
      setState("open");
    } else if (chapterInfo.number === progress.chapterNumber) {
    } else {
      setState("locked");
    }
  }, [setState, chapterInfo.number, progress.chapterNumber]);

  const onClickChapter = () => {
    if (state === "open") {
      dispatch(setCurrentContent(content));
      navigate(`/jeong-ju-haeng/${chapterInfo.number}/content`);
    }
  };

  return (
    <StyledChpaterItem state={state} onClick={onClickChapter} key={content}>
      <ChapterNumber state={state}>
        <Icon category={content} />
      </ChapterNumber>
      <ChapterContent>
        <Text
          weight={theme.fontWeight.medium}
          size={theme.fontSizes.small}
          padding={theme.padding.xs_Lsmall}
          color={state !== "open" ? theme.colors.red : theme.colors.black}
        >
          {content.split("/")[0]}
        </Text>
        {content.includes("/") ? (
          <Text
            weight={theme.fontWeight.regular}
            size={theme.fontSizes.xs}
            padding={theme.padding.xs_Lsmall}
            color={state !== "open" ? theme.colors.lightRed : theme.colors.grey}
          >
            {content.split("/")[1]}
          </Text>
        ) : (
          <Text
            weight={theme.fontWeight.regular}
            size={theme.fontSizes.xs}
            padding={theme.padding.xs_Lsmall}
            color={state !== "open" ? theme.colors.lightRed : theme.colors.grey}
          >
            {chapterInfo.title}
          </Text>
        )}
      </ChapterContent>

      {state !== "open" && <FaLock color={theme.colors.red} size={40} />}
    </StyledChpaterItem>
  );
}

export default ChpaterItem;
