import { useEffect, useState } from "react";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../presenter/SideMenuUI";
import { useNavigate } from "react-router-dom";
import useQuesryString from "../../../../hooks/useQueryString";
import { useGetTimelineListQuery } from "../../../../store/api/timelineApi";

function TimelineQuestionSideMenu() {
  const { timelineId } = useQuesryString();
  const navigate = useNavigate();
  const { data: timelineList } = useGetTimelineListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    const avgScore =
      timelineList.reduce((sum, item) => sum + item.score, 0) /
      timelineList.length;

    setMenuList([
      {
        id: -1,
        type: "Progress",
        icon: `${Math.floor(avgScore)}%`,
        title: "전체 연표",
        subTitle: "전체 연표",
        score: Math.floor(avgScore),
        onClickMain: () => {
          navigate(`/question/timeline?id=${-1}&title=전체 연표`);
        },
        important: true,
      },
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((questionCategory, index, arr) => {
          const { title, id, score, startDate, endDate } = questionCategory;
          const result: MenuModel = {
            id,
            type: "Progress",
            icon: `${Math.floor(score)}%`,
            description: `${Math.floor(startDate / 10000)} ~ ${Math.floor(
              endDate / 10000
            )}`,
            title: `${title}`,
            subTitle: <div>연표 보기</div>,
            score: Math.floor(score),
            onClickMain: () => {
              navigate(`/question/timeline?id=${id}&title=${title}`);
            },
            onClickSub: () => {
              navigate(`/timeline?id=${id}&title=${title}`);
            },

            important: false,
          };

          return result;
        }),
    ]);
  }, [setMenuList, timelineList, navigate]);

  return <SideMenuUI menuList={menuList} selectedId={Number(timelineId)} />;
}

export default TimelineQuestionSideMenu;
