import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetChapterTitleQuery,
  useGetChapterTopicListQuery,
} from "../../../store/api/chapterApi";

function LearningTopicListPage() {
  const navigate = useNavigate();
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
          description: `${item.dateComment}`,
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
      handleBackPage={() => navigate("/")}
      category={String(chapter) + ". " + chapterTitle.title}
    />
  );
}

export default LearningTopicListPage;
