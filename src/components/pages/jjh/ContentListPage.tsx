import { useGetContentListQuery } from "../../../store/api/chapterApi";
import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";
import { Content } from "../../../types/chapterTypes";
import getContentName from "../../../service/getContentName";
import useQuesryString from "../../../service/useQueryString";

function ContentListPage() {
  const { chapterNumber, jjhNumber, timelineId, title } = useQuesryString();
  const { data: contentList } = useGetContentListQuery(jjhNumber);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!contentList) {
      return;
    }

    const getLink = (
      contentName: Content,
      title: string,
      contentNumber: number
    ): string => {
      switch (contentName) {
        case "CHAPTER_INFO":
          return `/jeong-ju-haeng/content/chapter-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${contentNumber}`;
        case "TIMELINE_STUDY":
          return `/jeong-ju-haeng/content/timeline-learning?jjh=${jjhNumber}&id=${timelineId}&content=${contentNumber}&title${title}`;
        case "TIMELINE_QUESTION":
          return `/jeong-ju-haeng/content/timeline-question?jjh=${jjhNumber}&id=${timelineId}&content=${contentNumber}&title${title}`;
        case "TOPIC_STUDY":
          return `/jeong-ju-haeng/content/topic-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${title}&content=${contentNumber}`;
        case "CHAPTER_COMPLETE_QUESTION":
          return `/jeong-ju-haeng/content/final-question?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${contentNumber}`;
      }
      return "";
    };

    setMenuList([
      ...contentList.map((item) => {
        const result: MenuModel = {
          title: getContentName(item.content),
          state: item.state,
          link: getLink(item.content, item.title, item.contentNumber),
          icon: item.content,
          description: item.title,
        };
        return result;
      }),
    ]);
  }, [setMenuList, contentList, chapterNumber, timelineId, jjhNumber]);

  if (!contentList) {
    return <div>Loading...</div>;
  }

  return <MenuTemplate menuList={menuList} category={title} />;
}

export default withAuth(ContentListPage);
