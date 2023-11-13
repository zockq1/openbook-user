import { useGetBookmarkedTopicQuery } from "../../../store/api/jjhApi";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import Icon from "../../atoms/icon/Icon";
import KeywordList from "../../unit/topic/presenter/KeywordList.presenter";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import BookmarkChapter from "../../unit/topic/presenter/BookmarkChapter.presenter";

function BookmarkPage() {
  const { data: bookmarkList } = useGetBookmarkedTopicQuery();

  if (!bookmarkList) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <TitleBox icon="TOPIC_STUDY" category="북마크" />
      <MainContentLayout>
        <KeywordToggleButton topic comment keyword />
        {bookmarkList.map((chapter) => {
          const { topicList, chapterTitle } = chapter;
          let newMenu: MenuModel[] = [...topicList].map((item) => {
            const { title, category, dateComment, keywordList, isBookmarked } =
              item;
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
            >
              <MenuUI menuList={newMenu} />
            </BookmarkChapter>
          );
        })}
      </MainContentLayout>
    </Layout>
  );
}

export default BookmarkPage;
