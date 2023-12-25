import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { useGetWrongExamListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import MenuUI from "../../unit/common/container/MenuUI.container";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import { useMediaQuery } from "react-responsive";

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
  const isNotMobile = useMediaQuery({ minWidth: 768 });
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
      [...examList]
        .sort((a, b) => b.roundNumber - a.roundNumber)
        .map((item, index) => {
          const { questionCount, roundNumber } = item;

          if (isNotMobile && index === 0) {
            navigate(`/my-info/wrong-notes/exam?round=${roundNumber}`, {
              replace: true,
            });
          }
          const result: MenuModel = {
            type: "Base",
            title: `${roundNumber}회 기출문제 오답 노트`,
            onClickMain: () =>
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
  }, [setMenuList, navigate, theme, examList, isNotMobile]);

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
    <>
      <TitleBox icon="questionSquare" category="오답 노트" />
      <ContentLayout leftMenu={<div />}>{renderContent()}</ContentLayout>
    </>
  );
}

export default withAuth(WrongExamListPage);
