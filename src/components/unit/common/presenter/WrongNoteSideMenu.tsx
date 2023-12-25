import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../container/SideMenuUI.container";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import useQuesryString from "../../../../hooks/useQueryString";
import { useGetWrongExamListQuery } from "../../../../store/api/questionApi";

function WrongNoteSideMenu() {
  const { round } = useQuesryString();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: examList } = useGetWrongExamListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!examList) {
      return;
    }

    setMenuList(
      [...examList]
        .sort((a, b) => b.roundNumber - a.roundNumber)
        .map((item) => {
          const { questionCount, roundNumber } = item;
          const result: MenuModel = {
            type: "Base",
            id: Number(roundNumber),
            title: `오답 노트(${questionCount}문제)`,
            onClickMain: () =>
              navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`),
            onClickSub: () =>
              navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`),
            icon: <div>{roundNumber}회</div>,
          };
          return result;
        })
    );
  }, [setMenuList, navigate, theme, examList]);

  return <SideMenuUI menuList={menuList} selectedId={Number(round)} />;
}

export default WrongNoteSideMenu;
