import { useContext, useEffect, useState } from "react";
import { useGetRoundListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import calculateGradientColor from "../../../service/calculateGradientColor";
import { ThemeContext } from "styled-components";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import Icon from "../../atoms/icon/Icon";

function ExamListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: examList } = useGetRoundListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!examList) {
      return;
    }

    setMenuList([
      ...[...examList]
        .sort((a, b) => a.number - b.number)
        .map((questionCategory, index, arr) => {
          const { number } = questionCategory;

          const scoreList = [
            30, 85, 67, 82, 74, 0, 26, 22, 16, 21, 69, 20, 53, 56, 66, 69, 3,
            52, 16, 0, 28, 66, 71, 19, 50, 88, 48, 96, 18, 44, 7, 8, 27, 72, 57,
            98, 73, 56, 1, 76, 26, 30, 79, 37, 17, 36, 10, 36, 71, 19, 29, 19,
            88, 78, 7, 82, 4, 54, 90, 19, 15, 56, 17, 72, 69, 94, 31, 33, 39,
            28, 67, 31, 15, 3, 34, 87, 41, 65, 92, 47, 22, 88, 84, 59, 30, 85,
            90, 23, 22, 68, 84, 3, 73, 9, 63, 87, 41, 44, 38, 87,
          ];
          const score = scoreList[index];
          const subTitle =
            score >= 80 ? (
              <Icon icon="one" color={theme.colors.white} size={40} />
            ) : score >= 70 ? (
              <Icon icon="two" color={theme.colors.white} size={40} />
            ) : score >= 60 ? (
              <Icon icon="three" color={theme.colors.white} size={40} />
            ) : (
              <Icon icon="fail" color={theme.colors.white} size={40} />
            );

          const result: MenuModel = {
            type: "Progress",
            title: `${number}회 심화`,
            icon: `${score}점`,
            subTitle,
            score,
            mainColor: calculateGradientColor(score),
            onClickMain: () => {
              navigate(`/question/mock-exam?round=${number}`);
            },
            onClickSub: () => {},
          };
          return result;
        }),
    ]);
  }, [setMenuList, examList, navigate, theme]);

  if (!examList) {
    return <div>Loading...</div>;
  }
  return <MenuTemplate menuList={questionMenuList} category={"문제 분류"} />;
}

export default ExamListPage;
