import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { useGetBookmarkedTopicQuery } from "../../../../store/api/jjhApi";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../container/SideMenuUI.container";
import useQuesryString from "../../../../hooks/useQueryString";

function BookmarkSideMenu() {
  const navigate = useNavigate();
  const { title } = useQuesryString();
  const theme = useContext(ThemeContext);
  const { data: bookmarkList } = useGetBookmarkedTopicQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!bookmarkList) {
      return;
    }

    let totalLength = bookmarkList.reduce(
      (acc, cur) => cur.topicList.length + acc,
      0
    );

    setMenuList([
      {
        type: "Base",
        id: "",
        state: "Chapter",
        title: `전체(${totalLength})`,
        onClickMain: () => navigate(`/my-info/bookmark`),
        icon: <></>,
      },
      ...[...bookmarkList].map((item) => {
        const { chapterTitle, topicList } = item;
        const result: MenuModel = {
          type: "Base",
          id: chapterTitle,
          state: "Chapter",
          title: `${chapterTitle}(${topicList.length})`,
          onClickMain: () =>
            navigate(`/my-info/bookmark?&title=${chapterTitle}`),
          icon: <></>,
        };
        return result;
      }),
    ]);
  }, [setMenuList, navigate, theme, bookmarkList]);

  return <SideMenuUI menuList={menuList} selectedId={title} />;
}

export default BookmarkSideMenu;
