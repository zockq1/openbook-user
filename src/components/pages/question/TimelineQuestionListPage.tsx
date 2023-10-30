import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";
import calculateGradientColor from "../../../service/calculateGradientColor";
import MenuTemplate from "../../templates/menu/MenuTemplate";

function TimelineQuestionListPage() {
  const navigate = useNavigate();
  const { data: timelineList } = useGetTimelineListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    const avgScore =
      timelineList.reduce((sum, item) => sum + item.score, 0) /
      timelineList.length;

    setMenuList([
      {
        type: "Progress",
        icon: `${Math.floor(avgScore)}점`,
        title: "전체 진행도-취약 연표 풀기",
        subTitle: "전체 연표",
        score: Math.floor(avgScore),
        mainColor: calculateGradientColor(avgScore),
        onClickMain: () => {
          navigate(
            `/question/timeline?id=${
              timelineList.reduce(
                (min, current) => (current.score < min.score ? current : min),
                timelineList[0]
              ).id
            }`
          );
        },
        onClickSub: () => {
          navigate(`/timeline?id=-1&title=전체 연표`);
        },
        important: true,
      },
      ...[...timelineList].map((questionCategory, index, arr) => {
        const { title, id, score, timelineCount } = questionCategory;
        const result: MenuModel = {
          type: "Progress",
          icon: `${Math.floor(score)}점`,
          title: `${title}`,
          subTitle: (
            <>
              <div>연표 보기</div>
              <div>({timelineCount})</div>
            </>
          ),
          score: Math.floor(score),
          mainColor: calculateGradientColor(score),
          onClickMain: () => {
            navigate(`/question/timeline?id=${id}`);
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

  if (!timelineList) {
    return <div>Loading...</div>;
  }
  return <MenuTemplate menuList={questionMenuList} category={"문제 분류"} />;
}

export default TimelineQuestionListPage;
