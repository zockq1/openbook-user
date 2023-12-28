import { useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";
import calculateGradientColor from "../../../service/calculateGradientColor";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import TitleBox from "../../unit/ui/TitleBox";
import withAuth from "../../../hoc/withAuth";
import QuizMenu from "../../unit/common/presenter/QuizMenu.presenter";

function TimelineQuestionListPage() {
  const navigate = useNavigate();
  const {
    data: timelineList,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useGetTimelineListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    setMenuList([
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((questionCategory, index, arr) => {
          const { title, id, score, startDate, endDate } = questionCategory;
          const result: MenuModel = {
            type: "Progress",
            icon: `${Math.floor(score)}%`,
            description: `${startDate / 10000} ~ ${endDate / 10000}`,
            title: `${title}`,
            subTitle: (
              <>
                <div>연표 보기</div>
              </>
            ),
            score: Math.floor(score),
            mainColor: calculateGradientColor(score),
            onClickMain: () => {
              navigate(`/question/timeline?id=${id}&title=${title}`);
            },
            onClickSub: () => {
              navigate(`/timeline?id=${id}&title=${title}`);
            },

            important: false,
          };

          return result;
        }),
    ]);
  }, [setMenuList, timelineList, navigate]);

  const renderContent = () => {
    if (isFetching) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`연표 문제 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && timelineList.length === 0) {
      return <EmptyUI message={`연표 문제 목록이 비었습니다.`} />;
    }

    if (isSuccess && timelineList.length > 0) {
      return <QuizMenu menuList={questionMenuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox category="연표 문제" icon="questionSquare" />
      <ContentLayout full>
        <div>{renderContent()}</div>
      </ContentLayout>
    </>
  );
}

export default withAuth(TimelineQuestionListPage);
