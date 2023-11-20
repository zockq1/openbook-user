import { useGetBookmarkedTopicQuery } from "../../../store/api/jjhApi";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import Icon from "../../atoms/icon/Icon";
import KeywordList from "../../unit/topic/presenter/KeywordList.presenter";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import BookmarkChapter from "../../unit/topic/presenter/BookmarkChapter.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

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
      return <EmptyUI message={`오답노트가 비었습니다.`} />;
    }

    if (isSuccess)
      return (
        <>
          {bookmarkList.map((chapter) => {
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
                icon: <Icon icon={category} size={22} />,
                description: `${dateComment}`,
                content: (
                  <KeywordList
                    keywordList={keywordList}
                    topicTitle={title}
                    isBookmarked={isBookmarked}
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
  };

  return (
    <Layout>
      <TitleBox icon="TOPIC_STUDY" category="북마크" />
      <MainContentLayout>
        <KeywordToggleButton topic comment keyword />
        {renderContent()}
      </MainContentLayout>
    </Layout>
  );
}

export default BookmarkPage;
