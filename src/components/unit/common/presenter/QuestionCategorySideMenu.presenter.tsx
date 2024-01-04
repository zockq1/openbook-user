import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { useGetQuestionCategoryTopicListQuery } from "../../../../store/api/jjhApi";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../container/SideMenuUI.container";
import useQuesryString from "../../../../hooks/useQueryString";

function QuestionCategorySideMenu() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { timelineId: id, title } = useQuesryString();
  const { data: topicList } = useGetQuestionCategoryTopicListQuery(id);

  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList) {
      return;
    }

    let totalLength = topicList.reduce(
      (acc, cur) => cur.topicList.length + acc,
      0
    );

    setMenuList([
      {
        type: "Base",
        id: "",
        state: "Chapter",
        title: `전체(${totalLength})`,
        onClickMain: () => navigate(`/question/topic-list?id=${id}`),
        icon: <></>,
      },
      ...[...topicList].map((item) => {
        const { chapterTitle, topicList } = item;
        const result: MenuModel = {
          type: "Base",
          id: chapterTitle,
          state: "Chapter",
          title: `${chapterTitle}(${topicList.length})`,
          onClickMain: () =>
            navigate(`/question/topic-list?id=${id}&title=${chapterTitle}`),
          icon: <></>,
        };
        return result;
      }),
    ]);
  }, [setMenuList, navigate, theme, topicList, id]);

  return <SideMenuUI menuList={menuList} selectedId={title} />;
}

export default QuestionCategorySideMenu;
