import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import KeywordToggleButton from "../../atoms/button/KeywordToggleButton";
import Topic from "../../unit/topic/presenter/Topic.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import useQuesryString from "../../../service/useQueryString";
import { useGetQuestionCategoryTopicListQuery } from "../../../store/api/topicApi";

function QustionCategoryTopicListPage() {
  const theme = useContext(ThemeContext);
  const { timelineId: id, title } = useQuesryString();
  const { data: topicList } = useGetQuestionCategoryTopicListQuery(id);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList]
      .sort((a, b) => a.number - b.number)
      .map((item) => {
        const { title, category, dateComment } = item;
        const result: MenuModel = {
          type: "Base",
          title: title,
          icon: <Icon icon={category} />,
          description: `${dateComment}`,
          content: <Topic topic={title} />,
          mainColor: theme.colors.white,
        };
        return result;
      });

    setMenuList(newMenu);
  }, [setMenuList, topicList, theme]);

  if (!topicList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate menuList={menuList} category={title}>
      <KeywordToggleButton />
    </MenuTemplate>
  );
}

export default QustionCategoryTopicListPage;
