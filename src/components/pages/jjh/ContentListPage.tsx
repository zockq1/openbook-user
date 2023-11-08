import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";
import useQuesryString from "../../../service/useQueryString";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/KeywordList.presenter";
import getContentName from "../../../service/getContentName";
import { useNavigate } from "react-router-dom";
import Icon from "../../atoms/icon/Icon";
import { ThemeContext } from "styled-components";
import TimelineList from "../../unit/timeline/presenter/TimelineList.presenter";
import {
  useGetContentListQuery,
  useUpdateProgressMutation,
} from "../../../store/api/jjhApi";
import { Content } from "../../../types/jjhTypes";
import ChapterInfo from "../../unit/chapter/presenter/ChapterInfo.presenter";
import { useGetChapterTopicListQuery } from "../../../store/api/chapterApi";

function ContentListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { chapterNumber, jjhNumber, timelineId, title } = useQuesryString();
  const { data: contentList } = useGetContentListQuery(jjhNumber);
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  const [updateProgres] = useUpdateProgressMutation();
  useEffect(() => {
    if (!contentList || !topicList) {
      return;
    }

    const getLink = (
      contentName: Content,
      title: string,
      contentNumber: number
    ): string => {
      switch (contentName) {
        case "TIMELINE_STUDY":
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
        const { content, title, state, contentNumber, dateComment, category } =
          item;
        let result: MenuModel;

        result = {
          type: "Qustion",
          title:
            content === "TOPIC_STUDY"
              ? title
              : content === "TIMELINE_STUDY"
              ? title.split("(")[0]
              : getContentName(content),
          description:
            content === "TIMELINE_STUDY"
              ? title.split("(")[1].split(")")[0]
              : dateComment,
          state,
          icon:
            category !== null ? (
              <Icon icon={category} size={22} />
            ) : (
              <Icon icon={content} size={22} />
            ),
          content:
            content === "TOPIC_STUDY" ? (
              <Topic
                keywordList={
                  topicList.find((topic) => topic.title === item.title)
                    ?.keywordList || []
                }
                key={item.title}
              />
            ) : content === "TIMELINE_STUDY" ? (
              <TimelineList id={timelineId} />
            ) : (
              content === "CHAPTER_INFO" && <ChapterInfo />
            ),
          onClickSub: async () => {
            if (state === "Locked") return;
            if (content === "CHAPTER_INFO") {
              await updateProgres({ contentNumber: contentNumber });
              return;
            }
            navigate(getLink(content, title, contentNumber));
          },
          onClickMain: async () => {
            if (state === "Locked") return;
            if (content === "CHAPTER_INFO") {
              await updateProgres({ contentNumber: contentNumber });
              return;
            }
            navigate(getLink(content, title, contentNumber));
          },
          subTitle:
            state === "Locked" ? (
              <Icon icon="lock" color={theme.colors.white} size={40} />
            ) : state === "Complete" ? (
              <Icon icon="check" color={theme.colors.white} size={40} />
            ) : (
              state === "InProgress" && (
                <Icon icon="run" color={theme.colors.white} size={40} />
              )
            ),
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : state === "Complete"
              ? theme.colors.green
              : state === "InProgress"
              ? theme.colors.blue
              : theme.colors.white,
          important: state === "InProgress",
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
    updateProgres,
    topicList,
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
