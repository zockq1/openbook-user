import { useContext, useEffect, useState } from "react";
import { useGetRoundListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import calculateGradientColor from "../../../service/calculateGradientColor";
import { ThemeContext } from "styled-components";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import Icon from "../../atoms/icon/Icon";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

function ExamListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const {
    data: examList,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useGetRoundListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!examList) {
      return;
    }

    setMenuList([
      ...[...examList]
        .sort((a, b) => a.number - b.number)
        .filter((exam) => exam.number === 64)
        .map((exam, index, arr) => {
          const { number, score } = exam;

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
              navigate(
                `/question/mock-exam?round=${number}&title=${number}회 기출문제`
              );
            },
            onClickSub: () => {
              navigate(
                `/question/mock-exam?round=${number}&title=${number}회 기출문제`
              );
            },
          };
          return result;
        }),
    ]);
  }, [setMenuList, examList, navigate, theme]);

  if (questionMenuList.length === 0) {
    return (
      <Layout>
        <TitleBox icon="questionSquare" category="기출 문제" />
        <MainContentLayout>
          <MenuSkeletonListUI />
        </MainContentLayout>
      </Layout>
    );
  }

  const renderContent = () => {
    if (isFetching) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`기출문제 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && examList.length === 0) {
      return <EmptyUI message={`기출문제 목록이 비었습니다.`} />;
    }

    if (isSuccess && examList.length > 0) {
      return <MenuUI menuList={questionMenuList} />;
    }

    return null;
  };

  return (
    <Layout>
      <TitleBox icon="questionSquare" category="기출 문제" />
      <MainContentLayout>{renderContent()}</MainContentLayout>
    </Layout>
  );
}

export default ExamListPage;
