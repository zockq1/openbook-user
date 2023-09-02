import { useNavigate, useParams } from "react-router-dom";
import ChapterLearningTemplate from "../../templates/JJH/ChpaterLearningTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExChapterInfo from "../../../example/useGetExChapterInfo";

function ChapterLearningPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterTitle } =  useGetChapterTitleQuery(Number(chapter));
  // const { data: chapterInfo } = useGetChapterInfoQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: chapterTitle } = useGetExChapterTitle();
  const { data: chapterInfo } = useGetExChapterInfo();
  /******************************* 예시 코드 *********************************/

  const handleNextContent = () => {
    navigate(`/jeong-ju-haeng/${chapter}/timeline-learning`);
  };

  if (!chapterInfo || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <ChapterLearningTemplate
      chapterNumber={Number(chapter)}
      title={String(chapter) + ". " + chapterTitle.title}
      content={String(chapterInfo.content)}
      handleNextContent={handleNextContent}
    />
  );
}

export default ChapterLearningPage;
