import { useEffect, useState } from "react";
import { useGetQuestionCategoryListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import calculateGradientColor from "../../../service/calculateGradientColor";
import TitleBox from "../../unit/ui/TitleBox";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import withAuth from "../../../hoc/withAuth";
import QuizMenu from "../../unit/common/presenter/QuizMenu.presenter";

function QuizListPage() {
  const navigate = useNavigate();
  const {
    data: questionCategoryList,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useGetQuestionCategoryListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!questionCategoryList) {
      return;
    }
    setMenuList([
      ...[...questionCategoryList]
        .sort((a, b) => a.number - b.number)
        .map((questionCategory, index, arr) => {
          const { title, id, score, topicCount } = questionCategory;
          const result: MenuModel = {
            type: "Progress",
            state: "Question",
            title: title.split("-")[0],
            subTitle: (
              <>
                <div>관련 주제</div>
                <div>({topicCount})</div>
              </>
            ),
            description: title.split("-")[1],
            icon: `${score}%`,
            score: score,
            mainColor: calculateGradientColor(score),
            onClickMain: () => {
              navigate(`/question/quiz?&id=${id}&noq=${10}`);
            },
            onClickSub: () => {
              navigate(`/question/topic-list?id=${id}`);
            },
          };
          return result;
        }),
    ]);
  }, [setMenuList, questionCategoryList, navigate]);

  const renderContent = () => {
    if (isFetching) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`퀴즈 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && questionCategoryList.length === 0) {
      return <EmptyUI message={`퀴즈 목록이 비었습니다.`} />;
    }

    if (isSuccess && questionCategoryList.length > 0) {
      return <QuizMenu menuList={questionMenuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="questionSquare" category="퀴즈" />
      <ContentLayout full>
        <div>{renderContent()}</div>
      </ContentLayout>
    </>
  );
}

export default withAuth(QuizListPage);
