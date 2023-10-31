import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
  useGetChapterTopicListQuery,
} from "../../../store/api/chapterApi";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/Topic.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import ChapterInfo from "../../unit/chapter/presenter/ChapterInfo.presenter";
import useQuesryString from "../../../service/useQueryString";

function LearningTopicListPage() {
  const theme = useContext(ThemeContext);
  const { chapterNumber } = useQuesryString();
  const { data: chapterTitle } = useGetChapterTitleQuery(chapterNumber);
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList || !chapterTitle || chapterInfo === undefined) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList]
      .sort((a, b) => a.number - b.number)
      .map((item) => {
        const { title, category, dateComment } = item;
        const result: MenuModel = {
          type: "Base",
          title: title,
          icon: <Icon icon={category} />,
          description: `${dateComment}`,
          content: <Topic topic={title} />,
          mainColor: theme.colors.white,
        };
        return result;
      });

    if (chapterInfo.content)
      newMenu.unshift({
        type: "Base",
        title: "단원 학습",
        icon: <Icon icon="CHAPTER_INFO" />,
        description: `${chapterTitle.title}`,
        mainColor: theme.colors.white,
        content: <ChapterInfo />,
      });

    setMenuList(newMenu);
  }, [setMenuList, topicList, chapterNumber, chapterTitle, chapterInfo, theme]);

  if (!topicList || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      category={String(chapterNumber) + ". " + chapterTitle.title}
    >
      <KeywordToggleButton />
    </MenuTemplate>
  );
}

export default LearningTopicListPage;
