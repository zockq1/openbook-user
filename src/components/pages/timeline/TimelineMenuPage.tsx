import { useEffect, useState } from "react";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";

function TimelineMenuPage() {
  const navigate = useNavigate();
  const { data: chapterList } = useGetChaptersQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList([
      {
        title: "전체 연표",
        state: "Open",
        link: `/timeline/0`,
        icon: "연표 학습",
        description: "??? ~ 2023년",
      },
      ...chapterList.map((item) => {
        const result: MenuModel = {
          title: item.title,
          state: "Open",
          link: `/timeline/${item.number}`,
          icon: item.number,
          description: `${item.startDate || "???"}년 ~ ${
            item.endDate || "???"
          }년`,
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
      category="연표 학습"
      handleBackPage={() => navigate("/")}
    />
  );
}

export default TimelineMenuPage;
