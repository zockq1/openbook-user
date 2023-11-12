import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { useGetWrongExamListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import { WrongQuestionListModel } from "../../../types/questionTypes";

const examList: WrongQuestionListModel[] = [
  {
    roundNumber: 66,
    questionList: [
      {
        id: 0,
        questionNumber: 0,
      },
      {
        id: 0,
        questionNumber: 0,
      },
      {
        id: 0,
        questionNumber: 0,
      },
    ],
  },
];

const Label = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.red};
  .string {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
  .number {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

function WrongExamListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  //const { data: examList } = useGetWrongExamListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!examList) {
      return;
    }

    setMenuList(
      [...examList].map((item) => {
        const { questionList, roundNumber } = item;
        const result: MenuModel = {
          type: "Base",
          title: `${roundNumber}회 기출문제 오답 노트`,
          onClickMain: () =>
            navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`),
          onClickSub: () =>
            navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`),
          icon: (
            <Label>
              <span className="number">{`${questionList.length}`}</span>
              <span className="string">문제</span>
            </Label>
          ),
        };
        return result;
      })
    );
  }, [setMenuList, navigate, theme, examList]);

  if (!examList) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <TitleBox icon="questionSquare" category="오답 노트" />
      <MainContentLayout>
        <MenuUI menuList={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default WrongExamListPage;
