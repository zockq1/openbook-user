import { useEffect, useState } from "react";
import useGetExChapterList from "../../../example/useGetExChapterList";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/CommonTypes";
import MenuTemplate from "../../templates/MenuTemplate";

function LearningChapterListPage() {
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
          state: "Open",
          link: `/learning/${item.number}`,
          icon: item.number,
          description: "주제 수: " + item.topicCount,
        };
        return result;
      }),
    ]);

    console.log(chapterList, menuList);
  }, [setMenuList, chapterList]);

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate menuList={menuList} backLink="/" category="학습 자료 모음" />
  );
}

export default LearningChapterListPage;
