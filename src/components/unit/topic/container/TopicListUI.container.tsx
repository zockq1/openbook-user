import styled from "styled-components";
import { MenuModel } from "../../../../types/commonTypes";
import { ColumnList } from "../../../atoms/layout/List";
import Icon from "../../../atoms/icon/Icon";
import Bookmark from "../presenter/Bookmark.presenter";
import { ContentState } from "../../../../types/jjhTypes";

interface MenuUIProps {
  menuList: MenuModel[];
}

const StyledQuestionMenuItem = styled.div<{
  color: string;
  state: ContentState;
}>`
  position: relative;
  display: flex;
  height: 65px;
  padding: ${({ theme }) => theme.padding.base};
  margin: ${({ theme }) => theme.margin.base};
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: ${({ state }) =>
    state === "Locked" ? "10px" : "10px 10px 0 0"};

  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Description = styled.div`
  width: 100%;
`;

const Title = styled.div<{ color: string }>`
  width: 100%;
  padding: 0 50px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ color }) => color};
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

const StateBox = styled.div<{ color: string; important: boolean }>`
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

function TopicList({ menuList }: MenuUIProps) {
  return (
    <ColumnList>
      {menuList.map((menu, index) => {
        const {
          title,
          description,
          state = "Topic",
          content = null,
          mainColor = "",
          important = false,
          isBookmarked = false,
          topicTitle = "",
        } = menu;
        return (
          <li key={index}>
            <StyledQuestionMenuItem state={state} color={mainColor}>
              <Description>
                <Title color={state === "Locked" ? mainColor : ""}>
                  {title}
                </Title>
                <SubTitle color={state === "Locked" ? mainColor : ""}>
                  {description}
                </SubTitle>
              </Description>
              {state !== "Topic" && (
                <StateBox color={mainColor} important={important}>
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
                        : state === "Timeline"
                        ? "TIMELINE_STUDY"
                        : "check"
                    }
                    size={30}
                  />
                </StateBox>
              )}

              {state !== "Locked" && (
                <BookmarkBox color={mainColor}>
                  <Bookmark
                    isBookmarked={isBookmarked}
                    topicTitle={topicTitle}
                  />
                </BookmarkBox>
              )}
            </StyledQuestionMenuItem>
            {state !== "Locked" && content}
          </li>
        );
      })}
    </ColumnList>
  );
}

export default TopicList;
