import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import MenuUI from "../../unit/common/container/MenuUI.container";
import Topic from "../../unit/topic/presenter/KeywordList.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import useQuesryString from "../../../hooks/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/jjhApi";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";

function QustionCategoryTopicListPage() {
  const theme = useContext(ThemeContext);
  const { timelineId: id, title } = useQuesryString();
  const {
    data: topicList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetQuestionCategoryTopicListQuery(id);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList].map((item) => {
      const { title, category, dateComment } = item;
      const result: MenuModel = {
        type: "Base",
        title: title,
        icon: <Icon icon={category} size={22} />,
        description: `${dateComment}`,
        content: (
          <Topic
            keywordList={item.keywordList}
            isBookmarked={item.isBookmarked}
            topicTitle={item.title}
          />
        ),
      };
      return result;
    });

    setMenuList(newMenu);
  }, [setMenuList, topicList, theme]);

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
      <TitleBox icon="questionSquare" category={title} />
      <ContentLayout>
        <KeywordToggleButton keyword comment />
        {renderContent()}
      </ContentLayout>
    </>
  );
}

export default QustionCategoryTopicListPage;
