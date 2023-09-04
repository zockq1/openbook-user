import { useEffect, useState } from "react";
import useGetExChapterList from "../../../example/useGetExChapterList";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/CommonTypes";
import MenuTemplate from "../../templates/MenuTemplate";

function JeongJuHaengListPage() {
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

export default JeongJuHaengListPage;

//   지금까지 한 갯수(  ) / (3 + (주제 개수 * 3) + (주제 개수 * 2)) * 100
