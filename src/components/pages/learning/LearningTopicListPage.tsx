import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";
import { useGetChapterTopicListQuery } from "../../../store/api/jjhApi";
import Topic from "../../unit/topic/presenter/KeywordList.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import ChapterInfo from "../../unit/chapter/presenter/ChapterInfo.presenter";
import useQuesryString from "../../../service/useQueryString";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";

function LearningTopicListPage() {
  const theme = useContext(ThemeContext);
  const { chapterNumber } = useQuesryString();
  const { data: chapterTitle } = useGetChapterTitleQuery(chapterNumber);
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  console.log(topicList);

  useEffect(() => {
    if (!topicList || !chapterTitle || chapterInfo === undefined) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList]
      .sort((a, b) => a.number - b.number)
      .map((item) => {
        const { title, category, dateComment, keywordList, savedBookmark } =
          item;
        const result: MenuModel = {
          type: "Base",
          title: title,
          icon: <Icon icon={category} size={22} />,
          description: `${dateComment}`,
          content: (
            <Topic
              keywordList={keywordList}
              topicTitle={title}
              isBookmarked={savedBookmark}
            />
          ),
        };
        return result;
      });

    if (chapterInfo.content)
      newMenu.unshift({
        type: "Base",
        title: "단원 학습",
        icon: <Icon icon="CHAPTER_INFO" size={22} />,
        description: `${chapterTitle.title}`,
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
