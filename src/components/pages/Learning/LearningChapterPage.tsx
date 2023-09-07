import { useParams } from "react-router-dom";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExChapterInfo from "../../../example/useGetExChapterInfo";
import ChapterLearningTemplate from "../../templates/Learning/ChpaterLearningTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";

function LearningChapterPage() {
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: chapterInfo } = useGetChapterInfoQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  // const { data: chapterTitle } = useGetExChapterTitle();
  // const { data: chapterInfo } = useGetExChapterInfo();
  /******************************* 예시 코드 *********************************/

  if (!chapterInfo || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <ChapterLearningTemplate
      title={String(chapter) + ". " + chapterTitle.title}
      content={String(chapterInfo.content)}
      backLink={`/learning/${chapter}`}
    />
  );
}

export default LearningChapterPage;
