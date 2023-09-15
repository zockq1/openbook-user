import { useEffect, useState } from "react";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { useNavigate } from "react-router-dom";

function LearningChapterListPage() {
  const navigate = useNavigate();
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
    <MenuTemplate
      menuList={menuList}
      handleBackPage={() => navigate("/")}
      category="학습 자료 모음"
    />
  );
}

export default LearningChapterListPage;
