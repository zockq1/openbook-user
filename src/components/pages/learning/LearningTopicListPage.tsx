import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { useParams } from "react-router-dom";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
  useGetChapterTopicListQuery,
} from "../../../store/api/chapterApi";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/Topic.presenter";

function LearningTopicListPage() {
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));
  const { data: chapterInfo } = useGetChapterInfoQuery(Number(chapter));
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList || !chapterTitle || chapterInfo === undefined) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList]
      .sort((a, b) => a.number - b.number)
      .map((item) => {
        const result: MenuModel = {
          title: item.title,
          state: "Open",
          icon: item.category,
          description: `${item.dateComment}`,
          content: <Topic topic={item.title} />,
        };
        return result;
      });

    if (chapterInfo.content)
      newMenu.unshift({
        title: "단원 학습",
        state: "Open",
        link: `/learning/${chapter}/chapter-learning`,
        icon: "CHAPTER_INFO",
        description: `${chapterTitle.title}`,
      });

    setMenuList(newMenu);
  }, [setMenuList, topicList, chapter, chapterTitle, chapterInfo]);

  if (!topicList || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      category={String(chapter) + ". " + chapterTitle.title}
    >
      <KeywordToggleButton />
    </MenuTemplate>
  );
}

export default LearningTopicListPage;
