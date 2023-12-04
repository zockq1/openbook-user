import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import useQuesryString from "../../../hooks/useQueryString";
import KeywordList from "../../unit/topic/presenter/KeywordList.presenter";
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
import { useGetChapterTopicListQuery } from "../../../store/api/jjhApi";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import TitleBox from "../../unit/ui/TitleBox";
import MenuUI from "../../unit/common/container/MenuUI.container";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";

function ContentListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { chapterNumber, jjhNumber, timelineId, title } = useQuesryString();
  const {
    data: contentList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetContentListQuery(jjhNumber);
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
          return `/jeong-ju-haeng/content/timeline-question?jjh=${jjhNumber}&id=${timelineId}&content=${contentNumber}&title=${title}`;
        case "TOPIC_STUDY":
          return `/jeong-ju-haeng/content/topic-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${title}&content=${contentNumber}&title=${title}`;
        case "CHAPTER_COMPLETE_QUESTION":
          return `/jeong-ju-haeng/content/final-question?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${contentNumber}&title=${title}`;
      }
      return "";
    };

    setMenuList([
      ...contentList.map((item) => {
        const {
          content,
          title,
          state,
          contentNumber,
          dateComment,
          category,
          savedBookmark,
        } = item;
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
              <KeywordList
                keywordList={
                  topicList.find((topic) => topic.title === item.title)
                    ?.keywordList || []
                }
                isBookmarked={savedBookmark}
                topicTitle={title}
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
      return <MenuUI menuList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category={title} />
      <ContentLayout>
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
