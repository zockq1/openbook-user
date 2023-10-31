import { useContext, useEffect, useState } from "react";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { MenuModel } from "../../../types/commonTypes";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";

function TimelineMenuPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: timelineList } = useGetTimelineListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    setMenuList([
      {
        type: "Base",
        title: "전체 연표",
        onClickMain: () => navigate(`/timeline?id=-1&title=전체 연표`),
        icon: <Icon icon="TIMELINE_STUDY" />,
        description: "BC 700K ~ 현대",
        mainColor: theme.colors.white,
      },
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((timeline, index) => {
          const result: MenuModel = {
            type: "Base",
            title: `${timeline.era}`,
            onClickMain: () =>
              navigate(`/timeline?id=${timeline.id}&title=${timeline.title}`),
            icon: index + 1,
            description: `${timeline.startDate / 10000} ~ ${
              timeline.endDate / 10000
            }`,
            mainColor: theme.colors.white,
          };
          return result;
        }),
    ]);
  }, [setMenuList, timelineList, theme, navigate]);

  if (!timelineList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      icon="TIMELINE_STUDY"
      category="연표 학습"
    />
  );
}

export default TimelineMenuPage;
