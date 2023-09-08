import { useEffect, useState } from "react";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/CommonTypes";
import MenuTemplate from "../../templates/MenuTemplate";

function LearningChapterListPage() {
  const { data: chapterList } = useGetChaptersQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList([
      ...chapterList.map((item) => {
        const result: MenuModel = {
          title: item.title,
          state: "Open",
          link: `/learning/${item.number}`,
          icon: item.number,
          description: "주제 수: " + item.topicCount,
        };
        return result;
      }),
    ]);
  }, [setMenuList, chapterList]);

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate menuList={menuList} backLink="/" category="학습 자료 모음" />
  );
}

export default LearningChapterListPage;
