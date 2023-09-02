import { useParams } from "react-router-dom";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../../store/api/chapterApi";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExContentList from "../../../example/useGetExContentList";
import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/CommonTypes";
import MenuTemplate from "../../templates/MenuTemplate";

function ContentListPage() {
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  // const { data: contentList } = useGetContentListQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: chapterTitle } = useGetExChapterTitle();
  const { data } = useGetExContentList();
  const [contentList] = useState(data);
  /******************************* 예시 코드 *********************************/
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!contentList) {
      return;
    }

    const getLink = (content: string, title: string): string => {
      switch (content) {
        case "단원 학습":
          return `/jeong-ju-haeng/${chapter}/chapter-learning`;
        case "연표 학습":
          return `/jeong-ju-haeng/${chapter}/timeline-learning`;
        case "주제 학습":
          return `/jeong-ju-haeng/${chapter}/topic-learning/${title}`;
        case "단원 마무리 학습":
          return `/jeong-ju-haeng/${chapter}/final-learning`;
      }
      return "";
    };

    setMenuList([
      ...contentList.map((item) => {
        const result: MenuModel = {
          title: item.content,
          state: item.state,
          link: getLink(item.content, item.title),
          icon: item.content,
          description: item.title,
        };
        return result;
      }),
    ]);
  }, [setMenuList, contentList, chapter]);

  if (!contentList || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      backLink="/jeong-ju-haeng"
      category={String(chapter) + ". " + chapterTitle.title}
    />
  );
}

export default ContentListPage;
