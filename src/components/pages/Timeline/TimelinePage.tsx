import { useParams } from "react-router-dom";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExDateList from "../../../example/useGetExDateList";
import TimelineLearningTemplate from "../../templates/Learning/TimelineLearningTemplate";
import { useGetChapterTitleQuery } from "../../../store/api/chapterApi";
import { useGetTimelineQuery } from "../../../store/api/questionApi";

function TimelinePage() {
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  // const { data: dateList } = useGetTimelineQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: chapterTitle } = useGetExChapterTitle();
  const { data: dateList } = useGetExDateList();
  /******************************* 예시 코드 *********************************/

  return (
    <TimelineLearningTemplate
      title={
        chapter === "0"
          ? "전체 연표"
          : String(chapter) + ". " + chapterTitle?.title
      }
      dateList={dateList || []}
      backLink="/timeline"
    />
  );
}

export default TimelinePage;
