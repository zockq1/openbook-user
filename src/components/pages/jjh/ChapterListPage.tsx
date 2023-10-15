import { useEffect, useState } from "react";
import { useGetJJHChaptersQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { useNavigate } from "react-router-dom";
import withAuth from "../../../hoc/withAuth";
import { JJHChapterModel } from "../../../types/chapterTypes";

function ChapterListPage() {
  const navigate = useNavigate();
  const { data: chapterList } = useGetJJHChaptersQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList(
      [...chapterList]
        .sort((a, b) => a.number - b.number)
        .map((item: JJHChapterModel) => {
          const result: MenuModel = {
            title: item.title,
            state: item.state,
            link: `/jeong-ju-haeng/${item.number}`,
            icon: item.number,
            description: "진행도: " + item.progress,
          };
          return result;
        })
    );
  }, [setMenuList, chapterList]);

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      handleBackPage={() => navigate("/")}
      category="정주행"
    />
  );
}

export default withAuth(ChapterListPage);
