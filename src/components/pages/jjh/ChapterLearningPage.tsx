import ChapterLearningTemplate from "../../templates/learning/ChpaterLearningTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";
import withAuth from "../../../hoc/withAuth";
import useNextContent from "../../../service/useNextContent";
import useQuesryString from "../../../service/useQueryString";

function ChapterLearningPage() {
  const { chapterNumber } = useQuesryString();
  const handleNextContent = useNextContent();
  const { data: chapterTitle } = useGetChapterTitleQuery(chapterNumber);
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);

  if (!chapterInfo || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <ChapterLearningTemplate
      title={`${chapterNumber}.${chapterTitle.title}`}
      content={String(chapterInfo.content)}
      handleNextContent={handleNextContent}
    />
  );
}

export default withAuth(ChapterLearningPage);
