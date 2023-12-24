import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../container/SideMenuUI.container";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import useQuesryString from "../../../../hooks/useQueryString";
import Icon from "../../../atoms/icon/Icon";
import { useGetTimelineListQuery } from "../../../../store/api/timelineApi";

function TimelineSideMenu() {
  const { timelineId } = useQuesryString();
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
        id: -1,
        title: "전체 연표",
        onClickMain: () =>
          navigate(`/timeline?id=-1&title=전체 연표/BC 700K ~ 현대`),
        icon: <Icon icon="TIMELINE_STUDY" size={22} />,
        description: "BC 700K ~ 현대",
      },
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((timeline, index) => {
          const result: MenuModel = {
            type: "Base",
            id: timeline.id,
            title: `${timeline.title}`,
            onClickMain: () =>
              navigate(
                `/timeline?id=${timeline.id}&title=${timeline.title}/${
                  timeline.startDate / 10000
                } ~ ${timeline.endDate / 10000}`
              ),
            icon: <Icon icon="TIMELINE_STUDY" size={22} />,
            description: `${timeline.startDate / 10000} ~ ${
              timeline.endDate / 10000
            }`,
          };
          return result;
        }),
    ]);
  }, [setMenuList, timelineList, theme, navigate]);

  return <SideMenuUI menuList={menuList} selectedId={timelineId} />;
}

export default TimelineSideMenu;
