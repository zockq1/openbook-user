import { useEffect, useState } from "react";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../presenter/SideMenuUI";
import { useNavigate } from "react-router-dom";
import useQuesryString from "../../../../hooks/useQueryString";
import { useGetQuestionCategoryListQuery } from "../../../../store/api/questionApi";

function QuizSideMenu() {
  const { timelineId } = useQuesryString();
  const navigate = useNavigate();
  const { data: questionCategoryList } = useGetQuestionCategoryListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

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
            id,
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
            onClickMain: () => {
              window.location.replace(`/question/quiz?&id=${id}&noq=${10}`);
            },
          };
          return result;
        }),
    ]);
  }, [setMenuList, questionCategoryList, navigate]);

  return <SideMenuUI menuList={menuList} selectedId={Number(timelineId)} />;
}

export default QuizSideMenu;
