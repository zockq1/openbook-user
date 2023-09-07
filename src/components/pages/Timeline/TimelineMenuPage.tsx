import { useEffect, useState } from "react";
import useGetExChapterList from "../../../example/useGetExChapterList";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import MenuTemplate from "../../templates/MenuTemplate";
import { MenuModel } from "../../../types/CommonTypes";

function TimelineMenuPage() {
  /******************************* 실제 코드 *********************************/
  const { data: chapterList } = useGetChaptersQuery();
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  // const { data } = useGetExChapterList();
  // const [chapterList] = useState(data);
  /******************************* 예시 코드 *********************************/
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

  return <MenuTemplate menuList={menuList} category="연표 학습" backLink="/" />;
}

export default TimelineMenuPage;
