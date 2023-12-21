import TitleBox from "../../unit/ui/TitleBox";
import useQuesryString from "../../../hooks/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/jjhApi";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import BookmarkChapter from "../../unit/topic/presenter/BookmarkChapter.presenter";
import { TopicMenuModel } from "../../../types/topicTypes";
import TopicList from "../../unit/topic/presenter/TopicList.presenter";

function QustionCategoryTopicListPage() {
  const { timelineId: id, title } = useQuesryString();
  const {
    data: topicList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetQuestionCategoryTopicListQuery(id);

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

    if (isSuccess && topicList.length === 0) {
      return <EmptyUI message={`주제 목록이 비었습니다.`} />;
    }

    if (isSuccess && topicList.length > 0) {
      return (
        <>
          {topicList.map((chapter) => {
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
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="questionSquare" category={title} />
      <ContentLayout width="500px">
        <KeywordToggleButton keyword comment />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default QustionCategoryTopicListPage;
