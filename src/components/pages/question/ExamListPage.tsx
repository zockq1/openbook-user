import { useContext, useEffect, useState } from "react";
import { useGetRoundListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import calculateGradientColor from "../../../service/calculateGradientColor";
import { ThemeContext } from "styled-components";
import TitleBox from "../../unit/ui/TitleBox";
import Icon from "../../atoms/icon/Icon";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import QuizMenu from "../../unit/common/container/QuizMenu";

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
        .sort((a, b) => b.number - a.number)
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
              "불합격"
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
          };
          return result;
        }),
    ]);
  }, [setMenuList, examList, navigate, theme]);

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
      return <QuizMenu menuList={questionMenuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="questionSquare" category="기출 문제" />
      <ContentLayout full>
        <div>{renderContent()}</div>
      </ContentLayout>
    </>
  );
}

export default withAuth(ExamListPage);
