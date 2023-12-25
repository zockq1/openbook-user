import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../container/SideMenuUI.container";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import useQuesryString from "../../../../hooks/useQueryString";
import { useGetRoundListQuery } from "../../../../store/api/questionApi";

function ExamSideMenu() {
  const { round } = useQuesryString();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: examList } = useGetRoundListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!examList) {
      return;
    }

    setMenuList([
      ...[...examList]
        .sort((a, b) => b.number - a.number)
        .map((exam, index, arr) => {
          const { number, score } = exam;
          const result: MenuModel = {
            id: number,
            type: "Progress",
            title: `기출문제 (${score}점)`,
            icon: `${number}회`,
            score,
            onClickMain: () => {
              navigate(
                `/question/mock-exam?round=${number}&title=${number}회 기출문제`
              );
            },
          };
          return result;
        }),
    ]);
  }, [setMenuList, examList, navigate, theme]);

  return <SideMenuUI menuList={menuList} selectedId={Number(round)} />;
}

export default ExamSideMenu;
