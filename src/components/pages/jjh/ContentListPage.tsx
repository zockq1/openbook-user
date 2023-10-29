import { useGetContentListQuery } from "../../../store/api/chapterApi";
import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";
import { Content } from "../../../types/chapterTypes";
import useQuesryString from "../../../service/useQueryString";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/Topic.presenter";
import getContentName from "../../../service/getContentName";
import { useNavigate } from "react-router-dom";
import Icon from "../../atoms/icon/Icon";
import { ThemeContext } from "styled-components";

function ContentListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
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
        const { content, title, state, contentNumber } = item;
        let result: MenuModel;
        result = {
          type: "Qustion",
          title: content === "TOPIC_STUDY" ? title : getContentName(content),
          state,
          icon: <Icon icon={content} />,
          content: content === "TOPIC_STUDY" && (
            <Topic topic={item.title} key={item.title} />
          ),
          subTitle:
            state === "Locked" ? (
              <Icon icon="lock" color={theme.colors.white} size={40} />
            ) : (
              "문제 풀기"
            ),
          mainColor: state === "Locked" ? theme.colors.red : theme.colors.blue,
          onClickSub: () =>
            state !== "Locked" &&
            navigate(getLink(content, title, contentNumber)),
        };

        return result;
      }),
    ]);
  }, [
    setMenuList,
    contentList,
    chapterNumber,
    timelineId,
    jjhNumber,
    theme,
    navigate,
  ]);

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
