import { useParams } from "react-router-dom";
import ChapterLearningTemplate from "../../templates/Learning/ChpaterLearningTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";

function LearningChapterPage() {
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: chapterInfo } = useGetChapterInfoQuery(Number(chapter));

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
