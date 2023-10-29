import { useGetContentListQuery } from "../../../store/api/chapterApi";
import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";
import { Content } from "../../../types/chapterTypes";
import useQuesryString from "../../../service/useQueryString";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/Topic.presenter";
import getContentName from "../../../service/getContentName";

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
          return `/jeong-ju-haeng/content/topic-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${title}&content=${contentNumber}&title${title}`;
        case "CHAPTER_COMPLETE_QUESTION":
          return `/jeong-ju-haeng/content/final-question?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${contentNumber}`;
      }
      return "";
    };

    setMenuList([
      ...contentList.map((item) => {
        const result: MenuModel = {
          title:
            item.content === "TOPIC_STUDY"
              ? item.title
              : getContentName(item.content),
          state: item.state,
          link: getLink(item.content, item.title, item.contentNumber),
          icon: item.content,
          content:
            item.content === "TOPIC_STUDY" ? (
              <Topic topic={item.title} key={item.title} />
            ) : null,
        };
        return result;
      }),
    ]);
  }, [setMenuList, contentList, chapterNumber, timelineId, jjhNumber]);

  if (!contentList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate menuList={menuList} category={title}>
      <KeywordToggleButton />
    </MenuTemplate>
  );
}

export default withAuth(ContentListPage);
