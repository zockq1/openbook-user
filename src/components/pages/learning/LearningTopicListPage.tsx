import { useContext, useEffect, useState } from "react";
import TitleBox from "../../unit/ui/TitleBox";
import { useGetChapterInfoQuery } from "../../../store/api/chapterApi";
import { useGetChapterTopicListQuery } from "../../../store/api/jjhApi";
import { ThemeContext } from "styled-components";
import ChapterInfo from "../../unit/chapter/presenter/ChapterInfo.presenter";
import useQuesryString from "../../../hooks/useQueryString";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import { TopicMenuModel } from "../../../types/topicTypes";
import TopicList from "../../unit/topic/presenter/TopicList.presenter";
import SideAnchorUI from "../../unit/common/container/SideAnchorUi.container";
import ChapterSideMenu from "../../unit/common/presenter/ChapterSideMenu.presenter";

function LearningTopicListPage() {
  const theme = useContext(ThemeContext);
  const { chapterNumber, title } = useQuesryString();
  const {
    data: topicList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetChapterTopicListQuery(chapterNumber);
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);
  const [menuList, setMenuList] = useState<TopicMenuModel[]>([]);

  useEffect(() => {
    if (!topicList || chapterInfo === undefined) {
      return;
    }

    let newMenu: TopicMenuModel[] = [...topicList].map((item) => {
      const { title, dateComment, keywordList, isBookmarked } = item;
      const result: TopicMenuModel = {
        title: title,
        date: dateComment,
        onClick: () => {},
        isBookmarked,
        keywordList,
        state: "Topic",
        content: null,
      };
      return result;
    });

    if (chapterInfo.content)
      newMenu.unshift({
        title: "단원 학습",
        date: `${title}`,
        content: <ChapterInfo />,
        state: "Chapter",
        isBookmarked: false,
        keywordList: [],
        onClick: () => {},
      });

    setMenuList(newMenu);
  }, [setMenuList, topicList, chapterNumber, title, chapterInfo, theme]);

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
      return <TopicList topicList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category={title} />
      <ContentLayout
        leftMenu={<ChapterSideMenu />}
        rightMenu={
          <SideAnchorUI anchorList={menuList.map((menu) => menu.title)} />
        }
      >
        <KeywordToggleButton comment keyword />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default LearningTopicListPage;
