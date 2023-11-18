import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import Topic from "../../unit/topic/presenter/KeywordList.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import useQuesryString from "../../../service/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/jjhApi";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";

function QustionCategoryTopicListPage() {
  const theme = useContext(ThemeContext);
  const { timelineId: id, title } = useQuesryString();
  const { data: topicList } = useGetQuestionCategoryTopicListQuery(id);
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

  if (menuList.length === 0) {
    return (
      <Layout>
        <TitleBox icon="questionSquare" category={title} />
        <MainContentLayout>
          <KeywordToggleButton keyword comment />
          <MenuSkeletonListUI />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="questionSquare" category={title} />
      <MainContentLayout>
        <KeywordToggleButton keyword comment />
        <MenuUI menuList={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default QustionCategoryTopicListPage;
