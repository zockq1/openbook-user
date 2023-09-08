import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/CommonTypes";
import MenuTemplate from "../../templates/MenuTemplate";
import { useParams } from "react-router-dom";
import {
  useGetChapterTitleQuery,
  useGetChapterTopicListQuery,
} from "../../../store/api/chapterApi";

function LearningTopicListPage() {
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList) {
      return;
    }

    setMenuList([
      {
        title: "단원 학습",
        state: "Open",
        link: `/learning/${chapter}/chapter-learning`,
        icon: "단원 학습",
        description: `${chapterTitle?.title}`,
      },
      ...topicList.map((item) => {
        const result: MenuModel = {
          title: item.title,
          state: "Open",
          link: `/learning/${chapter}/${item.title}`,
          icon: item.category,
          description: `${item.startDate || "???"}년 ~ ${
            item.endDate || "???"
          }년`,
        };
        return result;
      }),
    ]);
  }, [setMenuList, topicList, chapter, chapterTitle]);

  if (!topicList || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      backLink="/"
      category={String(chapter) + ". " + chapterTitle.title}
    />
  );
}

export default LearningTopicListPage;
