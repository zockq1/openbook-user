import { useEffect, useState } from "react";
import { useGetQuestionCategoryListQuery } from "../../../store/api/questionApi";
import { MenuModel } from "../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import calculateGradientColor from "../../../service/calculateGradientColor";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";

function QuizListPage() {
  const navigate = useNavigate();
  const { data: questionCategoryList } = useGetQuestionCategoryListQuery();
  const [questionMenuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!questionCategoryList) {
      return;
    }
    const avgScore =
      questionCategoryList.reduce((sum, item) => sum + item.score, 0) /
      questionCategoryList.length;
    setMenuList([
      {
        type: "Progress",
        icon: `${Math.floor(avgScore)}점`,
        title: "전체 진행도",
        subTitle: "전체 주제",
        score: Math.floor(avgScore),
        mainColor: calculateGradientColor(avgScore),
        onClickMain: () => {
          navigate(`/question/quiz?timelimit=${Infinity}&id=${0}&noq=${10}`);
        },
        onClickSub: () => {
          navigate("/learning");
        },
        important: true,
      },
      ...[...questionCategoryList]
        .sort((a, b) => a.number - b.number)
        .map((questionCategory, index, arr) => {
          const { title, id, score, topicCount } = questionCategory;
          const result: MenuModel = {
            type: "Progress",
            title: `${title}`,
            icon: `${score}점`,
            subTitle: (
              <>
                <div>관련 주제</div>
                <div>({topicCount})</div>
              </>
            ),
            score: score,
            mainColor: calculateGradientColor(score),
            onClickMain: () => {
              navigate(
                `/question/quiz?timelimit=${Infinity}&id=${id}&noq=${10}`
              );
            },
            onClickSub: () => {
              navigate(`/question/topic-list?id=${id}&title=${title}`);
            },
          };
          return result;
        }),
    ]);
  }, [setMenuList, questionCategoryList, navigate]);

  if (questionMenuList.length === 0) {
    return (
      <Layout>
        <TitleBox icon="questionSquare" category="퀴즈" />
        <MainContentLayout>
          <MenuSkeletonListUI />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="questionSquare" category="퀴즈" />
      <MainContentLayout>
        <MenuUI menuList={questionMenuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default QuizListPage;
