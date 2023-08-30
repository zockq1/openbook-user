import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import ChapterNumber from "../atoms/ChapterNumber";
import Text from "../atoms/Text";
import { FaLock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ContentModel, ContentState } from "../../types/chapterTypes";
import Icon from "../atoms/Icon";

interface ChpaterItemProps {
  content: ContentModel;
  index: number;
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

  border: ${({ theme, state }) =>
    state === "Locked" ? theme.border.red : theme.border.black};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ChapterContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

function ChpaterItem({ content, index }: ChpaterItemProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const { chapter } = useParams();

  const onClickChapter = () => {
    if (content.state === "Locked") {
      return;
    }
    switch (content.content) {
      case "단원 학습":
        navigate(`/jeong-ju-haeng/${chapter}/chapter-learning`);
        break;
      case "연표 학습":
        navigate(`/jeong-ju-haeng/${chapter}/timeline-learning`);
        break;
      case "주제 학습":
        navigate(`/jeong-ju-haeng/${chapter}/topic-learning/${content.title}`);
        break;
      case "단원 마무리 학습":
        navigate(`/jeong-ju-haeng/${chapter}/final-learning`);
        break;
    }
  };

  return (
    <StyledChpaterItem state={content.state} onClick={onClickChapter}>
      <ChapterNumber state={content.state}>
        <Icon category={content.content} />
      </ChapterNumber>
      <ChapterContent>
        <Text
          weight={theme.fontWeight.medium}
          size={theme.fontSizes.small}
          padding={theme.padding.xs_Lsmall}
          color={
            content.state !== "Open" ? theme.colors.red : theme.colors.black
          }
        >
          {content.content}
        </Text>
        <Text
          weight={theme.fontWeight.regular}
          size={theme.fontSizes.xs}
          padding={theme.padding.xs_Lsmall}
          color={
            content.state !== "Open" ? theme.colors.lightRed : theme.colors.grey
          }
        >
          {content.title}
        </Text>
      </ChapterContent>

      {content.state !== "Open" && (
        <FaLock color={theme.colors.red} size={40} />
      )}
    </StyledChpaterItem>
  );
}

export default ChpaterItem;
