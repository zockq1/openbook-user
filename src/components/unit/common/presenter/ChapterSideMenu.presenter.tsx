import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../container/SideMenuUI.container";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import useQuesryString from "../../../../hooks/useQueryString";
import { useGetChapterListQuery } from "../../../../store/api/chapterApi";

function ChapterSideMenu() {
  const { chapterNumber } = useQuesryString();
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
          const { title, number } = item;
          const result: MenuModel = {
            type: "Base",
            id: number,
            state: "Chapter",
            title: title?.toString().split("-")[0].trim(),
            onClickMain: () =>
              navigate(`/learning/chapter?chapter=${number}&title=${title}`),
            onClickSub: () =>
              navigate(`/learning/chapter?chapter=${number}&title=${title}`),
            icon: <span>{number}</span>,
            description: title?.toString().split("-")[1] || null,
          };
          return result;
        })
    );
  }, [setMenuList, chapterList, navigate, theme]);

  return <SideMenuUI menuList={menuList} selectedId={chapterNumber} />;
}

export default ChapterSideMenu;
