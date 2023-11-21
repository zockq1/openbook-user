import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { useGetWrongExamListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

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
  const {
    data: examList,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetWrongExamListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!examList) {
      return;
    }

    setMenuList(
      [...examList].map((item) => {
        const { questionCount, roundNumber } = item;
        const result: MenuModel = {
          type: "Base",
          title: `${roundNumber}회 기출문제 오답 노트`,
          onClickMain: () =>
            navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`),
          onClickSub: () =>
            navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`),
          icon: (
            <Label>
              <span className="number">{`${questionCount}`}</span>
              <span className="string">문제</span>
            </Label>
          ),
        };
        return result;
      })
    );
  }, [setMenuList, navigate, theme, examList]);

  const renderContent = () => {
    if (isFetching) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`오답노트 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && examList.length === 0) {
      return <EmptyUI message={`오답노트가 비었습니다.`} />;
    }

    if (isSuccess && examList.length > 0) {
      return <MenuUI menuList={menuList} />;
    }

    return null;
  };

  return (
    <Layout>
      <TitleBox icon="questionSquare" category="오답 노트" />
      <MainContentLayout>{renderContent()}</MainContentLayout>
    </Layout>
  );
}

export default WrongExamListPage;
