import TitleBox from "../../unit/ui/TitleBox";
import useQuesryString from "../../../hooks/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/jjhApi";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import KeywordToggleButton from "../../unit/topic/container/KeywordToggleButton";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import { TopicMenuModel } from "../../../types/topicTypes";
import TopicList from "../../unit/topic/container/TopicList";
import QuestionCategorySideMenu from "../../unit/common/container/QuestionCategorySideMenu";
import SideAnchorUI from "../../unit/common/presenter/SideAnchorUI";

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
      let newMenu: TopicMenuModel[] = [];

      topicList
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

    return null;
  };

  return (
    <>
      <TitleBox icon="questionSquare" category={title} />
      <ContentLayout
        leftMenu={<QuestionCategorySideMenu />}
        rightMenu={
          <SideAnchorUI
            anchorList={
              topicList
                ? title
                  ? topicList
                      .find((chapter) => chapter.chapterTitle === title)
                      ?.topicList.map((topic) => topic.title) || []
                  : topicList.map((chapter) => chapter.chapterTitle)
                : []
            }
          />
        }
      >
        <KeywordToggleButton keyword comment />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default QustionCategoryTopicListPage;
