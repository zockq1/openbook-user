import { useNavigate, useParams } from "react-router-dom";
import TimelineLearningTemplate from "../templates/TimelineLearningTemplate";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../store/api/chapterApi";
import { useGetTimelineQuery } from "../../store/api/questionApi";
import { useState } from "react";
import TimelineQuestionTemplate from "../templates/TimelineQuestionTemplate";
import useGetExContentList from "../../example/useGetExContentList";
import useGetExChapterTitle from "../../example/useGetExChapterTitle";
import useGetExDateList from "../../example/useGetExDateList";

type SelectedContent = "Learning" | "Question";

function TimelineLearningPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  // const { data: dateList } = useGetTimelineQuery(Number(chapter));
  // const { data: contentList } = useGetContentListQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: contentList } = useGetExContentList();
  const { data: chapterTitle } = useGetExChapterTitle();
  const { data: dateList } = useGetExDateList();
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
    navigate(
      `/jeong-ju-haeng/${chapter}/topic-learning/${contentList[2].title}`
    );
  };

  return (
    <>
      {selectedContent === "Learning" ? (
        <TimelineLearningTemplate
          chapterNumber={Number(chapter)}
          title={String(chapter) + ". " + chapterTitle?.title}
          dateList={dateList || []}
          handleNextContent={handleNextQuestion}
        />
      ) : (
        <TimelineQuestionTemplate
          chapterNumber={Number(chapter)}
          title={String(chapter) + ". " + chapterTitle?.title}
          dateList={dateList || []}
          handleNextContent={handleNextContent}
        />
      )}
    </>
  );
}
export default TimelineLearningPage;
