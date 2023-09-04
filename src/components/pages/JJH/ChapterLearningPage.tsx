import { useNavigate, useParams } from "react-router-dom";
import ChapterLearningTemplate from "../../templates/Learning/ChpaterLearningTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExChapterInfo from "../../../example/useGetExChapterInfo";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";

function ChapterLearningPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: chapterInfo } = useGetChapterInfoQuery(Number(chapter));
  const [updateProgres] = useUpdateProgressMutation();
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  // const { data: chapterTitle } = useGetExChapterTitle();
  // const { data: chapterInfo } = useGetExChapterInfo();
  /******************************* 예시 코드 *********************************/

  if (!chapterInfo || !chapterTitle) {
    return <div>Loading...</div>;
  }

  const handleNextContent = () => {
    updateProgres({
      content: "연표 학습",
      title: String(chapter),
      state: "Open",
    });
    navigate(`/jeong-ju-haeng/${chapter}/timeline-learning`);
  };

  return (
    <ChapterLearningTemplate
      title={String(chapter) + ". " + chapterTitle.title}
      content={String(chapterInfo.content)}
      handleNextContent={handleNextContent}
      backLink={`/jeong-ju-haeng/${Number(chapter)}`}
    />
  );
}

export default ChapterLearningPage;
