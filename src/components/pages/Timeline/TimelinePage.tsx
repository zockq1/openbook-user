import { useNavigate, useParams } from "react-router-dom";
import TimelineLearningTemplate from "../../templates/learning/TimelineLearningTemplate";
import { useGetChapterTitleQuery } from "../../../store/api/chapterApi";
import { useGetTimelineQuery } from "../../../store/api/questionApi";

function TimelinePage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: dateList } = useGetTimelineQuery(Number(chapter));

  return (
    <TimelineLearningTemplate
      title={
        chapter === "0"
          ? "전체 연표"
          : String(chapter) + ". " + chapterTitle?.title
      }
      dateList={dateList || []}
      handleBackPage={() => navigate("/timeline")}
    />
  );
}

export default TimelinePage;
