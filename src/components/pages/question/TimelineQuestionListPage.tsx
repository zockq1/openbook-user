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

    // const avgScore =
    //   timelineList.reduce((sum, item) => sum + item.score, 0) /
    //   timelineList.length;

    setMenuList([
      {
        type: "Progress",
        icon: `${38}점`,
        title: "전체 진행도-취약 연표 풀기",
        subTitle: "전체 연표",
        score: 38,
        mainColor: calculateGradientColor(38),
        // score: avgScore,
        // color: calculateGradientColor(avgScore),
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
          navigate("/timeline/-1");
        },
        important: true,
      },
      ...[...timelineList].map((questionCategory, index, arr) => {
        //const { title, id, score } = questionCategory;
        const { title, id } = questionCategory;
        const scoreList = [
          56, 33, 77, 3, 20, 93, 11, 0, 83, 65, 45, 88, 72, 41, 4, 85, 64, 53,
          86, 85, 26, 65, 6, 85, 0, 34, 96, 11, 33, 63, 79, 2, 94, 50, 23, 96,
          29, 55, 88, 63, 40, 95, 32, 10, 79, 61, 74, 90, 72, 60, 12, 26, 48,
          45, 58, 29, 16, 80, 12, 52, 86, 99, 68, 67, 95, 78, 38, 48, 9, 76, 82,
          32, 86, 69, 16, 33, 71, 11, 83, 4, 63, 100, 83, 17, 9, 79, 82, 89, 60,
          55, 33, 12, 52, 22, 88, 79, 63, 59, 95, 30,
        ];
        const score = scoreList[index];
        const result: MenuModel = {
          type: "Progress",
          icon: `${score}점`,
          title: `${title}`,
          subTitle: `해당 연표`,
          score: score,
          mainColor: calculateGradientColor(score),
          onClickMain: () => {
            navigate(`/question/timeline?id=${id}`);
          },
          onClickSub: () => {
            navigate(`/timeline/${id}`);
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
