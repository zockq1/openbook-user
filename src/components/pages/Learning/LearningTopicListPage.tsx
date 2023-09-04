import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/CommonTypes";
import useGetExTopicList from "../../../example/useGetExTopicList";
import MenuTemplate from "../../templates/MenuTemplate";
import { useParams } from "react-router-dom";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import { useGetChapterTitleQuery } from "../../../store/api/chapterApi";

function LearningTopicListPage() {
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  //const { data: chapterTitle } = useGetExChapterTitle();
  const { data } = useGetExTopicList();
  const [topicList] = useState(data);
  /******************************* 예시 코드 *********************************/
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
  }, [setMenuList, topicList, chapter]);

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
