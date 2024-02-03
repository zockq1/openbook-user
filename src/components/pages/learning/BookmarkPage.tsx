import { useGetBookmarkedTopicQuery } from "../../../store/api/jjhApi";
import TitleBox from "../../unit/ui/TitleBox";
import KeywordToggleButton from "../../unit/topic/container/KeywordToggleButton";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import { TopicMenuModel } from "../../../types/topicTypes";
import TopicList from "../../unit/topic/container/TopicList";
import BookmarkSideMenu from "../../unit/common/container/BookmarkSideMenu.presenter";
import useQuesryString from "../../../hooks/useQueryString";
import SideAnchorUI from "../../unit/common/presenter/SideAnchorUI";

function BookmarkPage() {
  const {
    data: bookmarkList,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetBookmarkedTopicQuery();
  const { title } = useQuesryString();

  const renderContent = () => {
    if (isLoading) {
      return <Loading image="bookmark" />;
    }

    if (isError && error) {
      return (
        <ErrorUI error={error} message={`북마크 불러오기에 실패하였습니다.`} />
      );
    }

    if (isSuccess && bookmarkList.length === 0) {
      return <EmptyUI message={`북마크가 비었습니다.`} />;
    }

    if (isSuccess) {
      let newMenu: TopicMenuModel[] = [];

      bookmarkList
        .filter((chapter) => (title ? chapter.chapterTitle === title : true))
        .forEach((chapter) => {
          const { topicList, chapterTitle } = chapter;
          newMenu.push({
            title: chapterTitle,
            state: "Divider",
            date: "",
            onClick: () => {},
            isBookmarked: false,
            keywordList: [],
            content: null,
          });
          [...topicList].forEach((item) => {
            const { title, dateComment, keywordList, isBookmarked } = item;
            newMenu.push({
              title: title,
              state: "Topic",
              date: dateComment,
              onClick: () => {},
              isBookmarked,
              keywordList,
              content: null,
            });
          });
        });

      return <TopicList topicList={newMenu} />;
    }
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category="북마크" />
      <ContentLayout
        leftMenu={<BookmarkSideMenu />}
        rightMenu={
          <SideAnchorUI
            anchorList={
              bookmarkList
                ? title
                  ? bookmarkList
                      .find((chapter) => chapter.chapterTitle === title)
                      ?.topicList.map((topic) => topic.title) || []
                  : bookmarkList.map((chapter) => chapter.chapterTitle)
                : []
            }
          />
        }
      >
        <KeywordToggleButton comment keyword />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default withAuth(BookmarkPage);
