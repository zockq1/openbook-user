import { useEffect, useState } from "react";
import { useGetQuestionCategoryListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import calculateGradientColor from "../../../service/calculateGradientColor";
import MenuTemplate from "../../templates/menu/MenuTemplate";

function QuizListPage() {
  const navigate = useNavigate();
  const { data: questionCategoryList } = useGetQuestionCategoryListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!questionCategoryList) {
      return;
    }
    // const avgScore =
    //   questionCategoryList.reduce((sum, item) => sum + item.score, 0) /
    //   questionCategoryList.length;
    setMenuList([
      {
        type: "Progress",
        icon: `${52}점`,
        title: "전체 진행도 / 취약 문제 풀기",
        subTitle: "전체 주제",
        score: 52,
        mainColor: calculateGradientColor(52),
        // score: avgScore,
        // color: calculateGradientColor(avgScore),
        onClickMain: () => {
          navigate(`/question/quiz?timelimit=${Infinity}&id=${0}&noq=${10}`);
        },
        onClickSub: () => {
          navigate("/learning");
        },
        important: true,
      },
      ...[...questionCategoryList]
        .sort((a, b) => a.number - b.number)
        .map((questionCategory, index, arr) => {
          //const { title, id, score } = questionCategory;
          const { title, id } = questionCategory;
          const scoreList = [
            29, 70, 92, 80, 31, 24, 67, 19, 19, 15, 29, 68, 28, 67, 36, 82, 100,
            80, 29, 41, 94, 19, 3, 80, 50, 15, 36, 82, 57, 16, 78, 32, 88, 71,
            86, 91, 64, 32, 33, 80, 67, 97, 40, 66, 25, 98, 85, 43, 11, 7, 23,
            36, 91, 74, 29, 66, 4, 64, 2, 71, 93, 98, 0, 16, 1, 25, 96, 46, 73,
            88, 9, 13, 94, 32, 13, 89, 42, 22, 95, 45, 31, 37, 40, 42, 21, 56,
            51, 23, 36, 78, 25, 97, 73, 84, 82, 67, 71, 99, 42, 38,
          ];
          const score = scoreList[index];
          const result: MenuModel = {
            type: "Progress",
            title: `${title} 문제 풀기`,
            icon: `${score}점`,
            subTitle: `관련 주제`,
            score: score,
            mainColor: calculateGradientColor(score),
            onClickMain: () => {
              navigate(
                `/question/quiz?timelimit=${Infinity}&id=${id}&noq=${10}`
              );
            },
            onClickSub: () => {
              navigate("/learning");
            },
          };
          return result;
        }),
    ]);
  }, [setMenuList, questionCategoryList, navigate]);

  if (!questionCategoryList) {
    return <div>Loading...</div>;
  }
  return <MenuTemplate menuList={questionMenuList} category={"문제 분류"} />;
}

export default QuizListPage;
