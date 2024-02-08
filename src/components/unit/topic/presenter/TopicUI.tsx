import styled from "styled-components";
import Icon from "../../../atoms/icon/Icon";
import Bookmark from "../container/Bookmark";
import { ContentState } from "../../../../types/jjhTypes";
import { TopicMenuModel } from "../../../../types/topicTypes";
import Divider from "../../../atoms/box/Divider";

interface TopicUIProps {
  topic: TopicMenuModel;
  isLoggedIn: boolean;
  onKeywordToggle: () => void;
}

const StyledQuestionMenuItem = styled.div<{
  color: string;
  state: ContentState;
}>`
  position: relative;
  display: flex;
  margin: ${({ theme }) => theme.margin.base};
  margin-bottom: 0;
  padding: 10px 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: ${({ state }) =>
    state === "Locked" ? "10px" : "10px 10px 0 0"};

  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div<{ color: string }>`
  width: 100%;
  padding-left: 50px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ color }) => color};
  line-height: 120%;
  word-break: keep-all;
`;

const SubTitle = styled.div<{ color: string }>`
  width: 100%;
  padding-left: 50px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.light};

  color: ${({ theme, color }) => (color ? color : theme.colors.grey)};
`;

const BookmarkBox = styled.div<{ color: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1px;
  left: 1px;
  width: 46px;
  height: 46px;

  z-index: 9;
`;

function TopicUI({ topic, onKeywordToggle, isLoggedIn }: TopicUIProps) {
  const {
    title,
    date,
    state = "Topic",
    isBookmarked = false,
    mainColor = "",
  } = topic;
  if (state === "Divider") {
    return <Divider>{title}</Divider>;
  }
  return (
    <StyledQuestionMenuItem
      state={state}
      color={mainColor}
      onClick={onKeywordToggle}
      id={title}
    >
      <Description>
        <Title color={state === "Locked" ? mainColor : ""}>{title}</Title>
        <SubTitle color={state === "Locked" ? mainColor : ""}>{date}</SubTitle>
      </Description>

      <BookmarkBox color={mainColor}>
        {state === "Locked" ? (
          <Icon icon={"lock"} size={22} color={mainColor} />
        ) : state === "Timeline" ? (
          <Icon icon="TIMELINE_QUESTION" size={22} color={mainColor} />
        ) : state === "Chapter" ? (
          <Icon icon="CHAPTER_INFO" size={22} color={mainColor} />
        ) : isLoggedIn ? (
          <Bookmark isBookmarked={isBookmarked} topicTitle={title} />
        ) : (
          <Icon icon="TOPIC_STUDY" size={22} color={mainColor} />
        )}
      </BookmarkBox>
    </StyledQuestionMenuItem>
  );
}

export default TopicUI;
