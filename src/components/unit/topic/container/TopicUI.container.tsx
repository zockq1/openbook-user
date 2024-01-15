import styled from "styled-components";
import Icon from "../../../atoms/icon/Icon";
import Bookmark from "../presenter/Bookmark.presenter";
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
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
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
  padding: 0 50px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ color }) => color};
  line-height: 120%;
  word-break: keep-all;
`;

const SubTitle = styled.div<{ color: string }>`
  width: 100%;
  padding: 0 50px;
  margin-top: 5px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.light};

  color: ${({ theme, color }) => (color ? color : theme.colors.grey)};
`;

const StateBox = styled.div<{ color: string }>`
  position: absolute;
  top: -1px;
  right: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 0 10px 0 10px;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
`;

const BookmarkBox = styled.div<{ color: string }>`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 46px;
  height: 46px;

  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-radius: 10px 0 10px 0;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease-in-out;
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
      {state !== "Topic" && state !== "Timeline" && (
        <StateBox color={mainColor}>
          <Icon
            icon={
              state === "Locked"
                ? "lock"
                : state === "InProgress"
                ? "run"
                : state === "Complete"
                ? "check"
                : state === "Chapter"
                ? "culture"
                : "check"
            }
            size={30}
          />
        </StateBox>
      )}

      {state !== "Locked" && state !== "Timeline" && isLoggedIn && (
        <BookmarkBox color={mainColor}>
          <Bookmark isBookmarked={isBookmarked} topicTitle={title} />
        </BookmarkBox>
      )}
    </StyledQuestionMenuItem>
  );
}

export default TopicUI;
