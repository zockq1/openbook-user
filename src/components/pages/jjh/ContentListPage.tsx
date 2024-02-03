import { useContext, useEffect, useState } from "react";
import useQuesryString from "../../../hooks/useQueryString";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import TimelineList from "../../unit/timeline/container/TimelineList";
import {
  useGetContentListQuery,
  useUpdateProgressMutation,
} from "../../../store/api/jjhApi";
import { Content } from "../../../types/jjhTypes";
import ChapterInfo from "../../unit/chapter/container/ChapterInfo";
import { useGetChapterTopicListQuery } from "../../../store/api/jjhApi";
import KeywordToggleButton from "../../unit/topic/container/KeywordToggleButton";
import TitleBox from "../../unit/ui/TitleBox";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import { TopicMenuModel } from "../../../types/topicTypes";
import TopicList from "../../unit/topic/container/TopicList";
import JJHSideMenu from "../../unit/common/container/JJHSideMenu.presenter";
import SideAnchorUI from "../../unit/common/presenter/SideAnchorUI";

function ContentListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const {
    chapterNumber,
    jjhNumber,
    timelineId,
    title: contentTitle,
  } = useQuesryString();
  const {
    data: contentList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetContentListQuery(jjhNumber);
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const [menuList, setMenuList] = useState<TopicMenuModel[]>([]);
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
          return `/jeong-ju-haeng/content/timeline-question?jjh=${jjhNumber}&id=${timelineId}&content=${contentNumber}&title=${title}`;
        case "TOPIC_STUDY":
          return `/jeong-ju-haeng/content/topic-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${title}&content=${contentNumber}&title=${title}`;
        case "CHAPTER_COMPLETE_QUESTION":
          return `/jeong-ju-haeng/content/final-question?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${contentNumber}&title=${title}`;
      }
      return "";
    };

    setMenuList([
      ...[...contentList]
        .sort((a, b) => a.contentNumber - b.contentNumber)
        .map((item) => {
          const {
            content,
            title,
            state,
            contentNumber,
            dateComment,
            savedBookmark,
          } = item;
          let result: TopicMenuModel;

          result = {
            title,
            date:
              content === "TIMELINE_STUDY"
                ? contentTitle.split("/")[1]
                : dateComment,
            state,
            content:
              content === "TIMELINE_STUDY" ? (
                <TimelineList id={timelineId} />
              ) : (
                content === "CHAPTER_INFO" && <ChapterInfo />
              ),
            onClick: async () => {
              if (state === "Locked") return;
              if (content === "CHAPTER_INFO") {
                await updateProgres({ contentNumber: contentNumber });
                return;
              }
              navigate(getLink(content, title, contentNumber));
            },
            mainColor:
              state === "Locked"
                ? theme.colors.red
                : state === "Complete"
                ? theme.colors.green
                : state === "InProgress"
                ? theme.colors.blue
                : theme.colors.white,
            isBookmarked: savedBookmark,
            keywordList:
              topicList.find((topic) => topic.title === item.title)
                ?.keywordList || [],
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
    contentTitle,
  ]);

  const renderContent = () => {
    if (isLoading) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`주제 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && contentList.length === 0) {
      return <EmptyUI message={`주제 목록이 비었습니다.`} />;
    }

    if (isSuccess && contentList.length > 0) {
      return <TopicList topicList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category={contentTitle} />
      <ContentLayout
        leftMenu={<JJHSideMenu />}
        rightMenu={
          <SideAnchorUI anchorList={menuList.map((menu) => menu.title)} />
        }
      >
        {timelineId ? (
          <KeywordToggleButton comment />
        ) : (
          <KeywordToggleButton comment keyword />
        )}
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default ContentListPage;
