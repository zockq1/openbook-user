import { useNavigate, useParams } from "react-router-dom";
import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../../store/api/chapterApi";
import { useGetTimelineQuery } from "../../../store/api/questionApi";
import { useState } from "react";
import TimelineQuestionTemplate from "../../templates/question/TimelineQuestionTemplate";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";
import withAuth from "../../../hoc/withAuth";

type SelectedContent = "Learning" | "Question";

function TimelineLearningPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: dateList } = useGetTimelineQuery(Number(chapter));
  const { data: contentList } = useGetContentListQuery(Number(chapter));
  const [updateProgres] = useUpdateProgressMutation();

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
          handleBackPage={() => navigate(`/jeong-ju-haeng/${Number(chapter)}`)}
        />
      ) : (
        <TimelineQuestionTemplate
          handleBackPage={() => navigate(`/jeong-ju-haeng/${chapter}`)}
          title={String(chapter) + ". " + chapterTitle?.title}
          chapter={Number(chapter)}
          dateList={dateList}
          handleNextContent={handleNextContent}
        />
      )}
    </>
  );
}
export default withAuth(TimelineLearningPage);
