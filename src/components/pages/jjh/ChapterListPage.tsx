import { useEffect, useState } from "react";
import { useGetJJHChaptersQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";

function ChapterListPage() {
  const { data: chapterList } = useGetJJHChaptersQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList([
      ...chapterList.map((item) => {
        const result: MenuModel = {
          title: item.title,
          state: item.state,
          link: `/jeong-ju-haeng/${item.number}`,
          icon: item.number,
          description: "진행도: " + item.progress,
        };
        return result;
      }),
    ]);
  }, [setMenuList, chapterList]);

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return <MenuTemplate menuList={menuList} backLink="/" category="정주행" />;
}

export default ChapterListPage;
