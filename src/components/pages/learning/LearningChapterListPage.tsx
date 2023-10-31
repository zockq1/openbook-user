import { useContext, useEffect, useState } from "react";
import { useGetChapterListQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";

function LearningChapterListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: chapterList } = useGetChapterListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList(
      [...chapterList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          const { title, number, topicCount } = item;
          const result: MenuModel = {
            type: "Base",
            title: title,
            onClickMain: () => navigate(`/learning/chapter?chapter=${number}`),
            onClickSub: () => navigate(`/learning/chapter?chapter=${number}`),
            mainColor: theme.colors.white,
            icon: number,
            description: "주제 수: " + topicCount,
          };
          return result;
        })
    );
  }, [setMenuList, chapterList, navigate, theme]);

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return <MenuTemplate menuList={menuList} category="학습 자료 모음" />;
}

export default LearningChapterListPage;
