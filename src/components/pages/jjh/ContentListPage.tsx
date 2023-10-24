import { useParams } from "react-router-dom";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../../store/api/chapterApi";
import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";

function ContentListPage() {
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: contentList } = useGetContentListQuery(Number(chapter));
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
        case "단원 마무리 문제":
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
      category={String(chapter) + ". " + chapterTitle.title}
    />
  );
}

export default withAuth(ContentListPage);
