import { useEffect, useState } from "react";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";

function TimelineMenuPage() {
  const navigate = useNavigate();
  const { data: timelineList } = useGetTimelineListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    setMenuList([
      {
        title: "전체 연표",
        state: "Open",
        link: `/timeline/-1`,
        icon: "연표 학습",
        description: "BC 700K ~ 현대",
      },
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((timeline, index) => {
          const result: MenuModel = {
            title: `${timeline.era}`,
            state: "Open",
            link: `/timeline/${timeline.id}`,
            icon: index + 1,
            description: `${timeline.startDate} ~ ${timeline.endDate}`,
          };
          return result;
        }),
    ]);
  }, [setMenuList, timelineList]);

  if (!timelineList) {
    return <div>Loading...</div>;
  }

  return (
    <MenuTemplate
      menuList={menuList}
      icon="연표 학습"
      category="연표 학습"
      handleBackPage={() => navigate("/")}
    />
  );
}

export default TimelineMenuPage;
