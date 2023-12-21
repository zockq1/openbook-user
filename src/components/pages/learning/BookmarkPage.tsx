import { useGetBookmarkedTopicQuery } from "../../../store/api/jjhApi";
import TitleBox from "../../unit/ui/TitleBox";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import BookmarkChapter from "../../unit/topic/presenter/BookmarkChapter.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import { TopicMenuModel } from "../../../types/topicTypes";
import TopicList from "../../unit/topic/presenter/TopicList.presenter";

function BookmarkPage() {
  const {
    data: bookmarkList,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetBookmarkedTopicQuery();

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

    if (isSuccess)
      return (
        <>
          {bookmarkList.map((chapter) => {
            const { topicList, chapterTitle } = chapter;
            let newMenu: TopicMenuModel[] = [...topicList].map((item) => {
              const { title, dateComment, keywordList, isBookmarked } = item;
              const result: TopicMenuModel = {
                title: title,
                state: "Topic",
                date: dateComment,
                onClick: () => {},
                isBookmarked,
                keywordList,
                content: null,
              };
              return result;
            });

            return (
              <BookmarkChapter
                chapterTitle={chapterTitle}
                topicCount={topicList.length}
                key={chapterTitle}
              >
                <TopicList topicList={newMenu} />
              </BookmarkChapter>
            );
          })}
        </>
      );
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category="북마크" />
      <ContentLayout width="500px">
        <KeywordToggleButton topic comment keyword />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default withAuth(BookmarkPage);
