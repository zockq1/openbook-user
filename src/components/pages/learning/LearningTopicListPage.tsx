import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import MenuUI from "../../unit/common/container/MenuUI.container";
import { useGetChapterInfoQuery } from "../../../store/api/chapterApi";
import { useGetChapterTopicListQuery } from "../../../store/api/jjhApi";
import KeywordList from "../../unit/topic/presenter/KeywordList.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import ChapterInfo from "../../unit/chapter/presenter/ChapterInfo.presenter";
import useQuesryString from "../../../hooks/useQueryString";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";

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
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList || chapterInfo === undefined) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList].map((item) => {
      const { title, category, dateComment, keywordList, isBookmarked } = item;
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

    if (chapterInfo.content)
      newMenu.unshift({
        type: "Base",
        title: "단원 학습",
        icon: <Icon icon="CHAPTER_INFO" size={22} />,
        description: `${title}`,
        content: <ChapterInfo />,
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
      return <MenuUI menuList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category={title} />
      <ContentLayout>
        <KeywordToggleButton comment keyword />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default LearningTopicListPage;
