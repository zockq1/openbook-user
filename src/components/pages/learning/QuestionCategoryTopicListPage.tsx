import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import MenuUI from "../../unit/common/container/MenuUI.container";
import useQuesryString from "../../../hooks/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/jjhApi";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import KeywordList from "../../unit/topic/presenter/KeywordList.presenter";
import BookmarkChapter from "../../unit/topic/presenter/BookmarkChapter.presenter";

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
            let newMenu: MenuModel[] = [...topicList].map((item) => {
              const {
                title,
                category,
                dateComment,
                keywordList,
                isBookmarked,
              } = item;
              const result: MenuModel = {
                type: "Base",
                title: title,
                icon: category,
                description: `${dateComment}`,
                content: (
                  <KeywordList
                    keywordList={keywordList}
                    topicTitle={title}
                    isBookmarked={isBookmarked}
                    state="Topic"
                    onClickQuestion={() => {}}
                  />
                ),
              };
              return result;
            });

            return (
              <BookmarkChapter
                chapterTitle={chapterTitle}
                topicCount={topicList.length}
                key={chapterTitle}
              >
                <MenuUI menuList={newMenu} />
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
      <ContentLayout>
        <KeywordToggleButton keyword comment />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default QustionCategoryTopicListPage;
