import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/KeywordList.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import useQuesryString from "../../../service/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/jjhApi";

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

  if (!topicList) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <TitleBox icon="questionSquare" category={title} />
      <MainContentLayout>
        <KeywordToggleButton />
        <MenuUI menuList={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default QustionCategoryTopicListPage;
