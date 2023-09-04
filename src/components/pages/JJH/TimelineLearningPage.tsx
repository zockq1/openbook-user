import { useNavigate, useParams } from "react-router-dom";
import TimelineLearningTemplate from "../../templates/Learning/TimelineLearningTemplate";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../../store/api/chapterApi";
import { useGetTimelineQuery } from "../../../store/api/questionApi";
import { useState } from "react";
import useGetExContentList from "../../../example/useGetExContentList";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExDateList from "../../../example/useGetExDateList";
import TimelineQuestionTemplate from "../../templates/Question/TimelineQuestionTemplate";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";

type SelectedContent = "Learning" | "Question";

function TimelineLearningPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  // const { data: dateList } = useGetTimelineQuery(Number(chapter));
  // const { data: contentList } = useGetContentListQuery(Number(chapter));
  // const [updateProgres] = useUpdateProgressMutation();
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: contentList } = useGetExContentList();
  const { data: chapterTitle } = useGetExChapterTitle();
  const { data: dateList } = useGetExDateList();
  const updateProgres = (ex: any) => {};
  /******************************* 예시 코드 *********************************/

  const [selectedContent, setSelectedContent] =
    useState<SelectedContent>("Learning");

  if (!contentList || !chapterTitle || !dateList) {
    return <div>Loading...</div>;
  }

  const handleNextQuestion = () => {
    setSelectedContent("Question");
  };

  const handleNextContent = () => {
    if (contentList[2].content === "주제 학습") {
      updateProgres({
        content: "주제 학습",
        title: contentList[2].title,
        state: "Open",
      });
      navigate(
        `/jeong-ju-haeng/${chapter}/topic-learning/${contentList[2].title}`
      );
    } else if (contentList[2].content === "단원 마무리 문제") {
      updateProgres({
        content: "단원 마무리 문제",
        title: String(chapter),
        state: "Open",
      });
      navigate(`/jeong-ju-haeng/${chapter}/final-learning`);
    }
  };

  return (
    <>
      {selectedContent === "Learning" ? (
        <TimelineLearningTemplate
          title={String(chapter) + ". " + chapterTitle?.title}
          dateList={dateList || []}
          handleNextContent={handleNextQuestion}
          backLink={`/jeong-ju-haeng/${Number(chapter)}`}
        />
      ) : (
        <TimelineQuestionTemplate
          backLink={`/jeong-ju-haeng/${chapter}`}
          title={String(chapter) + ". " + chapterTitle?.title}
          dateList={dateList}
          handleNextContent={handleNextContent}
        />
      )}
    </>
  );
}
export default TimelineLearningPage;
